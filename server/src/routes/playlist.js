const express = require("express");
const getSetlistData = require("../routes/middleware/getSetlistData");

const router = express.Router();

router.get("/", async (req, res) => {
  const setlist = await getSetlistData(req);

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json({ data: setlist });
});

module.exports = router;
