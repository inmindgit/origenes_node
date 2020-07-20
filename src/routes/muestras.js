var express = require('express');
var router = express.Router();
const muestrasController = require('../controllers/muestrasController');

router.get('/new', muestrasController.new);

module.exports = router;
