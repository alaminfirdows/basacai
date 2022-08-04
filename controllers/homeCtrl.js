const Homes = require("../models/homeModel")
const cloudinary = require("cloudinary")
const Features = require("../utils/Features")
const HomesCtrl = {
    getAllHomes: async (req, res) => {
        try {
            const resultPerPage = 16
            const homesCount = await Homes.countDocuments()
            const features = new Features(Homes.find(), req.query).filtering().sorting().paginating(resultPerPage)

            let homes = await features.query

            let result = homes.length

            return res.status(201).json({ homes, result, homesCount })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getHomes: async (req, res) => {
        try {
            const resultPerpage = 16
            const homesCount = await Homes.countDocuments();


            const features = new Features(Homes.find(), req.query).filtering().sorting().paginating(resultPerpage)

            let homes = await features.query
            let result = homes.length

            res.status(201).json({ homes, success: true, resultPerpage, homesCount, result })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllAdminHomes: async (req, res) => {
        try {
            const homes = await Homes.find()
            return res.status(201).json({ success: true, homes })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSubAdminHomes: async (req, res) => {
        try {
            const homes = await Homes.find()
            const result = homes.filter((item) => {
                return item.user.toString() === req.user.id.toString()
            })
            return res.status(201).json({ result, success: true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createHomes: async (req, res) => {
        try {
            let images = []

            if (typeof req.body.images === "string") {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "homes"
                });
                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.url
                })
            }
            req.body.images = imagesLinks

            req.body.user = req.user.id

            const home = await Homes.create(req.body)
            return res.status(201).json({ success: true, home })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateHomes: async (req, res) => {
        try {
            let home = await Homes.findById(req.params.id)
            if (!home) return res.status(400).json({ msg: "home not found with this id" })

            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images)
            } else {
                images = req.body.images
            }

            if (images !== undefined) {
                // Delete images from cloudinary
                for (let i = 0; i < images.length; i++) {
                    await cloudinary.v2.uploader.destroy(home.images[i].public_id);
                }

                const imagesLinks = []

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.v2.uploader.upload(images[i], {
                        folder: "homes"
                    })
                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url
                    })

                }
                req.body.images = imagesLinks
            }

            home = await Homes.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            })
            return res.status(201).json({ success: true, msg: "Updated home" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getHome: async (req, res) => {
        try {
            const home = await Homes.findById(req.params.id)
            return res.status(201).json({ success: true, home })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteHomes: async (req, res) => {
        try {
            let home = await Homes.findById(req.params.id)
            if (!home) return res.status(400).json({ msg: "home not found with this id" })

            // Deleting images from cloudinary

            for (let i = 0; i < home.images.length; i++) {
                await cloudinary.v2.uploader.destroy(home.images[i].public_id);
            }

            await home.remove(req.params.id)

            return res.status(201).json({ success: true, msg: "deleted successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteHomeAdmin: async (req, res) => {
        try {
            const home = await Homes.findById(req.params.id)
            if (!home) return res.status(400).json({ msg: "home not found with this id" })

            await home.remove(req.params.id)

            return res.status(201).json({ success: true, home })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    available: async (req, res) => {
        try {
            const { stock } = req.body
            await Homes.findOneAndUpdate({ _id: req.params.id }, {
                stock
            })
            res.status(201).json({ success: true, msg: "updated successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createReviews: async (req, res) => {
        try {
            const { homeID, comment, rating, } = req.body
            const review = {
                user: req.user.id,
                name: req.user.name,
                url: req.user.avatar.url,
                rating: Number(rating),
                comment
            }
            const home = await Homes.findById(homeID)
            if (!home) return res.status(400).json({ msg: "home not found with this id" })


            const isReviewd = home.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
            if (isReviewd) {
                home.reviews.forEach((rev) => {
                    if (rev.user.toString() === req.user._id.toString())
                        (rev.rating = rating),
                            (rev.comment = comment)
                })
            } else {
                home.reviews.push(review)
                home.numOfReviews = home.reviews.length
            }
            let avg = 0;
            home.reviews.forEach(rev => avg += rev.rating)

            home.ratings = avg / home.reviews.length
            await home.save()
            return res.status(200).json({ success: true, msg: "Reviews created" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getReviews: async (req, res) => {
        try {
            const home = await Homes.findById(req.query.id)
            if (!home) return res.status(400).json({ msg: "home not found with this id" })

            return res.status(200).json({ success: true, reviews: home.reviews })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteReview: async (req, res) => {
        try {
            const home = await Homes.findById(req.query.homeID)

            if (!home) return res.status(400).json({ msg: "home not found with this id" })

            const reviews = home.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())

            let avg = 0;

            reviews.forEach((rev) => avg += rev.rating)

            let ratings = 0
            if (reviews.length === 0) {
                ratings = 0
            } else {
                ratings = avg / reviews.length
            }
            const numOfReviews = reviews.length

            await Homes.findByIdAndUpdate(req.query.homeID, { reviews, ratings, numOfReviews })
            return res.status(200).json({ success: true, msg: "Deleted reviews" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}
module.exports = HomesCtrl