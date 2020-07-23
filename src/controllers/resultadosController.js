const addSnpService = require("../services/addSnpService");
const addStrService = require("../services/addStrService");

module.exports = {
  async newResultado(req, res) {
    return res.render('resultados/new', {
      title: 'Carga de resultados'
    })
  },

  async createSNP(req, res) {
    // definir el nombre de los marcadores SNP (150 marcadores con diferentes valores posibles)
    const {
      caseNumber
    } = req.body;
    marcadores = req.body['marcadores[]'];

    const keypair = JSON.parse(process.env.KEYPAIR);

    const result = await addSnpService.call(
      keypair,
      caseNumber,
      marcadores
    );

    // redireccionar al usuario al lugar apropiado si esta todo OK, caso contrario mostrar errores.
    if(result.success) {
      req.flash('success', `Hash: ${result.hash}`);
      return res.redirect('resultados/new');
    } else {
      req.flash('error', result.message)
      res.locals.message = req.flash()
      return res.render('resultados/new', {
        error: result.message
      })
    }
  },

  async createSTR(req, res) {
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

    const result = await addStrService.call(
      keypair,
      caseNumber,
      strObjects
    );

    // redireccionar al usuari al lugar apropiado si esta todo OK, caso contrario mostrar errores.
    if(result.success) {
      req.flash('success', `Hash: ${result.hash}`);
      return res.redirect('resultados/new');
    } else {
      req.flash('error', result.message)
      res.locals.message = req.flash()
      return res.render('resultados/new', {
        error: result.message
      })
    }
  }
}

// D3S1358 = {
//   '0': 0000,
//   '1': 1111
// }
// THO1
// D21S11
// D18S51
// PENTAE
// D5S818
// D13S317
// D7S820
// D16S539
// CSF1PO
// PENTAD
// vWA
// D8S1179
// TPOX
// FGA
// D19S433
// D1S1656
// D12S391
// D2S1338
// AMEL