const router = require("express").Router()
const { auth, authAdmin } = require("../middleware/auth")
const newsCtrl = require("../controllers/newsCtrl")

router.post("/create/news", auth, authAdmin, newsCtrl.createNews)
router.get("/news/get/all", newsCtrl.getnews)
router.get("/news/details/:id", newsCtrl.newsDetails)
router.delete("/news/delete/:id", auth, authAdmin, newsCtrl.deleteNews)
router.patch("/news/update/:id", auth, authAdmin, newsCtrl.updateNews)

module.exports = router