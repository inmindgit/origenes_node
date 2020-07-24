const askNumberCase = require("../services/askNumberCase");
const cryptoService = require('../services/cryptoService');

module.exports = {
  async find(req, res) {
    return res.render('muestras/search', {
      title: 'Buscar muestras',
      currentUser: req.user
    });
  },

  async search(req, res){
    const {
      documentId
    } = req.query;

    const keypair = JSON.parse(process.env.KEYPAIR);

    // const documentIDEncrypted = cryptoService.encryptString(documentId.toString());
    
    const result = await askNumberCase.call(keypair, documentId.toString());

    if(result.success) {
      return res.render('muestras/search', {
        numberCaseResult: result.hash,
        currentUser: req.user
      })
    } else {
      return res.render('muestras/search', {
        numberCaseResult: result.hash,
        currentUser: req.user
      })
    }
  }
}