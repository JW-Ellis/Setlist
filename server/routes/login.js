const express = require('express');
const router = express.Router();

require('dotenv').config();

router.get('/', async (req, res) => {
  const scope = 'playlist-modify-private playlist-modify-public';

  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${
      process.env.client_id
    }&response_type=code&redirect_uri=${
      process.env.redirect_uri
    }&scope=${scope}&show_dialog${true}`
  );
});

module.exports = router;
