const fs = require("fs");
const CryptoJS = require("crypto-js");
const SECRET_KEY = 'secret-key'
const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aeternity.io';
const CONTRACT_ADDRESS = 'ct_2QogBP7UnhVaZzSRcRWkxcnWrJ5B515BuAPsaefcooUvRhxexB';
const SNP = 'SNP';
const STR = 'STR';
const SNPID = 1;
const STRID = 2;

/////////////////////////////////////////////////////////////////////////// 
// CONTRACT FUNCTION
///////////////////////////////////////////////////////////////////////////

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

async function getKeypair(){
  const keypairs = await JSON.parse(window.localStorage.getItem('keypair'));
  if(!keypairs) {
    throw 'No posee el par de claves para el acceso.';
  }

  return keypairs;
}

async function getContract() {
  try {
    const keypair = await getKeypair()

    const contractSource = fs.readFileSync(__dirname + "/contract/FreedomOrigins.aes", "utf-8");
    const client = await aeternityClient(keypair);

    const contract = await client.getContractInstance(contractSource, {
      contractAddress: CONTRACT_ADDRESS
    });

    return contract;
  } catch(e) {
    alertBox('Error', e)
  }
}

async function matchStr(strArray) {
  try {
    const strArrayObjects = strArray.map((e) => {
      return {
        name: e[0],
        value1: parseInt(e[1]),
        value2: parseInt(e[2])
      }
    });
    const dnaSample = {
      system: {
        id: STRID,
        name: STR
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: 'caseNumber',
        snp_result: [],
        str_result: strArrayObjects
      }
    };

    const contract = await getContract();
    const result = await contract.methods.look_for_match(dnaSample);
    
    return {
      success: true,
      payload: result.decodedResult
    }
  } catch (e) {
    console.log(e.decodedError);    
    return {
      success: false,
      message: e.decodedError
    }
  }
}

async function matchSnp(snpArray) {
  try {
    const dnaSample = {
      system: {
        id: SNPID,
        name: SNP
      },
      analysis: {
        doneDate: new Date().toISOString(),
        case_number: 'caseNumber',
        snp_result: snpArray,
        str_result: []
      }
    };
    
    const contract = await getContract();
    const result = await contract.methods.look_for_match(dnaSample);

    console.log(result)

    sendAudit('look_for_match');

    return {
      success: true,
      payload: result.decodedResult
    };
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: result.decodedError
    };
  }
}

async function userRegistration() {
  try {
    const contract = await getContract();
    const result = await contract.methods.user_registration();
    
    sendAudit('user_registration');
    
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
    
    sendAudit('ask_for_sample_dna_test');
    
    return {
      success: true,
      message: '',
      payload: result.decodedResult
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
        value1: parseInt(e[1]),
        value2: parseInt(e[2])
      }
    });

    const dnaSample = {
      system: {
        id: STRID,
        name: STR
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
    
    sendAudit('add_dna_sample STR');

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
    const date = new Date().toISOString();
    const dnaSample = {
      system: {
        id: SNPID,
        name: SNP
      },
      analysis: {
        doneDate: date,
        case_number: caseNumber,
        snp_result: snpArray,
        str_result: []
      }
    };

    const contract = await getContract()
    const result = await contract.methods.add_dna_sample(dnaSample, caseNumber);
    
    sendAudit('add_dna_sample SNP');

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

    sendAudit('add_human');

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

async function getTotalUsers() {
  try {
    const contract = await getContract();
    const result = await contract.methods.get_total_users();

    return {
      success: true,
      payload: result.decodedResult
    }
  } catch (e) {
    return {
      success: false,
      message: "?",
      hash: "0"
    }
  }
}

async function getTotalHumans() {
  try {
    const contract = await getContract();
    const result = await contract.methods.get_total_humans();

    return {
      success: true,
      payload: result.decodedResult
    }
  } catch (e) {
    console.log(e.decodedError);    
    return {
      success: false,
      message: e.decodedError,
      hash: "0"
    }
  }
}

async function getTotalSamples() {
  try {
    const contract = await getContract();
    const result = await contract.methods.get_total_registered_samples();

    return {
      success: true,
      payload: result.decodedResult
    }
  } catch (e) {
    console.log(e.decodedError);    
    return {
      success: false,
      message: e.decodedError,
      hash: "0"
    }
  }
}



/////////////////////////////////////////////////////////////////////////// 
// FORM ACTIONS
///////////////////////////////////////////////////////////////////////////


const refreshTotalSamples = document.getElementById('refresh-total-samples');
if (refreshTotalSamples) {
  refreshTotalSamples.addEventListener("click", async function(){
    this.children[0].classList.add('fa-spin')
    const result = await getTotalSamples();
    
    if (result.success) {
      this.remove()
      document.getElementById('total-sample-text').innerText = result.payload
    }else{
      this.children[0].classList.remove('fa-spin')
    }
  });
}

const refreshTotalHumans = document.getElementById('refresh-total-humans');
if (refreshTotalHumans) {
  refreshTotalHumans.addEventListener("click", async function(){
    this.children[0].classList.add('fa-spin')
    const result = await getTotalHumans();
    
    if (result.success) {
      this.remove()
      document.getElementById('total-humans-text').innerText = result.payload
    }else{
      this.children[0].classList.remove('fa-spin')
    }
  });
}

const refreshTotalUsers = document.getElementById('refresh-total-users');
if (refreshTotalUsers) {
  refreshTotalUsers.addEventListener("click", async function(){
    this.children[0].classList.add('fa-spin')
    const result = await getTotalUsers();
    
    if (result.success) {
      this.remove()
      document.getElementById('total-users-text').innerText = result.payload
    }else{
      this.children[0].classList.remove('fa-spin')
    }
  });
}

const snipFormCoincidencias = document.getElementById('snipFormCoincidencias');
if (snipFormCoincidencias) {
  snipFormCoincidencias.addEventListener('submit', coincidenciasSnip, false);
}

const strFormCoincidencias = document.getElementById('strFormCoincidencias');
if (strFormCoincidencias) {
  strFormCoincidencias.addEventListener('submit', coincidenciasStr, false);
}

async function coincidenciasStr(e) {
  e.preventDefault();
  const strObjects = [];

  for (let i = 1; i < 21; i++) {
    const marcador = document.getElementsByName(`marcador[${i}][]`)
    marcadorArr = []
    marcador.forEach((e) => marcadorArr.push(e.value))
    strObjects.push(marcadorArr);
  }
  document.getElementById("consultarCoincidenciasStr").classList.add("running");
  document.getElementById("consultarCoincidenciasStr").classList.add("disabled");
  document.getElementById("consultarCoincidenciasStr").disabled = true;

  const result = await matchStr(strObjects);

  document.getElementById("consultarCoincidenciasStr").classList.remove("running");
  document.getElementById("consultarCoincidenciasStr").classList.remove("disabled");
  document.getElementById("consultarCoincidenciasStr").disabled = false;


  if (result.success) {
    const tbody = document.getElementById('resultsTabe').getElementsByTagName('tbody')[0];

    if(result.payload === undefined || result.payload.length == 0){
      const newRow = tbody.insertRow();

      const cell = newRow.insertCell(0);
      cell.innerHTML = 'No hay coincidencias.';
    } else {
      result.payload.forEach(e => {
        const newRow = tbody.insertRow();

        const cell0 = newRow.insertCell(0);
        cell0.innerHTML = e.case_number;
        const cell1 = newRow.insertCell(1);
        cell1.innerHTML = e.personal_data.document_id;
        return;
      })
    }

    $('#modal').modal('toggle')

    $('#modal').on('hidden.bs.modal', function (e) {
      window.location.href = '/coincidencias/find';
    })
  } else {
    alertBox('Error', result.message)
  }
}

async function coincidenciasSnip(e) {
  e.preventDefault();
  let array = [];
  
  document.getElementsByName('marcadores[]').forEach((e) => {
    array.push(e.value);
  });
  document.getElementById("consultarCoincidenciasSnip").classList.add("running");
  document.getElementById("consultarCoincidenciasSnip").classList.add("disabled");
  document.getElementById("consultarCoincidenciasSnip").disabled = true;
  
  let result = await matchSnp(array);

  document.getElementById("consultarCoincidenciasSnip").classList.remove("running");
  document.getElementById("consultarCoincidenciasSnip").classList.remove("disabled");
  document.getElementById("consultarCoincidenciasSnip").disabled = false;

  if(result.success) {
    const tbody = document.getElementById('resultsTabe').getElementsByTagName('tbody')[0];

    if(result.payload === undefined || result.payload.length == 0){
      const newRow = tbody.insertRow();

      const cell = newRow.insertCell(0);
      cell.innerHTML = 'No hay coincidencias.';
    } else {
      result.payload.forEach(e => {
        const newRow = tbody.insertRow();

        const cell = newRow.insertCell(0);
        cell.innerHTML = e.case_number;
        const cell1 = newRow.insertCell(1);
        cell1.innerHTML = e.personal_data.document_id;
        return;
      })
    }
    
    $('#modal').modal('toggle')

    $('#modal').on('hidden.bs.modal', function (e) {
      window.location.href = '/coincidencias/find';
    })
  } else {
    alertBox('Error', result.message)
  }
}

const snipForm = document.getElementById('snipForm')
if (snipForm) {
  snipForm.addEventListener('submit', resultadosSnip, false);
}

async function resultadosSnip(e) {
  e.preventDefault();
  const caseNumber = document.getElementsByName('caseNumber')[0].value;
  let array = [];
  
  document.getElementsByName('marcadores[]').forEach((e) => {
    array.push(e.value);
  });
  document.getElementById("resultadosSnip").classList.add("running");
  document.getElementById("resultadosSnip").classList.add("disabled");
  document.getElementById("resultadosSnip").disabled = true;
  
  let result = await addSnp(caseNumber, array);
  
  document.getElementById("resultadosSnip").classList.remove("running");
  document.getElementById("resultadosSnip").classList.remove("disabled");
  document.getElementById("resultadosSnip").disabled = false;

  if(result.success) {
    alertWithRedirect('', result.hash, '/resultados/new');
  } else {
    alertBox('Error', result.message)
  }
}

const loginForm = document.getElementById('loginForm') ;
if(loginForm !== null) {
  loginForm.addEventListener('submit', userLogin, false);
}

async function userLogin(e) {
  e.preventDefault();

  const public_key = document.getElementById("username").value
  const private_key = document.getElementById("password").value
  
  window.localStorage.setItem(
    'keypair',
    `{
      "publicKey": "${public_key}",
      "secretKey": "${private_key}"
    }`
  )

  console.log(window.localStorage.getItem('keypair'));


  document.getElementById("submitLogin").classList.add("running");
  document.getElementById("submitLogin").classList.add("disabled");
  document.getElementById("submitLogin").disabled = true;

  const result = await userRegistration();

  document.getElementById("submitLogin").classList.remove("running");
  document.getElementById("submitLogin").classList.remove("disabled");
  document.getElementById("submitLogin").disabled = false;

  if(result.success) {
    document.getElementById('password').value = result.payload.name;
    this.submit();
  } else {
    alertBox('Error', result.message)
  }
}

class PersonalData {
  constructor(caseNumber, name, lastName, documentID, registryCountry, identityCountry){
    this.case_number = caseNumber,
    this.document_id = documentID,
    this.registry_country = registryCountry,
    this.identity_country = identityCountry,
    this.name = name,
    this.last_name = lastName,
    this.address = 'address',
    this.phone_number = 'phone_number',
    this.email = 'email',
    this.contact = 'contact'
  }
}

let crearMuestraForm = document.getElementById('crear-muestra-form');
if(crearMuestraForm != null) {
  crearMuestraForm.addEventListener('submit', crearMuestra, false);
}

async function crearMuestra(e) {
  e.preventDefault();
  console.log('crear-muestra-form');
  var caseNumber = document.getElementsByName('caseNumber')[0].value;
  var name = document.getElementsByName('name')[0].value;
  var lastName = document.getElementsByName('lastName')[0].value;
  var documentID = document.getElementsByName('documentID')[0].value;
  var identityCountry = document.getElementsByName('identityCountry')[0].value;
  var registryCountry = document.getElementsByName('registryCountry')[0].value;
  var laboratoryOfOrigin = document.getElementsByName('laboratoryOfOrigin')[0].value;

  const nameEncrypted = encrypt(name)
  const lastNameEncrypted = encrypt(lastName)
  const registryCountryEncrypted = encrypt(registryCountry)
  const identityCountryEncrypted = encrypt(identityCountry)
  
  const personalData = new PersonalData(caseNumber, nameEncrypted, lastNameEncrypted, documentID, registryCountryEncrypted, identityCountryEncrypted)

  document.getElementById("crear-muestra-submit").classList.add("running");
  document.getElementById("crear-muestra-submit").classList.add("disabled");
  document.getElementById("crear-muestra-submit").disabled = true;

  const result = await addPerson(caseNumber, personalData);

  document.getElementById("crear-muestra-submit").classList.remove("running");
  document.getElementById("crear-muestra-submit").classList.remove("disabled");
  document.getElementById("crear-muestra-submit").disabled = false;

  if(result.success) {
    alertWithRedirect('', result.hash, '/muestras/new');
  } else {
    alertBox('Error', result.message)
  }
}

let searchMuestraForm = document.getElementById('search-muestra-form');
if(searchMuestraForm != null) {
  searchMuestraForm.addEventListener('submit', searchMuestra, false);
}

async function searchMuestra(e) {
  e.preventDefault();
  console.log('search-muestra-form');
  var documentId = document.getElementsByName('documentId')[0].value;

  

  document.getElementById("search-muestra-submit").classList.add("running");
  document.getElementById("search-muestra-submit").classList.add("disabled");
  document.getElementById("search-muestra-submit").disabled = true;
  document.getElementById("lupa-icon").classList.remove("fa-search")

  const result = await askNumberCase(documentId);

  console.log(result);
  if(result.success) {
    const caseNumber = result.payload.case_number;
    const fullName = `${decrypt(result.payload.personal_data.name)} ${decrypt(result.payload.personal_data.last_name)}`;
    const registryCountry = decrypt(result.payload.personal_data.registry_country)
    const identityCountry = decrypt(result.payload.personal_data.identity_country)
    document.getElementById('search-result').innerHTML = `Núm. de actuación: <b>${ caseNumber }</b>. <br />Nombre Completo: <b>${ fullName }</b>.<br/>País de Registro: <b>${ registryCountry }</b>.<br/>País de Nacimiento: <b>${ identityCountry }</b>.`;
  } else {
    document.getElementById('search-result').innerHTML = "Error: " + result.message;
  }

  document.getElementById("search-muestra-submit").classList.remove("running");
  document.getElementById("search-muestra-submit").classList.remove("disabled");
  document.getElementById("search-muestra-submit").disabled = false;
  document.getElementById("lupa-icon").classList.add("fa-search");
}

let addSTRResultForm = document.getElementById('add-srt-result-form');
if(addSTRResultForm != null) {
  addSTRResultForm.addEventListener('submit', addSrtResult, false);
}

async function addSrtResult(e){
  e.preventDefault();
  
  const caseNumber = document.getElementById('caseNumber').value;
  const strObjects = [];
    
  for (i = 1; i < 21; i++) {
    const marcador = document.getElementsByName(`marcador[${i}][]`)
    marcadorArr = [] 
    marcador.forEach( (e) => marcadorArr.push(e.value) )
    strObjects.push(marcadorArr);
  }

  document.getElementById("resultadosStr").classList.add("running");
  document.getElementById("resultadosStr").classList.add("disabled");
  document.getElementById("resultadosStr").disabled = true;
  
  const result = await addStr(caseNumber, strObjects);
  
  document.getElementById("resultadosStr").classList.remove("running");
  document.getElementById("resultadosStr").classList.remove("disabled");
  document.getElementById("resultadosStr").disabled = false;

  if(result.success) {
    alertWithRedirect('', result.hash, '/resultados/new');
  } else {
    alertBox('Error', result.message);
  }
}

/////////////////////////////////////////////////////////////////////////// 
// COMMON FUNCTIONS
///////////////////////////////////////////////////////////////////////////

function alertBox(title, body, callback){
  body = body == undefined ? 'Hubo un error. Por favor intente nuevamente más tarde.' : body;
  bootbox.alert({
    size: 'large',
    title: title,
    message: body,
    callback: callback
  })
}

function alertWithRedirect(title, hash, url){
  alertBox(
    title,
    `Verifique la transacción con el hash: <a href='https://explorer.testnet.aeternity.io/account/transactions/${hash}'>${hash}`,
    function(){
      window.location.href = url; // after clicking the alert, redirect to the empty form
    }
  )
}


// required: true with custom message
$('form input[type=text],textarea').on('change invalid', function() {
  var textfield = $(this).get(0);
  textfield.setCustomValidity('');
  
  if (!textfield.validity.valid) {
    textfield.setCustomValidity('Debe completar este campo');
  }
});

// crypto services
function encrypt(string) {
  try {
    const encryptedString = CryptoJS.AES.encrypt(string, SECRET_KEY).toString();

    return encryptedString;
  } catch (e) {
    console.log(e)
  }
}

function decrypt(string) {
  try {
    const bytes = CryptoJS.AES.decrypt(string, SECRET_KEY);
    const originalString = bytes.toString(CryptoJS.enc.Utf8);

    return originalString;
  } catch (e) {
    console.log(e)
  }
}

async function sendAudit(functionName) {
  const dateTime = new Date().toISOString();
  const keypair = await getKeypair()

  fetch('/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ 
      dateTime: dateTime,
      callerAddress: keypair.publicKey,
      functionName: functionName
    })
  });
}


document.getElementsByName('marcadores[]').forEach( (e) => {
  e.addEventListener("focusout", function(){
    const x = this.value;
    if (x == "00" || x == "01" || x == "10" || x == "11") {
      return
    }else if (x == ""){
      return
    }else{
      alertBox('Valor inválido', 'Los valores válidos son: 00 - 01 - 10 - 11')
    }
  });
});
