const mongoose = require('mongoose');

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("course", courseSchema);