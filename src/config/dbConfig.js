const mongoose = require("mongoose");

const serverConfig = require("./serverConfig");

// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(serverConfig.DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
module.exports = connectDB;
