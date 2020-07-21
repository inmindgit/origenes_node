const { Crypto } = require('@aeternity/aepp-sdk');

getKeypair = async () => {
  
  try{
    const keypair = await Crypto.generateKeyPair()

    console.log(process.env.PUBLIC_KEY);

  } catch(err){
    console.log(JSON.stringify({Error: err}))
  }
};

getKeypair()