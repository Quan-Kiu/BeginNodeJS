const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://quankiu:quankiu13122001@instagramproject.oreqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connecting Error');
    }
}

module.exports = { connect };
