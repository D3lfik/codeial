const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { error } = require('console');
const env = require('../config/environment');



// tell passport to use new strategy  for google login
passport.use(
    new GoogleStrategy(
      {
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url
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