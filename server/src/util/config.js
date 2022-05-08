require("dotenv").config();

const serverConfig = {
  PORT: process.env.PORT || 8000,
};

module.exports = serverConfig;
