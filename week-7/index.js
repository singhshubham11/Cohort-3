const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {users, todos} = require('./db');
const {auth, JWT_SECRET} = require('./auth');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://kitesmaurya:shubham123@cluster0.sghep.mongodb.net/facebook')
.then(() => console.log('connected to database'))

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    await users.create({
        username: username,
        email: email,
        password: hashPassword
    });

    res.status(200).json({
        message: 'you are signrd up'
    })

});
app.post('/signin',async (req, res) => {
    const {email, password} = req.body;

    const response = await users.findOne({
        email: email,
        password: password
    })

    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.status(200).json({
            token
        })
    } else {
        res.status(400).json({
            message: 'your credentials are wrong'
        })
    }
});
app.post('/todo', auth, async (req, res) => {
    const {userid, title, done} = req.body;

    await todos.create({
        userid: userid,
        title: title,
        done: done
    })

    res.status(200).json({
        message: 'todo created'
    })
});
app.get('/todos', auth, async (req, res) => {
    const userid = req.userid;

    const todos = await todos.find({
        userid
    })

    res.status(200).json({
        todos
    })
});

app.listen(3000, () =>  console.log('server running on port 3000'));