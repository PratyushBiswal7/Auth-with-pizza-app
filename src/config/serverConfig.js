const dotenv = require("dotenv");

dotenv.config();

// here we are exporting the env variables
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.mongoDB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
};
