const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Store = require("../../models/store");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passportLocal = require("passport-local").Strategy;
const Web3 = require("web3");

/*
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("NoUser");
    console.log(user.is_verified);
    if (user.is_verified === 0) {
      res.send("notVerified");

    }
    else if (user.is_twofa === 1) {
      res.send("twofa");
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
});
*/

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { e_mail: req.body.username } });

  if (user === null || user === undefined) {
    res.send("UserNotExist");
  }
  else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result === true) {
        if (user.is_verified) {
          if (user.is_twofa) {
            res.send("twofa");
          }
          else {
            // Succesful login
            res.send(user);
          }
        }
        else {
          res.send("notVerified")
        }
      }
      else {
        res.send("WrongPassword");
      }
    })
  }
});

router.post("/register", async (req, res) => {
  const user = await User.findOne({ where: { e_mail: req.body.username } });

  if (user === null || user === undefined) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let activate = await bcrypt.hash(req.body.name, 10);
    activate = activate.replace(/\//g, "");
    const wallet = await createWallet();
    const newUser = await User.create({
      e_mail: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      surname: req.body.surname,
      role_id: 1,
      is_verified: false,
      activate_token: activate,
      wallet_address: wallet.address,
      wallet_private_key: wallet.privateKey
    });

    VerifyMail(newUser, activate);
    const user_id = await require('../../config/database').get(`SELECT user_id FROM users WHERE e_mail='${req.body.username}'`);
    console.log(user_id[0].user_id);
    res.send({ success: true, user_id: user_id[0].user_id });
  }

  else {
    res.send({ res: "exists" })
  }
});

router.post("/store_register", async (req, res) => {
  const user = await User.findOne({ where: { e_mail: req.body.username } });

  if (user === null || user === undefined) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let activate = await bcrypt.hash(req.body.name, 10);
    activate = activate.replace(/\//g, "");
    const wallet = await createWallet();
    const newUser = await User.create({
      e_mail: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      surname: req.body.surname,
      role_id: 3,
      is_verified: false,
      activate_token: activate,
      wallet_address: wallet.address,
      wallet_private_key: wallet.privateKey
    });

    const db = require('../../config/database');
    db.get(`INSERT INTO store(store_name, owner_id) VALUES('${req.body.storeName}',
      (SELECT user_id FROM users WHERE e_mail='${req.body.username}')
    );`);

    VerifyMail(newUser, activate);
    res.send(true);
  }
  else {
    res.send({ res: "exists" })
  }
});

router.post("/activate/:token", async (req, res) => {
  console.log(req.params.token);
  var user = await User.findOne({ where: { activate_token: req.params.token } });
  if (user === null || user === undefined) {
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
      'https://rakoonecommerce.netlify.app/activate/' + token
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    console.log('Success! e-mail has been sent');
  });
}


const createWallet = async function () {
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  const account = web3.eth.accounts.create();
  const admin_address = "0x27E18653d007324f1946D40bE63E71Fd1b638B9b";
  const admin_private_key = "0xdd62dedf7d92dcd4b1754a2b3c2829528538d3bb30f8860a1a948442becd8ffa"
  // send 1 bnb to new account
  const tx = await web3.eth.accounts.signTransaction({
    to: account.address,
    value: '10000000000000000', // 0.1 BNB
    gas: 2000000
  }, admin_private_key);

  console.log(tx.rawTransaction);

  await web3.eth.sendSignedTransaction(tx.rawTransaction);
  return account;
}



module.exports = router;
