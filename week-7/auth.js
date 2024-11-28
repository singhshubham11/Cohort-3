const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pavansingh';

function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userid = response.id;
        next();
    }else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {auth, JWT_SECRET};