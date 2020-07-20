const numberGeneratorService = require('../services/numberGeneratorService');
const fs = require('fs');
const path = require('path');

module.exports = {
  async new(req, res){
    const number = numberGeneratorService.call();

    // aqui renderizar la vista correspondiente, con el `number` autogenerado como local.
    // este numero no podra ser modificado en la UI.
    // este numero debera ser devuelto en el formulario para ser enviado a BC en accion `create`

    return res.render('muestras/new', {
      title: 'Cargar nueva muestra'
    });
  },

  async create(req, res) {
    const {
      firstName,
      lastName,
      nationalID, 
      countryOfBirth,
      countryOfRegion,
      laboratoryOfOrigin
    } = req.body;

    // aqui redireccionar la request a donde haga falta
  }
}