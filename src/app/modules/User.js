const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema(
    {
        username: { type: String },
        password: { type: String },
        refreshToken: { type: String, default: null },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserModel);
