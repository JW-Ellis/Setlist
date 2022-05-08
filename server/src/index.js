const express = require('express');

const app = express();
const cors = require('cors');

// ROUTES
const index = require('./routes/index.js');
const login = require('./routes/login.js');
const logged = require('./routes/logged.js');

const PORT = process.env.PORT || 8000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', index);
app.use('/login', login);
app.use('/logged', logged);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
