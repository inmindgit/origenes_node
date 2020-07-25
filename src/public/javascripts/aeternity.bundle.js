(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aeternity.io';
const CONTRACT_ADDRESS = 'ct_p7pGeJqmAg4pf8A2Msz96VRwNvgQGbTDoNZ8PH1F1cH4izPxk';
const SNP = 'SNP';
const STR = 'STR';
const SNPID = 1;
const STRID = 2;

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

  const caseNumber = document.getElementById('caseNumber').value;
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

  const result = await matchStr(caseNumber, strObjects);

  document.getElementById("consultarCoincidenciasStr").classList.remove("running");
  document.getElementById("consultarCoincidenciasStr").classList.remove("disabled");
  document.getElementById("consultarCoincidenciasStr").disabled = false;


  if (result.success) {
    const tbody = document.getElementById('resultsTabe').getElementsByTagName('tbody')[0];
    result.payload.forEach(e => {
      const newRow = tbody.insertRow();

      const cell = newRow.insertCell(0);
      cell.innerHTML = e.case_number;
      return;
    })

    $('#modal').modal('toggle')

    $('#modal').on('hidden.bs.modal', function (e) {
      window.location.href = '/coincidencias/find';
    })
  } else {
    alert(`Error: ${result.message}`);
  }
}

async function coincidenciasSnip(e) {
  e.preventDefault();
  const caseNumber = document.getElementsByName('caseNumber')[0].value;
  let array = [];
  
  document.getElementsByName('marcadores[]').forEach((e) => {
    array.push(e.value);
  });
  document.getElementById("consultarCoincidenciasSnip").classList.add("running");
  document.getElementById("consultarCoincidenciasSnip").classList.add("disabled");
  document.getElementById("consultarCoincidenciasSnip").disabled = true;
  
  let result = await matchSnp(caseNumber, array);

  document.getElementById("consultarCoincidenciasSnip").classList.remove("running");
  document.getElementById("consultarCoincidenciasSnip").classList.remove("disabled");
  document.getElementById("consultarCoincidenciasSnip").disabled = false;

  if(result.success) {
    const tbody = document.getElementById('resultsTabe').getElementsByTagName('tbody')[0];
    result.payload.forEach(e => {
      const newRow = tbody.insertRow();

      const cell = newRow.insertCell(0);
      cell.innerHTML = e.case_number;
      return;
    })
    
    $('#modal').modal('toggle')

    $('#modal').on('hidden.bs.modal', function (e) {
      window.location.href = '/coincidencias/find';
    })
  } else {
    alert(`Error: ${result.message}`)
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
    alert(`Hash: ${result.hash}`)
    window.location.href = '/resultados/new'; // after clicking the alert, redirect to the empty form
  } else {
    alert(`Error: ${result.message}`)
  }
}

const loginForm = document.getElementById('loginForm') ;
if(loginForm !== null) {
  loginForm.addEventListener('submit', userLogin, false);
}

async function userLogin(e) {
  e.preventDefault();

  document.getElementById("submitLogin").classList.add("running");
  document.getElementById("submitLogin").classList.add("disabled");
  document.getElementById("submitLogin").disabled = true;

  console.log('Before userRegistrion()');
  const result = await userRegistration();
  console.log('After userRegistrion()');

  document.getElementById("submitLogin").classList.remove("running");
  document.getElementById("submitLogin").classList.remove("disabled");
  document.getElementById("submitLogin").disabled = false;

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

    const contractSource = "contract FreedomOrigins =\n  record file_Storage = {\n         file_storage_id:int,\n         name:int,\n         finget_print:hash}\n         \n  record human = {\n      personal_data:personal_Data,\n      case_number:string}\n      \n  record personal_Data = {\n      case_number:string,\n      document_id:string,\n      registry_country:string,\n      identity_country:string,\n      name:string,\n      last_name:string,\n      address:string,\n      phone_number:string,\n      email:string,\n      contact:string}\n\n  record platformUser = {\n      user_name:string,\n      email:string,\n      profile:profile,\n      unique_address:address}\n\n  record dNA_Analysis = {\n      doneDate:string,\n      case_number:string,\n      snp_result:list(string),\n      str_result:list(sTRIndicator)}\n\n  record dNA_Sample = {\n      system:system,\n      analysis:dNA_Analysis}\n      \n  record sTRIndicator = {\n      name:string,\n      value1:int,\n      value2:int}\n  \n  record system = {\n      id:int,\n      name:string} //Snip o STR\n\n  record profile = {\n      id:int,\n      name:string}\n\n  datatype event = //tbc\n      AddUser(string)\n    | AddHuman(string)\n    | AskForDNASample(string)\n    | AddDNASample(string)\n    | FoundDNAMatch(string)\n    | Login(address)\n  \n  record state = {\n         active_contract:bool,\n         profiles:map(int, profile),\n         systems : map(int,system),\n         files:map(int,file_Storage),\n         humans:map(string, human), //case_number\n         lhumans:list(human),\n         personal_datas:map(string,personal_Data), //document id\n         platform_users:map(address,platformUser),\n         dna_samples:map(string,dNA_Sample)} //case_number\n\n  entrypoint version() : int = 1\n\n  stateful entrypoint kill_contract(are_you_sure:string) = \n    require (Call.caller==Contract.creator,\"Not allowed\")\n    require (are_you_sure == \"yes\",\"Check your confirmation\")\n    put(state{active_contract=false})\n  \n  function isAuthorized() =\n    require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n    \n  function isAdmin() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Admin\",\"not allowed\")\n\n  function isOperator() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Operator\",\"not allowed\")\n\n  function isLab() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Lab\",\"not allowed\")\n\n  function isViewer() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Viewer\",\"not allowed\")\n  \n  stateful entrypoint init()={active_contract=true, profiles={[1] = {id=1,name=\"Admin\"},[2] = {id=2,name=\"Operator\"},[3] = {id=3,name=\"Lab\"},[4] = {id=4,name=\"Viewer\"}},\n    systems = {[1]={id=1,name=\"SNP\"},[2]={id=2,name=\"STR\"}},\n    files={},\n    humans={},\n    lhumans=[],\n    personal_datas={},\n    platform_users={},\n    dna_samples={}}\n\n\n  function get_human_by_id(document_id_to_find:string) : option(human) =\n    switch(Map.lookup(document_id_to_find,state.personal_datas))\n      None=>abort(\"doesn't exist\")\n      Some(personal_data)=>Map.lookup(personal_data.case_number,state.humans)\n\n  stateful entrypoint add_human(case_number:string, human_to_add:human, personal_data_to_add:personal_Data) = \n    isOperator()\n    require(!Map.member(case_number,state.humans),\"already exist\")\n    put(state{humans[case_number]=human_to_add})\n    put(state{personal_datas[personal_data_to_add.document_id]=personal_data_to_add})\n    put(state{lhumans=human_to_add::state.lhumans})\n    Chain.event(AddHuman(case_number))\n    true\n\n  stateful entrypoint add_dna_sample(sample_to_add:dNA_Sample,case_number:string) =\n    isLab()\n    require(Map.member(case_number,state.humans),\"doesn't exist\")\n    put(state{dna_samples[case_number]=sample_to_add})\n    Chain.event(AddDNASample(case_number))\n    true\n\n  entrypoint ask_for_sample_dna_test(document_id:string) : string = \n    isOperator()\n    let human = get_human_by_id(document_id)\n    switch (human)\n      None=>abort(\"doesn't exist\")\n      Some(human)=>\n        Chain.event(AskForDNASample(human.case_number)) \n        human.case_number\n                \n\n\n  stateful entrypoint add_user(email_to_add:string, name_to_add:string, profile_id:int, address_to_add:address) = \n    isAdmin()\n    require(Map.member(profile_id,state.profiles),\"doesn't exist\")\n    let profile=state.profiles[profile_id]\n    let platform_user_to_add =  {user_name=email_to_add, email= email_to_add, profile=profile, unique_address=address_to_add}\n    put(state{platform_users[address_to_add]=platform_user_to_add})\n    Chain.event(AddUser(email_to_add))     \n    true\n\n  function there_is_match_str(str1:list(sTRIndicator),str2:list(sTRIndicator),fail_count:int): bool =\n      if (fail_count==3)\n        abort(\"there is no match\")\n      switch(str1)\n        [] => fail_count<3\n        x::tail=>\n          switch(str2)\n            [] => fail_count<3\n            y::ytail => \n              if(!(x.value2==y.value1||x.value1==y.value2||x.value1==y.value1||x.value2==y.value2))\n                there_is_match_str(tail,ytail,fail_count+1)\n              else\n                there_is_match_str(tail,ytail,fail_count)\n\n  function there_is_match_snp(snp1:list(string),snp2:list(string),fail_count:int): bool =\n    if (fail_count==4)\n      abort(\"there is no match\")\n    switch(snp1)\n      [] => fail_count<4\n      x::tail=>\n        switch(snp2)\n          [] => fail_count<4\n          y::ytail => \n            if(x!=y&&(x!=\"10\"&&y==\"01\"||y==\"10\"&&x!=\"01\"))\n              there_is_match_snp(tail,ytail,fail_count+1)\n            else\n              there_is_match_snp(tail,ytail,fail_count)\n              \n  function get_snp_dna_by_case_number(case_number:string):list(string) =\n    switch(Map.member(case_number,state.dna_samples))\n      false => []\n      true => state.dna_samples[case_number].analysis.snp_result\n  \n  function get_str_dna_by_case_number(case_number:string):list(sTRIndicator) =\n    switch(Map.member(case_number,state.dna_samples))\n      false => []\n      true => state.dna_samples[case_number].analysis.str_result\n    \n\n  function try_to_find_snp(snp:list(string), humans_universe:list(human)) : list(human) = \n    switch(humans_universe)\n      x::tail => \n        if(there_is_match_snp(snp,get_snp_dna_by_case_number(x.case_number),0))\n          x::try_to_find_snp(snp,tail)\n        else\n          try_to_find_snp(snp,tail)\n      []=>[]\n\n  function try_to_find_str(str:list(sTRIndicator), humans_universe:list(human)) : list(human) = \n    switch(humans_universe)\n      x::tail => \n        if(there_is_match_str(str,get_str_dna_by_case_number(x.case_number),0))\n          x::try_to_find_str(str,tail)\n        else\n          try_to_find_str(str,tail)\n      []=>[]\n    \n  entrypoint look_for_match(sample_to_find_match:dNA_Sample):list(human) = \n    isOperator()\n    isViewer()\n    switch(sample_to_find_match.system.name)\n      \"SNP\" => try_to_find_snp(sample_to_find_match.analysis.snp_result,state.lhumans)\n      \"STR\" => try_to_find_str(sample_to_find_match.analysis.str_result,state.lhumans)\n  \n  entrypoint user_registration(): platformUser =\n    isAuthorized()\n    Chain.event(Login(Call.caller))\n    state.platform_users[Call.caller]\n\n  entrypoint get_humansl():list(human) = \n    state.lhumans\n  \n  entrypoint get_humansm():map(string,human) =\n    state.humans\n  entrypoint get_dna_samples():map(string,dNA_Sample) =\n    state.dna_samples\n\n  entrypoint get_users():map(address,platformUser) = \n    state.platform_users";
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
    const result = await contract.methods.look_for_match(dnaSample);

    console.log(result);
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

  const caseNumberEncrypted = caseNumber
  const nameEncrypted = name
  const lastNameEncrypted = lastName
  const documentIDEncrypted = documentID
  const registryCountryEncrypted = registryCountry
  const identityCountryEncrypted = identityCountry
  
  const personalData = new PersonalData(caseNumberEncrypted, nameEncrypted, lastNameEncrypted, documentIDEncrypted, registryCountryEncrypted, identityCountryEncrypted)

  document.getElementById("crear-muestra-submit").classList.add("running");
  document.getElementById("crear-muestra-submit").classList.add("disabled");
  document.getElementById("crear-muestra-submit").disabled = true;

  const result = await addPerson(caseNumberEncrypted, personalData);
  console.log(result);

  document.getElementById("crear-muestra-submit").classList.remove("running");
  document.getElementById("crear-muestra-submit").classList.remove("disabled");
  document.getElementById("crear-muestra-submit").disabled = false;

  if(result.success) {
    alert(`Hash: ${result.hash}`);
    window.location.href =  '/muestras/new'; // after clicking the alert, redirect to the empty form
  } else {
    alert(`Error: ${result.message}`);
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
    document.getElementById('search-result').innerHTML = result.hash;
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
    alert(`Hash: ${result.hash}`);
    window.location.href = '/resultados/new'; // after clicking the alert, redirect to the empty form
  } else {
    alert(`Error: ${result.message}`);
  }
}
},{}]},{},[1]);
