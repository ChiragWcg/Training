// authentication strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

const User = require("./model/userModel");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          console.log("Invalid...");
          return done(null, false, {
            message: "email wrong!",
          });
        }
        if (password != user.password) {
        // if (!bcrypt.compareSync(password, user.password)) {
          console.log("Password not match");
          return done(null, false, {
            message: "password not match...",
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    let user = await User.findById(id);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});
