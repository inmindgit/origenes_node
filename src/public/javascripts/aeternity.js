const fs = require("fs");
const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aeternity.io';
const CONTRACT_ADDRESS = 'ct_p7pGeJqmAg4pf8A2Msz96VRwNvgQGbTDoNZ8PH1F1cH4izPxk';
const SNP = 'SNP';
const SNPID = 1;
const STRID = 2;

document.getElementById('loginForm').addEventListener('submit', userLogin, false);

async function userLogin(e) {
  e.preventDefault();
  console.log('Before userRegistrion()');
  const result = await userRegistration();
  console.log('After userRegistrion()');

  if(result.success) {
    document.getElementById('password').value = result.payload.name;
    this.submit();
  } else {
    alert('Error: ', result.error)
  }
}

async function aeternityClient(keypair) {
  try {
    const node = await Ae.Node({
      url: NODE_URL
    });
    const client = await Ae.Universal({
      compilerUrl: COMPILER_URL,
      nodes: [{
        name: 'test-net',
        instance: node
      }],
      accounts: [Ae.MemoryAccount({
        keypair: keypair
      })]
    });

    return client;
  } catch(e) {
    alert(e)
  }
};

async function getContract() {
  try {
    const keypair = await JSON.parse(window.localStorage.getItem('keypair'));
    if(!keypair) {
      throw Error('No posee keypair.');
    }

    const contractSource = fs.readFileSync(__dirname + "/contract/FreedomOrigins.aes", "utf-8");
    const client = await aeternityClient(keypair);

    const contract = await client.getContractInstance(contractSource, {
      contractAddress: CONTRACT_ADDRESS
    });

    return contract;
  } catch(e) {
    alert(e);
  }
}

async function matchStr(caseNumber, strArray) {
  try {
    const strArrayObjects = strArray.map((e) => {
      return {
        name: e[0],
        value1: e[1],
        value2: e[2]
      }
    });
    const dnaSample = {
      system: {
        id: STRID,
        name: SNP
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: caseNumber,
        snp_result: [],
        str_result: strArrayObjects
      }
    };

    const contract = await getContract();
    const result = await contract.methods.add_dna_sample(dnaSample, caseNumber);

    return {
      success: true,
      message: '',
      hash: result.hash
    }
  } catch (e) {
    console.log(e.decodedError);
    alert('Ocurrió un error: ', e.decodedError);
    
    return {
      success: false,
      message: e.decodedError,
      hash: e.error
    }
  }
}

async function matchSnp(caseNumber, snpArray) {
  try {
    const dnaSample = {
      system: {
        id: SNPID,
        name: SNP
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: caseNumber,
        snp_result: snpArray,
        str_result: []
      }
    };

    const contract = await getContract();
    const result = await contract.methods.look_for_match(dnaSample);

  } catch (e) {
    console.log(e)
    alert(e.decodedError)
  }
}

async function userRegistration() {
  try {
    const contract = await getContract();
    const result = await contract.methods.user_registration();

    return {
      success: true,
      payload: result.decodedResult.profile
    }
  } catch (error) {
    return {
      success: false,
      error: 'Error'
    }
  }
}

async function askNumberCase(documentID) {
  try {
    const contract = await getContract();
    const result = await contract.methods.ask_for_sample_dna_test(documentID);

    return {
      success: true,
      message: '',
      hash: result.decodedResult
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

async function addStr(caseNumber, strArray) {
  try {
    const strArrayObjects = strArray.map((e) => {
      return {
        name: e[0],
        value1: e[1],
        value2: e[2]
      }
    });

    const dnaSample = {
      system: {
        id: STRID,
        name: SNP
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: caseNumber,
        snp_result: [],
        str_result: strArrayObjects
      }
    }

    const contract = await getContract();
    const result = await contract.methods.add_dna_sample(dnaSample, caseNumber);

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

async function addSnp(caseNumber, snpArray) {
  try {
    const dnaSample = {
      system: {
        id: SNPID,
        name: SNP
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: caseNumber,
        snp_result: snpArray,
        str_result: []
      }
    };

    const contract = await getContract()
    const result = await contract.methods.add_dna_sample(dnaSample, caseNumber);

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

async function addPerson(caseNumber, personalData) {
  try {
    const human = {
      case_number: caseNumber,
      personal_data: personalData
    };

    const contract = await getContract()
    const result = await contract.methods.add_human(caseNumber, human, personalData)

    return {
      success: true,
      message: '',
      hash: result.hash
    }
  } catch (e) {
    return {
      success: false,
      message: e.decodedError,
      hash: e.error
    }
  }
}