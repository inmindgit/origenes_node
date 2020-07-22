const numberGeneratorService = require('../services/numberGeneratorService');
const fs = require('fs');
const path = require('path');
const addPersonService = require('../services/addPersonService');
const PersonalData = require('../models/PersonalData');

module.exports = {
  async new(req, res){
    const number = numberGeneratorService.call();

    // aqui renderizar la vista correspondiente, con el `number` autogenerado como local.
    // este numero no podra ser modificado en la UI.
    // este numero debera ser devuelto en el formulario para ser enviado a BC en accion `create`

    return res.render('muestras/new', {
      title: 'Cargar nueva muestra',
      number
    });
  },

  async create(req, res) {
    const keypair = JSON.parse(process.env.KEYPAIR)

    const {
      caseNumber,
      name,
      lastName,
      documentID, 
      identityCountry,
      registryCountry,
      laboratoryOfOrigin
    } = req.body;

    const personalData = new PersonalData(caseNumber, name, lastName, documentID, registryCountry, identityCountry)

    addPersonService.call(keypair, caseNumber, personalData)
    
    // aqui redireccionar la request a donde haga falta
  }
}