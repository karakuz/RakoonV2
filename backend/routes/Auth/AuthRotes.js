const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passportLocal = require("passport-local").Strategy;

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("NoUser");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(user);
        console.log("AFTER");
        console.log(req.user);
        res.send(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", async (req, res) => {
  const user = await User.findOne({ where: { e_mail: req.body.username } });

  if (user === null || user === undefined) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const activate = await bcrypt.hash(req.body.name, 10);

    console.log(activate);
    const newUser = await User.create({
      e_mail: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      surname: req.body.surname,
      role_id: 1,
      is_verified: false,
      activate_token: activate,
    });
    console.log(newUser.e_mail);
    VerifyMail(newUser, activate);
    res.send(true);
  }

  else {
    console.log("User already exists");
  }
});

router.post("/activate/:token", async (req, res) => {
  console.log(req.params.token);
  var user = await User.findOne({ where: { activate_token: req.params.token } });
  console.log(user);
  if (user === null || user === undefined) {
    console.log("No User");
    res.send("NoUser");

  }
  else {
    user.is_verified = true;
    await user.save();
    res.redirect("/login");
  }

});

router.get("/user", (req, res) => {
  res.send(req.user);
  console.log(req.body.user); // The req.user stores the entire user that has been authenticated inside of it.
});

const VerifyMail = function (user, token) {
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rakoonecommerceservices@gmail.com',
      pass: "rakoon123"
    }
  });
  var mailOptions = {
    to: user.e_mail,
    from: 'rakoonecommerceservices@gmail.com',
    subject: 'Activation E-Mail',
    text: 'Hello,\n\n' +
      'To activate to your account please click the link below \n' +
      'http://localhost:3000/activate/' + token
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    console.log('Success! e-mail has been sent');
  });
}

module.exports = router;