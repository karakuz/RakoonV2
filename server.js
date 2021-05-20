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
const TwoFARoutes = require("./backend/routes/Auth/2faRoutes");
const ForgotRoutes = require("./backend/routes/Forgot/ForgotRoutes");
const ProductRoutes = require("./backend/routes/Product/ProductRoutes");
const UserCartRoutes = require("./backend/routes/UserCart/CartRoutes");
const CategoryRoutes = require("./backend/routes/Menu/CategoryRoutes");
const ProfileRoutes = require("./backend/routes/Profile/profileRoutes");
const SearchRoutes = require("./backend/routes/Search/SearchRoutes");
const StoreRoutes = require("./backend/routes/Store/StoreRoutes");
const PaymentRoutes = require("./backend/routes/Payment/PaymentRoutes");
const Database = require("./backend/config/database");
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

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://3.67.85.199:4000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  })
}





//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.use(AuthRoutes);
app.use(ForgotRoutes);
app.use(ProductRoutes);
app.use(UserCartRoutes);
app.use(CategoryRoutes);
app.use(ProfileRoutes);
app.use(SearchRoutes);
app.use(StoreRoutes);
app.use(TwoFARoutes);
app.use(PaymentRoutes);

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

module.exports = app;