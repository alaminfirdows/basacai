const mongoose = require("mongoose")

const homeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    advanced: {
        type: Number,
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalFloor: {
        type: Number,
    },
    flatNum: {
        type: Number
    },
    upazila: {
        type: String,
        required: true
    },
    union: {
        type: String
    },
    BedRoom: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    totalbathroom: {
        type: Number,
    },
    atachbathroom: {
        type: Number,
    },
    commonbathroom: {
        type: Number,
    },
    family: {
        type: String,
    },
    bachelor: {
        type: String,
    },
    smallfamily: {
        type: String,
    },
    onlyboysStudent: {
        type: String,
    },
    onlygirlStudent: {
        type: String,
    },
    onlymen: {
        type: String,
    },
    onlywomen: {
        type: String,
    },
    menEmployee: {
        type: String,
    },
    womenemployee: {
        type: String,
    },
    velkhani: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },
    kitchen: {
        type: String,
        required: true
    },
    drawingRoom: {
        type: Number,
    },
    stock: {
        type: String,
        default: "available"
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "Users",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
                default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIw4i6nMOAcPikeIiDjYw7oedVyJaiqYSqPFvpFJ1t6G_I2_T1rzWLjtv4tBp8sU0A0I&usqp=CAU"
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model("Homes", homeSchema)