const { getContract } = require("../utils/getContract");

module.exports = {
  async call(keypair, documentID) {
    try {
      const contract = await getContract(keypair);

      const result = await contract.methods.ask_for_sample_dna_test(documentID);
      
      console.log(result.decodedResult);

      return {
        success: true,
        message: '',
        hash: result.decodedResult
      }
    } catch(e){
      console.log(e)
      return {
        success: false,
        message: e.decodedError,
        hash: e.error
      }
    }
  }
}