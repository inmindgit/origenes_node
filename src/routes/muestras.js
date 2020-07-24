var express = require('express');
var router = express.Router();
const muestrasController = require('../controllers/muestrasController');
const searchController = require('../controllers/searchController');
const authSession = require('../services/passport/authSession');
const authorizationService = require('../services/authorization/authorizationService');

router.get('/new', muestrasController.new);

router.post('/create', muestrasController.create);

router.get('/find', searchController.find);

router.get('/search', searchController.search);

module.exports = router;
