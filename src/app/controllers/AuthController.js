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
        try {
            const { email, password } = req.body;
            if (!email.trim())
                return res
                    .status(403)
                    .json({ message: 'Trường email không được để trống.' });

            if (!password.trim())
                return res
                    .status(403)
                    .json({ message: 'Trường password không được để trống.' });

            var user = await UserModel.findOne({ email });

            if (!user) {
                return res
                    .status(403)
                    .json({ message: 'Tài khoản không tồn tại.' });
            }

            const isHashPassword = bcrypt.compareSync(password, user.password);

            if (!isHashPassword) {
                return res
                    .status(403)
                    .json({ message: 'Sai tài khoản hoặc mật khẩu.' });
            }

            res.json({ message: 'Đăng nhập thành công!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
