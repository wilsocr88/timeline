const mongoose = require('mongoose');
const Post = require('./models/Posts');

const connect = async () => {
    console.log(process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tl', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 35000,
            connectTimeoutMS: 35000,
            socketTimeoutMS: 35000,
            keepAlive: 300000
        });
    } catch (e) {
        console.error(e);
    }
};

const models = {
    Post
};

module.exports = {
    connect,
    models
};