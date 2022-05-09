const express = require("express");
const cors = require("cors");
const { PORT } = require("./util/config");

const app = express();

// ROUTES
const index = require("./routes/index.js");
const login = require("./routes/login.js");
const logged = require("./routes/logged.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", index);
app.use("/login", login);
app.use("/logged", logged);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
