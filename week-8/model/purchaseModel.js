const mongoose = require('mongoose');

const purchaseSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("purchase", purchaseSchema);