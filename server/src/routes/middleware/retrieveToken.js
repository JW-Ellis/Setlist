const fetch = require("node-fetch");

const encodeBody = require("../../util/encodeBody");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("../../util/config");

const retrieveToken = async (req, res) => {
  if (req.query.error) {
    res.redirect("http://localhost:3000");
  }

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
    const { access_token, refresh_token, expires_in } =
      await tokenResponse.json();

    res
      .cookie("accessToken", access_token, {
        expires: new Date(Date.now() + 1000 * expires_in), // cookie will be removed after 1 hour
      })
      .cookie("refreshToken", refresh_token)
      .redirect("http://localhost:3000");
  } catch (err) {
    console.error("An error occured while fetching Spotify creds: ", err);
  }
};

module.exports = retrieveToken;
