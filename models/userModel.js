const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    address: {
        type: String
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)