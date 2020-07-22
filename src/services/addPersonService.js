const { getContract } = require("../utils/getContract");
const Human = require("../models/Human");

module.exports = {
  async call(keypair, caseNumber, personalData) {

    const human = new Human(caseNumber, personalData);

    try {
      const contract = await getContract(keypair)

      const result = await contract.methods.add_human(
        caseNumber,
        human,
        personalData
      )
      
      return {
        success: true,
        message: '',
        hash: result.hash
      }
    } catch (e) {
      return {
        success: false,
        message: e.decodedError,
        hash: e.error
      }
    }
  }
}