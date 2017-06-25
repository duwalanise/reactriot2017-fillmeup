const express = require('express');
const path = require('path');

const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
  // __dirname : It will resolve to your project folder.
});

app.listen(process.env.PORT || 8080);

console.log('8080');
