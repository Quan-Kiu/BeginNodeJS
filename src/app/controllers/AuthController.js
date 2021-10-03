require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const UserModel = require('../modules/User');
const { signToken } = require('../../utils/token');

class AuthController {
    login(req, res) {
        res.sendFile(
            path.join(
                __dirname,
                '../',
                '../',
                'resources',
                'views',
                'auth',
                'login.html'
            )
        );
    }

    register(req, res) {
        res.sendFile(
            path.join(
                __dirname,
                '../',
                '../',
                'resources',
                'views',
                'auth',
                'register.html'
            )
        );
    }

    async createUser(req, res) {
        const { username, password } = req.body;
        var user = await UserModel.findOne({ username });
        if (user) return res.status(500).json({ message: 'User is already' });
        const hashPassword = bcrypt.hashSync(password, 10);
        var user = new UserModel({ username, password: hashPassword });
        UserModel.create(user)
            .then(() => res.status(200).json(user))
            .catch((err) => res.status(500).json({ message: 'That bai' }));
    }

    async loginUser(req, res) {
        const { username, password } = req.body;

        var user = await UserModel.findOne({ username });

        if (!user) {
            return res
                .status(403)
                .json({ message: 'Wrong username or password' });
        }

        const isHashPassword = bcrypt.compareSync(password, user.password);

        if (!isHashPassword) {
            return res
                .status(403)
                .json({ message: 'Wrong username or password' });
        }

        const accessToken = signToken(
            user._id,
            process.env.ACCESS_TOKEN_SECRET,
            120
        );

        const refreshToken = signToken(
            user._id,
            process.env.REFRESH_TOKEN_SECRET,
            120 * 60
        );

        if (!accessToken || !refreshToken) {
            return res.status(500).json({ message: 'TOKEN is error' });
        }

        UserModel.findByIdAndUpdate(user._id, { refreshToken: refreshToken })
            .then(() => {
                return res.status(201).json({ token: accessToken });
            })
            .catch((err) => {
                return res.status(500).json({ err });
            });
    }
}

module.exports = new AuthController();
