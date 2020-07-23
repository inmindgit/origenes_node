var express = require('express');
var router = express.Router();
const muestrasController = require('../controllers/muestrasController');
const searchController = require('../controllers/searchController');
const authSession = require('../services/passport/authSession');

router.get('/new', authSession.checkSession, muestrasController.new);

router.get('/search', authSession.checkSession, searchController.searchCoincidencia);

router.post('/create', authSession.checkSession, muestrasController.create);

module.exports = router;
