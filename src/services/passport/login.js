const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticateUserService = require('./../../services/authenticateUserService');

passport.use('login', new LocalStrategy(
  async (username, password, done)  =>{
    try {
      const result = await authenticateUserService.userRegistration();

      switch (result.success) {
        case true:
          return done(null, result.payload);
        case false: 
          return done(result.error);
      }
    } catch(error) {
      console.log(error);
    }
  }));