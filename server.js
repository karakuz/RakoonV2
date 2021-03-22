const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

const authRoutes = require('./backend/routes/auth');

//middleware routes
app.use("/auth", authRoutes);

mongoose.connect('mongodb+srv://admin:eray4193@cluster0.afcfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });


app.get('/', function (req, res) {

});

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`)
})