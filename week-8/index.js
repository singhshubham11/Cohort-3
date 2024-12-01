const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.error('MongoDB Disconnected: ', err);
})

app.use("/api/v1/user", require('./routes/userRoutes'));
app.use("/api/v1/admin", require('./routes/adminRoutes'));
app.use("/api/v1/course", require('./routes/courseRoutes'));

app.use((err, req, res, next) => {
    console.error('Error: ', err);

    res.status(500).json({
        message: 'Something went wrong'
    })
});

app.listen(3000, () => {console.log('Server Runnig on Port: 3000');});