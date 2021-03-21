const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  console.log("rooooooooot");
});

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`)
})