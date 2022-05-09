const express = require("express");
const SPOTIFY_CONSTANTS = require("../util/constants");
const { CLIENT_ID, REDIRECT_URI } = require("../util/config");

const router = express.Router();

router.get("/", async (req, res) => {
  // Retrieve spotify auth creds from user
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${
      SPOTIFY_CONSTANTS.SCOPE
    }&show_dialog=${true}`
  );
});

module.exports = router;
