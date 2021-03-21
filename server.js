const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

const authRoutes = require('./backend/routes/auth');

//middleware routes
app.use("/login", authRoutes);

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  console.log("rooooooooot");
});

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`)
})