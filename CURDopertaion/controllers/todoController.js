const Todo = require('../models/todoModel');
const asyncHandler = require('express-async-handler');

const createTodo = asyncHandler(async (req, res) =>{
    const {title, done} = req.body;
    const todo = await Todo.create({userid: req.userid, title, done});
    res.status(201).json({todo});
});

const getTodo = asyncHandler(async (req, res) => {
    const todos = await Todo.find({userid: req.userid});
    res.status(200).json({todos});
});

const updateTodo = asyncHandler(async (req, res) => {
    const {id} =req.params;
    const{title, done} = req.body;

    const todo = await Todo.findOneAndUpdate(
        { _id: id, userid: req.userid },
        { title, done },
        { new: true }
    );

    if (!todo) {
        return res.status(404).json({message: 'Todo not found'});
    }
    res.status(200).json({todo});
});

const deleteTodo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const todo = await Todo.findOneAndDelete({
        _id: id,
        userid: req.userid
    });

    if (!todo) {
        return res.status(404).json({message: 'Todo not found'});
    }
    res.status(200).json({message: 'Todo Deleted'});
});

module.exports = {createTodo, getTodo, updateTodo, deleteTodo};