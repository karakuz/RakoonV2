const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

router.post("/login", (req, res, next) => {
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
router.post("/register", (req, res) => {
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
router.get("/user", (req, res) => {
    res.send(req.user);
    console.log(req.body.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = router;