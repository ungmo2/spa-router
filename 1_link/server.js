const express = require('express');
const path = require('path');

const app = express();
const port = 5001;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening on http:/localhost:${port}`);
});
