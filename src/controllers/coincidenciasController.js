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
    const {
      caseNumber
    } = req.body;
    const marcadores = req.body['marcadores[]'];

    const keypair = JSON.parse(process.env.KEYPAIR);
    
    const result = await matchSnpService.call(
      keypair,
      caseNumber,
      marcadores
    );

    // redireccionar al usuario al lugar apropiado si esta todo OK, caso contrario mostrar errores.
    if(result.success) {
      req.flash('success', `Hash: ${result.hash}`);
      return res.redirect('/coincidencias/find');
    } else {
      req.flash('error', result.message)
      res.locals.message = req.flash()
      return res.render('coincidencias/find', {
        error: result.message,
        currentUser: req.user
      })
    }
  },
  
  // STR
  async str(req, res) {
    const {
      caseNumber,
    } = req.body;
    const strObjects = [];
    
    for (i = 1; i < 21; i++) {
      const marcador = req.body[`marcador[${i}][]`];
      strObjects.push(marcador);
    }

    // enviar los datos ingresados al BC
    const keypair = JSON.parse(process.env.KEYPAIR);

    const result = await matchStrService.call(
      keypair,
      caseNumber,
      strObjects
    );

    console.log(result)

    // redireccionar al usuari al lugar apropiado si esta todo OK, caso contrario mostrar errores.
    if(result.success) {
      req.flash('success', `Hash: ${result.hash}`);
      return res.redirect('/coincidencias/find');
    } else {
      req.flash('error', result.message)
      res.locals.message = req.flash()
      return res.render('coincidencias/find', {
        error: result.message,
        currentUser: req.user
      })
    }
  }
}