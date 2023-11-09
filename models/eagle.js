const mongoose = require("mongoose")
const eagleSchema = mongoose.Schema({
eagle_color: String,
eagle_breed: String,
eagle_price: Number
})
module.exports = mongoose.model("eagle",eagleSchema)