require('dotenv').config();
const { verifyToken } = require('../utils/token');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/auth/login');

    try {
        verifyToken(req.cookies.token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Vui long login' });
    }
};
