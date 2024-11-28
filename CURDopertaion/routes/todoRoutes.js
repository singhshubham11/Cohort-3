const express = require('express');
const {createTodo, getTodo, updateTodo, deleteTodo} = require('../controllers/todoController');
const auth = require('../middelware/authMiddelware');

const router = express.Router();

router.post('/', auth, createTodo);
router.get('/', auth, getTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;