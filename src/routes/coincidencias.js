var express = require('express');
var router = express.Router();
const coincidenciasController = require('../controllers/coincidenciasController');

router.get('/find', coincidenciasController.find);
router.post('/str', coincidenciasController.str);
router.post('/snp', coincidenciasController.snp);

module.exports = router;
