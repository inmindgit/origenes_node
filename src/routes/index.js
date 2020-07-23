var express = require('express');
var router = express.Router();
const authSession = require('../services/passport/authSession');
const homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', authSession.checkSession, homeController.index);

module.exports = router;
