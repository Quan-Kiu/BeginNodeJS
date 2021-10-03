const webRouter = require('./web');
const authRouter = require('./auth');
const userRouter = require('./user');

function routers(app) {
    app.use('/', webRouter);
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
}

module.exports = routers;
