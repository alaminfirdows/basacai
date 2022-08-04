const Adds = require("../models/addBanner")
const Banners = require("../models/bannerModel")
const cloudinary = require("cloudinary")
const uploadCtrl = {
    // new Adds create
    addCtrl: async (req, res) => {
        try {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.adds, {
                folder: "Adds"
            })

            const newAdds = new Adds({
                adds: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            })
            await newAdds.save()
            return res.status(201).json({ success: true, adds: newAdds })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // get All adds
    getAdd: async (req, res) => {
        try {
            const adds = await Adds.find()
            return res.status(201).json({ success: true, adds })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Adds Delete
    deleteAdds: async (req, res) => {
        try {
            const user = await Adds.findById(req.params.id);
            const imageId = user.adds.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
            await user.remove()

            return res.status(201).json({ success: true, msg: "Adds Deleted Successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // create banner
    newbanner: async (req, res) => {
        try {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.banner, {
                folder: "Banners"
            })

            const newBanner = new Banners({
                banner: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            })
            await newBanner.save()
            return res.status(201).json({ success: true, banners: newBanner })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // get All Banners
    getBanner: async (req, res) => {
        try {
            const banner = await Banners.find()
            return res.status(201).json({ success: true, banner })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // Adds Delete
    deleteBanner: async (req, res) => {
        try {
            const user = await Banners.findById(req.params.id);
            const imageId = user.banner.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
            await user.remove()
            return res.status(201).json({ success: true, msg: "Banner Deleted Successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = uploadCtrl