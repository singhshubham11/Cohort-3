const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({
                message: 'Email already exist'
            })
        }

        await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: 'user signed up successfully'
        })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({message: 'invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message: 'invalid email or password'})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = {signup, signin};