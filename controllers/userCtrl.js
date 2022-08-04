const Users = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const cloudinary = require("cloudinary")
const contactEmail = require("../utils/contactEmail")
const userCtrl = {
    // admin
    getallusers: async (req, res) => {
        try {
            const users = await Users.find()
            return res.status(201).json({ success: true, users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    register: async (req, res) => {
        try {

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "Avatars"
            })
            const { name, email, password } = req.body;

            if (!name || !email || !password) return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email)) return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })

            if (user) return res.status(400).json({ msg: "The email already exist." })

            if (password.length < 8) return res.status(400).json({ msg: "Password must be 8 characters Long!" })

            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash, avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            })
            await newUser.save()
            const token = accessToken({ id: newUser._id })
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            const url = process.env.URL
            sendEmail(email, url, "Visit")
            return res.status(201).json({ success: true, user: newUser, token })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect!" })

            const token = accessToken({ id: user._id })
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({ success: true, user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("token", null, {
                maxAge: new Date(Date.now()),
                httpOnly: true
            })
            res.status(201).json({ success: true, msg: "Logout successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const token = resetToken({ id: user._id })
            // const client_url = process.env.URL

            // const resetPasswordUrl = `${req.protocol}://${req.get(
                // "host"
            //   )}/password/reset/${resetToken}`;
            
            //   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
            // const url = `${client_url}/user/reset/${token}`
            const url = `${req.protocol}://${req.get("host")}/user/reset/${token}`


            sendEmail(email, url, "Reset your password")

            res.status(201).json({ success: true, msg: "Check your email" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            const token = req.params.token

            if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

            const user = jwt.verify(token, process.env.RESET_TOKEN_SECRET)

            if (!user) return res.status(400).json({ msg: "Invalid Authentication" })

            await Users.findByIdAndUpdate({ _id: user.id }, {
                password: passwordHash
            })
            res.status(201).json({ success: true, msg: "Reset your passsword" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProfile: async (req, res) => {
        try {

            const newUserData = {
                name: req.body.name,
                email: req.body.email,
                description: req.body.description,
                rating: req.body.rating,
                address: req.body.address
            };

            if (req.body.avatar !== "") {
                const user = await Users.findById(req.user.id);

                const imageId = user.avatar.public_id;

                await cloudinary.v2.uploader.destroy(imageId);

                const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                    folder: "Avatars",
                });

                newUserData.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }

            const user = await Users.findByIdAndUpdate(req.user.id, newUserData);

            res.status(201).json({
                success: true,msg:"Update successfully"
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
    },
    updatePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const user = await Users.findById(req.user.id)

            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect." })

            if (newPassword !== confirmPassword) return res.status(400).json({ msg: "Password does not match." })

            const passwordHash = await bcrypt.hash(newPassword, 10)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            return res.status(201).json({ success: true, msg: "Updated password successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // for user
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            if (!user) return res.status(400).json({ msg: "User not found with this id!" })

            res.status(201).json({ success: true, user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // admin
    deleteUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            if (!user) return res.status(400).json({ msg: "User does not exist with id." })

            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId)

            await user.remove()
            res.status(201).json({ success: true, msg: "Delete successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserAdmin: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')
            if (!user) return res.status(400).json({ msg: "User not found with this id!" })
            res.status(201).json({ success: true, user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateRole: async (req, res) => {
        try {
            const { role } = req.body
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })
            res.status(201).json({ success: true, msg: "updated successfully" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSubAdminUser: async (req, res) => {
        try {
            const user = await Users.find()
            const result = user.filter((item) => {
                return item.role === "subAdmin"
            })
            return res.status(201).json({ success: true, result })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    contactMessage: async (req, res) => {
        try {

            const { name, email, message } = req.body;

            if (!name || !email || !message) return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email)) return res.status(400).json({ msg: "Invalid emails." })

            contactEmail(email, name, message, "Vasa chai")

            return res.status(201).json({ success: true, msg: "Message successfully send" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
const validateEmail = (email) => {
    return email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    );
};
const accessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" })
}
const resetToken = (payload) => {
    return jwt.sign(payload, process.env.RESET_TOKEN_SECRET, { expiresIn: "15m" })
}
module.exports = userCtrl