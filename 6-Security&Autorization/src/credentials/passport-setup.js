const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.model');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, callback) {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      await User.create({ googleId: profile.id, ...profile });
    }

    return callback(null, profile);
  }
));
