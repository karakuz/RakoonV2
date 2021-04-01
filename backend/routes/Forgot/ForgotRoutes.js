const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const flash = require("connect-flash");

router.post("/forgot", function (req, res, next) {
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

router.post('/reset/:token', function (req, res) {
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

module.exports = router;