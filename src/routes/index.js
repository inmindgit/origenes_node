var express = require('express');
var router = express.Router();
const authSession = require('../services/passport/authSession');

/* GET home page. */
router.get('/', authSession.checkSession, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
