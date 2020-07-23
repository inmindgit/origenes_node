const { getContract } = require("../utils/getContract");

module.exports = {
  async call(keypair, caseNumber) {
    try {
      const keypair = JSON.parse(process.env.KEYPAIR);
      const contract = await getContract(keypair);
      
      // TODO add method.
      // const result = await contract.methods.add_dna_sample(
      //   dnaSample,
      //   caseNumber
      // );
      
      console.log(result);
      
      return {
        success: true,
        message: '',
        hash: result.hash
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