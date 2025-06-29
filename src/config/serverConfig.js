const dotenv = require("dotenv");

dotenv.config();

// here we are exporting the env variables
module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.mongoDB_URL,
};
