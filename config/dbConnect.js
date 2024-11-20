const mongoose = require('mongoose');

const connectDatabase = async () => {
    if (!process.env.MONGO_URL) {
        console.error("MONGO_URL environment variable is not defined.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to ${mongoose.connection.host}`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = connectDatabase;