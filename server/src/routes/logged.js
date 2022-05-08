const express = require("express");
const fetch = require("node-fetch");
const querystring = require("querystring");
const encodeBody = require("../util/encodeBody.js");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("../util/config");

const router = express.Router();

router.get("/", async (req, res) => {
  let body = {
    grant_type: "authorization_code",
    code: req.query.code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  };
  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: encodeBody(body),
  })
    .then((res) => res.json())
    .then((data) => {
      let query = querystring.stringify(data);
      console.log("returned data: ", data);
      res.redirect(`http://localhost:3000/?${query}`);
    });
});

module.exports = router;