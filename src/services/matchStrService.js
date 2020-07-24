const { getContract } = require("../utils/getContract");
const System = require("../models/System");
const DnaSample = require("../models/DnaSample");
const DnaAnalysis = require("../models/DnaAnalysis");
const StrIndicator = require("../models/StrIndicator");
let SNP = 'SNP'
let SNPID = 2;

module.exports = {
  async call(keypair, caseNumber, strArray) {
    try {

      const snpSystem = new System(SNPID, SNP);
      const timeNow = new Date().toISOString();
      const strArrayObjects = strArray.map((e) => new StrIndicator(e[0], parseInt(e[1]), parseInt(e[2])));
      const dnaAnalysis = new DnaAnalysis(timeNow, caseNumber, [], strArrayObjects);
      const dnaSample = new DnaSample(snpSystem, dnaAnalysis);

      const contract = await getContract(keypair);
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
