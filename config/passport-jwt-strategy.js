const passport = require('passport');
const User = require('../models/user');
const env = require('../config/environment');

const JWtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_secret
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
