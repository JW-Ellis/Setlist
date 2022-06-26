const express = require("express");
const cors = require("cors");
const { PORT } = require("./util/config");

const app = express();

// ROUTES
const index = require("./routes/index.js");
const login = require("./routes/login.js");
const logged = require("./routes/logged.js");
const playlist = require("./routes/playlist.js");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/", index);
app.use("/login", login);
app.use("/logged", logged);
app.use("/playlist", playlist);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
