const numberGeneratorService = require('../services/numberGeneratorService');
const fs = require('fs');
const path = require('path');
const addPersonService = require('../services/addPersonService');
const PersonalData = require('../models/PersonalData');

module.exports = {
  async new(req, res){
    const number = numberGeneratorService.call();
    res.locals.message = req.flash()
    // aqui renderizar la vista correspondiente, con el `number` autogenerado como local.
    // este numero no podra ser modificado en la UI.
    // este numero debera ser devuelto en el formulario para ser enviado a BC en accion `create`
    return res.render('muestras/new', {
      title: 'Cargar nueva muestra',
      number
    });
  },

  async create(req, res) {
    try {
      // const keypair = await JSON.parse('{"publicKey":"ak_xew1bEqH4f59jNdP9jwRmBfBWDa3uoWqMdcsoZ1F2ZkrtXTcB","secretKey":"54cbdf775706568d58705c574b358831e68be41eeb35304810e7b7b4033971897e5e82de52e7e296cba9cc4167bf4be210a6e5133e32ecb9cb12d45b50b44093"}');
      const keypair = await JSON.parse(process.env.KEYPAIR);
  
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
      
      let result = await addPersonService.call(keypair, caseNumber, personalData)

      if(result.success) {
        req.flash('success', `Hash: ${result.hash}`);
        return res.redirect('/muestras/new');
      } else {
        req.flash('error', result.message)
        res.locals.message = req.flash()
        return res.render('muestras/new', {
          error: result.message,
          number: caseNumber
        })
      }
    } catch(e) {
      console.log(e.decodedError);
    }
    
    // aqui redireccionar la request a donde haga falta
  }
}