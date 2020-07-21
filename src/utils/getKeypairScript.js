const { Crypto } = require('@aeternity/aepp-sdk');

getKeypair = async () => {
  
  try{
    const keypair = await Crypto.generateKeyPair()

    console.log(keypair);

  } catch(err){
    console.log(JSON.stringify({Error: err}))
  }
};

getKeypair()