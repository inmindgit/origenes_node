const findMatchesService = require("../services/findMatchesService");

module.exports = {
  async searchCoincidencia(req, res) {
    const {
      numberCase
    } = req.body;

    // const keypair = JSON.parse(process.env.KEYPAIR);

    // const result = await findMatchesService.call();

    return res.render('coincidencias/search', {
      title: 'Buscar coincidencias',
      currentUser: req.user
    });
  }
}