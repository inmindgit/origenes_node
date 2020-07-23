// Para testear los métodos del contrato.
// node /utils/testContractMethods.js

const { getContract } = require("./getContract");
const { encryptString, decryptString } = require("../services/cryptoService");

//  definición de funciones
addHuman = async () => {
  
  try{
    // const keypair = JSON.parse('{“publicKey”:“ak_xew1bEqH4f59jNdP9jwRmBfBWDa3uoWqMdcsoZ1F2ZkrtXTcB”,“secretKey”:“54cbdf775706568d58705c574b358831e68be41eeb35304810e7b7b4033971897e5e82de52e7e296cba9cc4167bf4be210a6e5133e32ecb9cb12d45b50b44093"}')
    const keypair = JSON.parse(process.env.KEYPAIR)

    console.log(keypair);

    const contract = await getContract(keypair)

    const dummyPersonalData = {
        case_number: 'string1',
        document_id: 'string1',
        registry_country:'string1',
        identity_country:'string1',
        name:'string1',
        last_name:'string1',
        address:'string1',
        phone_number:'string1',
        email:'string1',
        contact:'string1'
    }

    const dummyHuman = {
        case_number: 'string1',
        personal_data: dummyPersonalData
    }

    const result = await contract.methods.add_human(
        "STRING1",
        dummyHuman,
        dummyPersonalData
    )
    
    console.log(result);

  } catch(err){
    console.log(err)
  }
};

userRegistration = async () => {
  const keypair = JSON.parse(process.env.ADMINN_KEYPAIR)
  const contract = await getContract(keypair)
  const result = await contract.methods.user_registration();
  
  console.log(result);
}

encrypt = async () => {
  const string = await encryptString('mi string');
  console.log(string)
}

decrypt = async () => {
  const string = await encryptString('mi string');
  const result = await decryptString(string);
  console.log(result)
}


// poner acá la función para probar
// addHuman()
// userRegistration();
decrypt();
