var express = require('express');
var router = express.Router();
const resultadosController = require('../controllers/resultadosController');
const authSession = require('../services/passport/authSession');

// Ruta encargada de renderizar el formulario con TABS para ingresar SNP o STR.
router.get('/new', authSession.checkSession, resultadosController.newResultado);

// Ruta encargada de crear una muestra STR
router.post('/createSNP', authSession.checkSession, resultadosController.createSNP);

// Ruta encargada de crear una muestra SNP
router.post('/createSTR', authSession.checkSession, resultadosController.createSTR);

module.exports = router;
