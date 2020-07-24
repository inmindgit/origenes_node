const { getContract } = require("../utils/getContract");

module.exports = {
  async userRegistration() {
    try {
      const keypair = JSON.parse(process.env.KEYPAIR)
      console.log(keypair)
      const contract = await getContract(keypair)
      const result = await contract.methods.user_registration();
      
      return {
        success: true,
        payload: result.decodedResult.profile
      }
    } catch(error) {
      console.log(error)
      return {
        success: false,
        error: error
      }
    }
  }
}