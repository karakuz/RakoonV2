const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./backend/models/user");
const Async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const flash = require("connect-flash");
const path = require('path');
const user = require("./backend/models/user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------

const PORT = process.env.PORT || 4000;

mongoose.connect(
  "mongodb+srv://admin:eray4193@cluster0.afcfi.mongodb.net/Users?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

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
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("NoUser");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        surname: req.body.surname,
      });
      await newUser.save();
      res.send(true);
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user);
  console.log(req.body.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.post("/forgot", function (req, res, next) {
  Async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ username: req.body.email }, function (err, user) {
        if (!user) {
          res.send('NoUser');
          return;
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "rakoonecommerceservices@gmail.com",
          pass: "rakoon123"
        }
      });
      var mailOptions = {
        to: user.username,
        from: "rakoonecommerceservices@gmail.com",
        subject: "Rakoon E-Commerce Password change",
        text: "You are receiving this e-mail because you have requested to reset your password " +
          " Please click on the following link to change your password" + '\n\n' +
          "http://localhost:3000/reset/" + token
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log("mail sent");
        done(err, "done");
        res.send("sent");
      });
    }
  ], function (err) {
    if (err) return next(err);
    // res.redirect("/forgot");
  })
});

/* app.get('/reset/:token', function (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (!user) {
      console.log('Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }

    //res.sendFile('index.html', { root: path.join(__dirname, './build/') });
  });
}); */

app.post('/reset/:token', function (req, res) {
  Async.waterfall([
    function (done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async function (err, user) {
        if (!user) {
          console.log('Password reset token is invalid or has expired.');
          return res.redirect('/');
        }
        console.log(user);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save();
        res.send(true);
        done(err, user);
      });
    },
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'rakoonecommerceservices@gmail.com',
          pass: "rakoon123"
        }
      });
      var mailOptions = {
        to: user.username,
        from: 'rakoonecommerceservices@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('Success! Your password has been changed.');
        done(err);
        res.send(true);
      });
    }
  ], function (err) {
    res.redirect('/');
  });
});


//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(PORT, () => {
  console.log(`Server Has Started at port ${PORT}`);
});
