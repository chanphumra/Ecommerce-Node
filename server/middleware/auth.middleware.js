const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if(!token) return res.status(400).json({message: "Unauthentication"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) =>{
        if(err) return res.status(400).json({message: "Unauthentication"});
        req.user = user;
        next();
    });
}
module.exports = verifyToken;