const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connecting Error');
    }
}

module.exports = { connect };
