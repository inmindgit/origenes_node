// Para testear los métodos del contrato.
// node /utils/testContractMethods.js

const { getContract } = require("./getContract");

//  definición de funciones
addHuman = async () => {
  
  try{
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


// poner acá la función para probar
addHuman()
