module.exports = {
  async newResultado(req, res) {
    return res.render('resultados/new', {
      title: 'Carga de resultados'
    })
  },

  async createSNP(req, res) {
    // definir el nombre de los marcadores SNP (150 marcadores con diferentes valores posibles)
    const {
      number
    } = req.body;

    // enviar los datos cargados al BC

    // redireccionar al usuario al lugar apropiado si esta todo OK, caso contrario mostrar errores.
  },

  async createSTR(req, res) {
    const {
      number,
      str
    } = req.body;

    const obj = req.body;
    console.log('PARAMETERSSSSS: ', obj['marcadores[0]']);
    console.log('PARAMETERSSSSS: ', obj['marcadores[1]']);
    console.log('PARAMETERSSSSS: ', obj['marcadores[2]']);
    // enviar los datos ingresados al BC

    // redireccionar al usuari al lugar apropiado si esta todo OK, caso contrario mostrar errores.
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