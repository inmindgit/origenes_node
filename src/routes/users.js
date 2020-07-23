var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');

// TODO: Agregar middleware de autenticacion
router.get('/signIn', usersController.new);

router.post('/signIn', passport.authenticate('login', {
  successRedirect: '/muestras/new',
  failureRedirect: '/'
}));

module.exports = router;
