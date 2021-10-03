const path = require('path');
class WebController {
    index(req, res) {
        res.sendFile(
            path.join(
                __dirname,
                '../',
                '../',
                'resources',
                'views',
                'home.html'
            )
        );
    }
}

module.exports = new WebController();
