const express = require('express');

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/setlist', (req, res) => {
  res.json({ message: '7/11 was a part time job' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
