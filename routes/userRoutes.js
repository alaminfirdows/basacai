const router = require("express").Router()
const userCtrl = require("../controllers/userCtrl")
const { auth, authAdmin } = require("../middleware/auth")


router.get("/get/all", auth, authAdmin, userCtrl.getallusers)
router.post("/register", userCtrl.register)
router.post("/login", userCtrl.login)
router.post("/logout", auth, userCtrl.logout)
router.post("/forgot", userCtrl.forgotPassword)
router.put("/reset/:token", userCtrl.resetPassword)
router.get("/getUser", auth, userCtrl.getUser)

router.patch("/profile/update", auth, userCtrl.updateProfile)
router.put("/update/password", auth, userCtrl.updatePassword)
router.put("/update/role/:id", auth, authAdmin, userCtrl.updateRole)
router.delete("/admin/delete/:id", auth, authAdmin, userCtrl.deleteUser)
router.get("/user/details/:id", auth, authAdmin, userCtrl.getUserAdmin)

router.post("/contact/admin", userCtrl.contactMessage)

router.get("/user/subAdmin", userCtrl.getSubAdminUser)

module.exports = router