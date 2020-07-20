var express = require('express');
var router = express.Router();
const resultadosController = require('../controllers/resultadosController');

// Ruta encargada de renderizar el formulario con TABS para ingresar SNP o STR.
router.get('/new', resultadosController.newResultado);

// Ruta encargada de crear una muestra STR
router.get('/createSNP', resultadosController.createSNP);

// Ruta encargada de crear una muestra SNP
router.get('/createSTR', resultadosController.createSTR);

module.exports = router;
