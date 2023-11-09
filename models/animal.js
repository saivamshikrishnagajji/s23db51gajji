const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
animal_type: String,
color: String,
legs: Number
})
module.exports = mongoose.model("Animal",
animalSchema)