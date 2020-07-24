var express = require('express');
var router = express.Router();
const coincidenciasController = require('../controllers/coincidenciasController');
const authSession = require('../services/passport/authSession');
const authorizationService = require('../services/authorization/authorizationService');

router.get('/find', authSession.checkSession, authorizationService.authorize, coincidenciasController.find);
router.post('/str', authSession.checkSession, authorizationService.authorize, coincidenciasController.str);
router.post('/snp', authSession.checkSession, authorizationService.authorize, coincidenciasController.snp);

module.exports = router;
