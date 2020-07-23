var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');

// TODO: Agregar middleware de autenticacion
router.get('/signIn', usersController.new);

router.post('/signIn', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/users/signIn'
}));

router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('/')
})

module.exports = router;
