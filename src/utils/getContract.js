// contract.methods -> use a specific contract methods.

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const fs = require("fs");
const contractSource = fs.readFileSync(__dirname + "FreedomOrigins.aes", "utf-8");
const { aeternityClient } = require("./aeternityClient");

module.exports.getContract = async (keypair) => {
  try{
    const client = await aeternityClient(keypair);
    const contract = await client.getContractInstance(
      contractSource,
      {
        contractAddress: CONTRACT_ADDRESS
      }
    );
    
    return contract;
  } catch(err){
    console.log(JSON.stringify({ErrorAEContract: err}))
  }
}
