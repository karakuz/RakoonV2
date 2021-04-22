const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

router.post("/2fa/generateSecret", async (req, res) => {
    console.log("slskdfsd");
    var secret = speakeasy.generateSecret({ length: 20 });
    const user = await User.findOne({ where: { e_mail: req.body.email } });
    await User.update({ twofa_token: secret.base32 }, { where: { e_mail: req.body.email } });
    var token = speakeasy.totp({
        secret: secret,
        encoding: "base32"
    });
    TwoFAMail(req.body.email, token);
    res.send(user.user_id);
});

router.post("/2fa/verifySecret/:token", async (req, res) => {

    const inputToken = req.body.input;
    const id = req.body.id;
    const user = User.findOne({ where: { user_id: id } });
    var token = speakeasy.totp({
        secret: user.twofa_token,
        encoding: "base32"
    });
    console.log(token);
    if (inputToken === token) {
        res.send(true);

    }
    else {
        res.send(false);
    }
})



const TwoFAMail = async function (email, token) {

    console.log(token);
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rakoonecommerceservices@gmail.com',
            pass: "rakoon123"
        }
    });
    var mailOptions = {
        to: email,
        from: 'rakoonecommerceservices@gmail.com',
        subject: 'Your One time Code',
        text: 'Hello,\n\n' +
            'This is your one time code to login Rakoon: ' + token + '\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        console.log("two fa mail has sent");
    });
}

module.exports = router;