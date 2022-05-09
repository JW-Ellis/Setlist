require("dotenv").config();

const serverConfig = {
  PORT: process.env.PORT || 8000,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SEC,
  REDIRECT_URI: process.env.REDIRECT_URI,
};

module.exports = serverConfig;
