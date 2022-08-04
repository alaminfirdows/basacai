const router = require("express").Router()
const { auth, authAdmin } = require("../middleware/auth")
const uploadCtrl = require("../controllers/uploadCtrl")

router.post("/adds", auth, authAdmin, uploadCtrl.addCtrl)
router.get("/adds", uploadCtrl.getAdd)
router.delete("/adds/delete/:id", auth, authAdmin, uploadCtrl.deleteAdds)

router.get("/banner", uploadCtrl.getBanner)
router.post("/new/banner", auth, authAdmin, uploadCtrl.newbanner)
router.delete("/delete/banner/:id", auth, authAdmin, uploadCtrl.deleteBanner)
module.exports = router