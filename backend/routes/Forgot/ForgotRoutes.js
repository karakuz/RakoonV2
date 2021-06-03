const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");

router.post("/forgot", function (req, res, next) {
    Async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString("hex");
                done(err, token);
            });
        },
        async function (token, done) {
            let user = await User.findOne({ where: { e_mail: req.body.email } });

            if (user === null || user === undefined) {
                res.send('NoUser');
                return;
            }

            user.reset_token = token;
            user.save();

            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "rakoonecommerceservices@gmail.com",
                    pass: "rakoon123"
                }
            });

            var mailOptions = {
                to: user.e_mail,
                from: "rakoonecommerceservices@gmail.com",
                subject: "Rakoon E-Commerce Password change",
                text: "You are receiving this e-mail because you have requested to reset your password " +
                    " Please click on the following link to change your password" + '\n\n' +
                    "https://rakoonecommerce.netlify.app/reset/" + token
            };

            smtpTransport.sendMail(mailOptions, function (err) {
                console.log("mail sent");
                res.send("sent");
            });
        },
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

router.post('/reset/:token', async function (req, res) {
    var user = await User.findOne({ where: { reset_token: req.params.token } });
    console.log(user);
    if (user === null || user === undefined) {
        res.send('TokenInvalid');

    }

    else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.reset_token = undefined;
        await user.save();
        PasswordChangedMail(user);
        res.send(true);
    }

});

const PasswordChangedMail = function (user) {
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
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.e_mail + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        console.log('Success! Your password has been changed.');
        res.send(true);
    });
}

module.exports = router;