const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('login', new LocalStrategy({
  usernameField: '',
  passwordField: '',
}, (email, role, done)  => {
  return done(null, { email, role });
}));