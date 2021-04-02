const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (username, password, done) => {
            const user = await User.findOne({ where: { e_mail: username } });
            console.log(user.user_id);

            if (user === null || user === undefined) {
                console.log("Not found");
                done(null, false);
            }

            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, {
                            user_id: user._id,
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
            }

        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}


