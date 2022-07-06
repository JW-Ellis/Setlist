const fetch = require("node-fetch");
const encodeBody = require("../../util/encodeBody");

const { CLIENT_ID, CLIENT_SECRET } = require("../../util/config");

const fetchAccessToken = async () => {
  const body = {
    grant_type: "client_credentials",
  };

  const encodeString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    const authToken = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodeString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeBody(body),
    });
    const { access_token } = await authToken.json();

    return access_token;
  } catch (error) {
    console.error("Error when server auth: ", error);
  }
};

module.exports = fetchAccessToken;
