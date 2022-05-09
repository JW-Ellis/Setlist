const express = require("express");
const retrieveToken = require("./middleware/retrieveToken");

const router = express.Router();

// If Spotify auth successful, redirect with creds in query string
router.get("/", retrieveToken);

module.exports = router;
