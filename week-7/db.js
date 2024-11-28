const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true},
    password: String
});

const todoSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    title: String,
    done: Boolean
});

const users = mongoose.model('users', userSchema);
const todos = mongoose.model('todos', todoSchema);

module.exports = {users, todos};