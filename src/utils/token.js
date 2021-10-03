const jwt = require('jsonwebtoken');
module.exports = {
    signToken: (user_id, secret, expiresIn) => {
        return jwt.sign({ _id: user_id }, secret, {
            expiresIn: expiresIn,
        });
    },
    verifyToken: (token, secret) => {
        return jwt.verify(token, secret);
    },
};
