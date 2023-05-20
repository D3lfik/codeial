const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { error } = require('console');



// tell passport to use new strategy  for google login
passport.use(
    new GoogleStrategy(
      {
        clientID: "524394902723-agjdm8m92l97tbcm3qdk59urqscu0gld.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value }).exec();
          console.log(accessToken,refreshToken);
          console.log(profile);
          if (user) {
            // If found, set this user as req.user
            return done(null, user);
          } else {
            // If not found, create and set it as req.user
            const createdUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
  
            return done(null, createdUser);
          }
        } catch (err) {
          console.log("Error in google strategy-passport", err);
          return done(err);
        }
      }
    )
  );
  

module.exports = passport;