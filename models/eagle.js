const { Double } = require("mongodb")
const mongoose = require("mongoose")
const eagleSchema = mongoose.Schema({
    eagle_color: {
        type: String,
        required: true
    },
    eagle_breed: {
        type: String,
        required: true
    },
    eagle_price: {
        type: Number,
        required: true,
        min: 0,
        max: 500
    }
    })
    module.exports = mongoose.model("eagle",eagleSchema)
