const mongoose = require("mongoose")

const addsSchema = new mongoose.Schema({
    adds: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Adds", addsSchema)