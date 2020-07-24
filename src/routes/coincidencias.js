var express = require('express');
var router = express.Router();
const coincidenciasController = require('../controllers/coincidenciasController');

router.get('/find', coincidenciasController.find);
router.get('/search', coincidenciasController.search);

module.exports = router;
