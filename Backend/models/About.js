const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
    description: String,
    instagram: String,
    facebook: String,
    whatsapp: String,
});

module.exports = mongoose.model('about', aboutSchema);