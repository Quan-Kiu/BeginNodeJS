const path = require('path');
class UserController {
    index(req, res) {
        res.sendFile(
            path.join(
                __dirname,
                '../',
                '../',
                'resources',
                'views',
                'user',
                'index.html'
            )
        );
    }
}

module.exports = new UserController();
