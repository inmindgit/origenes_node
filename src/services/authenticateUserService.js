const { getContract } = require("../utils/getContract");

module.exports = {
  async userRegistration() {
    try {
      const keypair = JSON.parse(process.env.KEYPAIR)
      const contract = await getContract(keypair)
      const result = await contract.methods.user_registration();
      
      return {
        success: true,
        payload: result.decodedResult.profile
      }
    } catch(error) {
      return {
        success: false,
        error: 'Error'
      }
    }
  }
}