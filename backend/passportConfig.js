const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      const user = await User.findOne({ where: { e_mail: username } });

      if (user === null || user === undefined) {
        console.log("Not found");
        done(null, false);
      }
      else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, {
              user_id: user.user_id,
              email: user.e_mail,
              password: user.password,
              name: user.name,
              surname: user.surname,
              role_id: user.role_id,
              is_verified: user.is_verified
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


