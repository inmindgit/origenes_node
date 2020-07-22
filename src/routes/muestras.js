var express = require('express');
var router = express.Router();
const muestrasController = require('../controllers/muestrasController');
const searchController = require('../controllers/searchController');

router.get('/new', muestrasController.new);

router.get('/search', searchController.searchCoincidencia);

router.post('/create', muestrasController.create);

module.exports = router;
