const retrieveToken = require("../services/spotify/authenticateServer");

let accessToken = "";

const setAccessToken = (token) => (accessToken = token);

const getAccessToken = async () => {
  if (!accessToken) {
    const token = await retrieveToken();
    setAccessToken(token);
  }

  return accessToken;
};

module.exports = { setAccessToken, getAccessToken };
