const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

mongoose.connect('mongodb+srv://kitesmaurya:shubham123@cluster0.sghep.mongodb.net/rajma')
.then(() => {console.log('conneted to database')})
.catch((err) => {console.error('cannot connect to database', err)});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(3000, () => console.log(`Server running on port 3000`));