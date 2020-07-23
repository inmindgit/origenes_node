const { getContract } = require("../utils/getContract");
const System = require("../models/System");
const DnaSample = require("../models/DnaSample");
const DnaAnalysis = require("../models/DnaAnalysis");
let SNP = 'SNP'

module.exports = {
  async call(keypair, caseNumber, snpArray) {
    try {

      const snpSystem = new System(SNP);
      const timeNow = new Date().toISOString();
      const dnaAnalysis = new DnaAnalysis(timeNow, caseNumber, snpArray, []);
      const dnaSample = new DnaSample(snpSystem, dnaAnalysis);


      const contract = await getContract(keypair)
      const result = await contract.methods.add_dna_sample(
        dnaSample,
        caseNumber
      );
      
      console.log(result);
      
      return {
        success: true,
        message: '',
        hash: result.hash
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
        message: e.decodedError,
        hash: e.error
      }
    }
  }
}
