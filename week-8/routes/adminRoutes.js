const express = require('express');
const adminModel = require('../model/adminModel');
const courseModel = require('../model/courseModel');
const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD = require('../config');
const adminMiddelware = require('../middelware/adminAuth');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message: 'Signup succeeded'
    })
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email,
        password
    });
    if (admin) {
        const token = jwt.sign({id: admin._id}, JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

router.post("/course", adminMiddelware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddelware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddelware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = router;