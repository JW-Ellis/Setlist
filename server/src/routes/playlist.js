const express = require("express");
const getSetlistData = require("../routes/middleware/getSetlistData");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // get top tracks from each artist
    console.log("TOP TRACKS: ", await getSetlistData(req));
  } catch (error) {
    console.error("playlist creation error: ", error);
  }

  //getArtists(zipCode);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json({ test: "hahalal" });
});

module.exports = router;
