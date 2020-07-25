const matchStrService = require("../services/matchStrService");
const matchSnpService = require("../services/matchSnpService");

module.exports = {
  async find(req, res) {
    res.locals.message = req.flash()
    return res.render('coincidencias/find', {
      title: 'Buscar muestras',
      currentUser: req.user
    });
  },

  // SNP
  async snp(req, res) {
  },
  
  // STR
  async str(req, res) {
  }
}