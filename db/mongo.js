const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => { console.warn("db connection done") });
    } catch (error) {
        throw error;
    }
};

module.exports = connectDB;