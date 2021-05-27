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
    origin: "https://vigorous-jackson-e3683d.netlify.app", // <-- location of the react app were connecting to
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



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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