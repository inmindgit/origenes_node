const askNumberCase = require("../services/askNumberCase");

module.exports = {
  async find(req, res) {
    return res.render('muestras/search', {
      title: 'Buscar muestras'
    });
  },

  async search(req, res){
    const {
      documentId
    } = req.query;

    const keypair = JSON.parse(process.env.KEYPAIR);

    const result = await askNumberCase.call(keypair, documentId.toString());

    if(result.success) {
      return res.render('muestras/search', {
        numberCaseResult: result.hash
      })
    } else {
      return res.render('muestras/find', {
        numberCaseResult: result.hash
      })
    }
  }
}