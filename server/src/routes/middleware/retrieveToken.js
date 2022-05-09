const fetch = require("node-fetch");

const encodeBody = require("../../util/encodeBody");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("../../util/config");

const retrieveToken = async (req, res) => {
  const body = {
    grant_type: "authorization_code",
    code: req.query.code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  };

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: encodeBody(body),
      }
    );

    const jsonToken = await tokenResponse.json();
    const searchParamsString = new URLSearchParams(jsonToken).toString();

    res.redirect(`http://localhost:3000/?${searchParamsString}`);
  } catch (err) {
    console.error("An error occured while fetching Spotify creds: ", err);
  }
};

module.exports = retrieveToken;
