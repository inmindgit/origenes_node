module.exports = {
  async newResultado(req, res) {
    // renderizar el formulario para carga de resultados
    // return res.render('resultados/new', {locals: locals})
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
      number
    } = req.body;

    // enviar los datos ingresados al BC

    // redireccionar al usuari al lugar apropiado si esta todo OK, caso contrario mostrar errores.
  }
}