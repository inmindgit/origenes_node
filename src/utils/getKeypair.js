const { Crypto } = require('@aeternity/aepp-sdk');

module.exports.getKeypair = async () => {
  
  try{
    const keypair = await Crypto.generateKeyPair()

    return keypair;
  } catch(err){
    console.log(JSON.stringify({Error: err}))
  }
};
