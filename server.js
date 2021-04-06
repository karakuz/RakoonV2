//const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");
const path = require('path');
const AuthRoutes = require("./backend/routes/Auth/AuthRotes");
const ForgotRoutes = require("./backend/routes/Forgot/ForgotRoutes");
const ProductRoutes = require("./backend/routes/Product/ProductRoutes");
const UserCartRoutes = require("./backend/routes/UserCart/CartRoutes");
const Database = require("./backend/config/database");
const rest = require('./backend/config/rest');
//----------------------------------------- END OF IMPORTS---------------------------------------------------

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("secretcode"));

require("./backend/passportConfig")(passport);

app.use('/static', express.static(path.join(__dirname, './build/static')));

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.use(AuthRoutes);
app.use(ForgotRoutes);
app.use(ProductRoutes);
app.use(UserCartRoutes);
app.use(rest);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  })
}

//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(PORT, () => {
  console.log(`Server Has Started at port ${PORT}`);
});

/*
(async () => {
  //await Database.connectDB();
  const res = await Database.get("SELECT * FROM `users`",{ raw: true });
  console.log("res: " + JSON.stringify(res,null,'\t'));
  //Database.get("USE rakoon; SHOW tables;");
})();
*/
