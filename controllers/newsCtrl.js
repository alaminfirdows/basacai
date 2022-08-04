const News = require("../models/newsModel")
const cloudinary = require("cloudinary")

const newsCtrl = {
    createNews: async (req, res) => {
        try {
            const { title, content } = req.body
            const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
                folder: "News"
            })
            const news = new News({
                title, content, image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            })
            await news.save()
            return res.status(201).json({ success: true, news })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getnews: async (req, res) => {
        try {
            const news = await News.find()
            return res.status(201).json({ success: true, news })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteNews: async (req, res) => {
        try {
            const news = await News.findById(req.params.id)
            if (!news) return res.status(400).json({ msg: "Id is not found" })

            const imageId = news.image.public_id;
            await cloudinary.v2.uploader.destroy(imageId)

            await news.remove()
            res.status(201).json({ success: true, msg: "Delete successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    newsDetails: async (req, res) => {
        try {
            const news = await News.findById(req.params.id)

            if (!news) return res.status(400).json({ msg: "News not found with this id!" })

            res.status(201).json({ success: true, news })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateNews: async (req, res) => {
        try {

            const newUserData = {
                title: req.body.title,
                content: req.body.content,
            };

            if (req.body.image !== "") {
                const news = await News.findById(req.params.id);

                const imageId = news.image.public_id;

                await cloudinary.v2.uploader.destroy(imageId);

                const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
                    folder: "News",
                });

                newUserData.image = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }

            const news = await News.findByIdAndUpdate(req.params.id, newUserData);

            res.status(201).json({
                success: true, msg: "Updated successfully"
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    },
}

module.exports = newsCtrl;