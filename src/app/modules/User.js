const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: 'String',
            required: true,
            maxLength: 30,
            minLength: 5,
        },

        username: {
            type: 'String',
            trim: true,
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 25,
        },

        email: {
            type: 'String',
            trim: true,
            required: true,
            unique: true,
        },

        password: {
            type: 'String',
            required: true,
            minLength: 6,
        },

        avatar: {
            type: 'String',
            default:
                'https://res.cloudinary.com/quankiu/image/upload/v1640073108/qmedia/default-avatar-300x300_ptt1u6.png',
        },

        role: {
            type: 'String',
            default: 'admin',
        },

        gender: {
            type: 'String',
            default: 'Nam',
        },

        mobile: {
            type: 'String',
            default: '',
        },

        address: {
            type: 'String',
            default: '',
        },

        story: {
            type: 'String',
            default: '',
            maxLength: 200,
        },

        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],

        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        saved: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
