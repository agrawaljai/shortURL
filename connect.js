const mongoose = require("mongoose");

async function connectToMongoose(url) {
    return mongoose.connect(url).then(() => console.log("Connected to MongoDB successfully.")).catch((err) => console.log("MongoDB connection failed!"));
}

module.exports = {
    connectToMongoose,
}