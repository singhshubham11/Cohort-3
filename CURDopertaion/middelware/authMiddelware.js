const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            message: 'Access denied'
        })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = verified.id;
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Invalid token'
        })
    }
};

module.exports = auth;