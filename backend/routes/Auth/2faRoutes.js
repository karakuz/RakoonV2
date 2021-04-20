const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");

router.post("/2fa/generateSecret", async (req, res) => {
    const sessionID = req.body.sessionID;
    const user = await jwt.verify(sessionID, 'shhhhh');
    var secret = speakeasy.generateSecret({ length: 20 });
    await User.update({ twofa_token: secret.base32 }, { where: { user_id: user.user_id } });
    TwoFAMail(user.e_mail, secret);
});

router.post("/2fa/verifySecret", async (req, res) => {
    const sessionID = req.body.sessionID;
    const inputToken = req.body.inputToken;
    const session_user = await jwt.verify(sessionID, 'shhhhh');
    const user = User.findOne({ where: { user_id: session_user.user_id } });
    var token = speakeasy.totp({
        secret: user.twofa_token,
        encoding: base32
    });
    if (inputToken === token) {
        res.send(true);

    }
    else {
        res.send(false);
    }
})



const TwoFAMail = async function (email, secret) {
    var token = speakeasy.totp({
        secret: secret,
        encoding: base32
    });
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