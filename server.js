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
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
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

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
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
      res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user);
  console.log(req.body.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.post("/forgot", function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ username: req.body.email }, function (err, user) {
        if (!user) {
          console.log("There is no user with that email");
          // return res.redirect("/forgot");
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
          "http://" + req.headers.host + "/reset/" + token
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log("mail sent");
        done(err, "done");
      });
    }
  ], function (err) {
    if (err) return next(err);
    // res.redirect("/forgot");
  })
});

app.get('/reset/:token', function (req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', { token: req.params.token });
  });
});

app.post('/reset/:token', function (req, res) {
  async.waterfall([
    function (done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
          console.log('Password reset token is invalid or has expired.');
          return res.redirect('/');
        }

        user.setPassword(req.body.password, function (err) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function (err) {
            req.logIn(user, function (err) {
              done(err, user);
            });
          });
        })

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
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('Success! Your password has been changed.');
        done(err);
      });
    }
  ], function (err) {
    res.redirect('/');
  });
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
