const passport = require('passport');
const User = require('../models/user');

const JWtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
     }

     passport.use(new JWtStrategy(opts, async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload._id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.log('Error in finding the user from JWT', err);
          return done(err);
        }
      }));
module.exports = passport;
