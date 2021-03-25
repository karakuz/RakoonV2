const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, {
                            id: user._id,
                            username: user.username,
                            password: user.password,
                            name: user.name,
                            surname: user.surname,
                            role_id: 1
                        });
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

};
