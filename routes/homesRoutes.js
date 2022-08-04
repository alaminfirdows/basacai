const router = require("express").Router()
const { auth, authAdmin, subAdmin } = require("../middleware/auth")

const HomesCtrl = require("../controllers/homeCtrl")
router.get("/homes", HomesCtrl.getAllHomes)

router.get("/all_homes", HomesCtrl.getHomes)
router.get("/admin/homes", auth, authAdmin, HomesCtrl.getAllAdminHomes)
router.post("/homes/create", auth, authAdmin, HomesCtrl.createHomes)
router.put("/home/update/:id", auth, authAdmin, HomesCtrl.updateHomes)
router.get("/home/details/:id", auth, HomesCtrl.getHome)
router.delete("/home/delete/:id", auth, authAdmin, HomesCtrl.deleteHomes)
router.put("/home/stock/admin/:id", auth, authAdmin, HomesCtrl.available)

// for subAdmin
router.get("/homes/subadmin", auth, subAdmin, HomesCtrl.getSubAdminHomes)
router.post("/homes/create/subAdmin", auth, subAdmin, HomesCtrl.createHomes)
router.put("/home/subAdmin/update/:id", auth, subAdmin, HomesCtrl.updateHomes)
router.put("/homes/stock/subAdmin/:id", auth, subAdmin, HomesCtrl.available)

// reviews 
router.delete("/home/reviews", auth, HomesCtrl.deleteReview)
router.put("/home/reviews", auth, HomesCtrl.createReviews)
router.get("/home/reviews", auth, HomesCtrl.getReviews)

module.exports = router