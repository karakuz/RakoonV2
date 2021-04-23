const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const twofactor = require("node-2fa");
const nodemailer = require("nodemailer");

router.post("/2fa/generateSecret", async (req, res) => {
    console.log("slskdfsd");
    const newSecret = twofactor.generateSecret();
    console.log(newSecret);
    console.log(newSecret.secret);
    const user = await User.findOne({ where: { e_mail: req.body.email } });
    await User.update({ twofa_token: newSecret.secret }, { where: { e_mail: req.body.email } });
    const token = twofactor.generateToken(newSecret.secret).token;
    TwoFAMail(req.body.email, token);

});

router.post("/2fa/verifySecret/:token", async (req, res) => {

    const inputToken = req.body.input;
    const id = req.body.id;
    const user = await User.findOne({ where: { user_id: id } });

    const verified = await twofactor.verifyToken(user.twofa_token, inputToken);
    console.log(verified);
    if (verified) {
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