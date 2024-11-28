const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    done: {type: Boolean, default: false}
});

module.exports = mongoose.model('Todo', todoSchema);