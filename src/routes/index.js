var express = require('express');
var router = express.Router();
const authSession = require('../services/passport/authSession');
const homeController = require('../controllers/homeController');
const auditController = require('../controllers/auditController');

/* GET home page. */
router.get('/', authSession.checkSession, homeController.index);

router.post('/audit', auditController.create);

module.exports = router;
