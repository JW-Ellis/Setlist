const express = require("express");
const SPOTIFY_CONSTANTS = require("../util/constants");

const router = express.Router();

require("dotenv").config();

router.get("/", async (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${
      process.env.CLIENT_ID
    }&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${
      SPOTIFY_CONSTANTS.SCOPE
    }&show_dialog=${true}`
  );
});

module.exports = router;
