const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI; // must match .env exactly

console.log("Mongo URI:", URI); // temporary debug line

const connectDb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
