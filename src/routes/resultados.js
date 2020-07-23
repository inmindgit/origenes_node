var express = require('express');
var router = express.Router();
const resultadosController = require('../controllers/resultadosController');
const authSession = require('../services/passport/authSession');
const authorizationService = require('../services/authorization/authorizationService');

// Ruta encargada de renderizar el formulario con TABS para ingresar SNP o STR.
router.get('/new', authSession.checkSession, authorizationService.authorize, resultadosController.newResultado);

// Ruta encargada de crear una muestra STR
router.post('/createSNP', authSession.checkSession, authorizationService.authorize, resultadosController.createSNP);

// Ruta encargada de crear una muestra SNP
router.post('/createSTR', authSession.checkSession, authorizationService.authorize, resultadosController.createSTR);

module.exports = router;
