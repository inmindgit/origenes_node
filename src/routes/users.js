var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

// TODO: Agregar middleware de autenticacion
router.get('/signIn', usersController.new);

router.post('/signIn', usersController.create);

module.exports = router;
