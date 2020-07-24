(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (__dirname){

const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aeternity.io';
// let KEYPAIR = JSON.parse('{"publicKey":"ak_xew1bEqH4f59jNdP9jwRmBfBWDa3uoWqMdcsoZ1F2ZkrtXTcB","secretKey":"54cbdf775706568d58705c574b358831e68be41eeb35304810e7b7b4033971897e5e82de52e7e296cba9cc4167bf4be210a6e5133e32ecb9cb12d45b50b44093"}')
const CONTRACT_ADDRESS = 'ct_p7pGeJqmAg4pf8A2Msz96VRwNvgQGbTDoNZ8PH1F1cH4izPxk';

async function test() {
  if(!window.localStorage.getItem('keypair')){
    return alert('No posee claves almacenadas');
  }

  const KEYPAIR = JSON.parse(window.localStorage.getItem('keypair'))

  try {
    const node = await Ae.Node({
      url: NODE_URL
    });
    const aeInstance = await Ae.Universal({
      compilerUrl: COMPILER_URL,
      nodes: [{
        name: 'test-net',
        instance: node
      }],
      accounts: [Ae.MemoryAccount({
        keypair: KEYPAIR
      })]
    });
    const height = await aeInstance.height();
    
    console.log(__dirname)
    const contractSource = "contract FreedomOrigins =\n  record file_Storage = {\n         file_storage_id:int,\n         name:int,\n         finget_print:hash}\n         \n  record human = {\n      personal_data:personal_Data,\n      case_number:string}\n      \n  record personal_Data = {\n      case_number:string,\n      document_id:string,\n      registry_country:string,\n      identity_country:string,\n      name:string,\n      last_name:string,\n      address:string,\n      phone_number:string,\n      email:string,\n      contact:string}\n\n  record platformUser = {\n      user_name:string,\n      email:string,\n      profile:profile,\n      unique_address:address}\n\n  record dNA_Analysis = {\n      doneDate:string,\n      case_number:string,\n      snp_result:list(string),\n      str_result:list(sTRIndicator)}\n\n  record dNA_Sample = {\n      system:system,\n      analysis:dNA_Analysis}\n      \n  record sTRIndicator = {\n      name:string,\n      value1:int,\n      value2:int}\n  \n  record system = {\n      id:int,\n      name:string} //Snip o STR\n\n  record profile = {\n      id:int,\n      name:string}\n\n  datatype event = //tbc\n      AddUser(string)\n    | AddHuman(string)\n    | AskForDNASample(string)\n    | AddDNASample(string)\n    | FoundDNAMatch(string)\n    | Login(address)\n  \n  record state = {\n         active_contract:bool,\n         profiles:map(int, profile),\n         systems : map(int,system),\n         files:map(int,file_Storage),\n         humans:map(string, human), //case_number\n         lhumans:list(human),\n         personal_datas:map(string,personal_Data), //document id\n         platform_users:map(address,platformUser),\n         dna_samples:map(string,dNA_Sample)} //case_number\n\n  entrypoint version() : int = 1\n\n  stateful entrypoint kill_contract(are_you_sure:string) = \n    require (Call.caller==Contract.creator,\"Not allowed\")\n    require (are_you_sure == \"yes\",\"Check your confirmation\")\n    put(state{active_contract=false})\n  \n  function isAuthorized() =\n    require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n    \n  function isAdmin() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Admin\",\"not allowed\")\n\n  function isOperator() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Operator\",\"not allowed\")\n\n  function isLab() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Lab\",\"not allowed\")\n\n  function isViewer() =\n    if(Call.caller!=Contract.creator)\n      require(Map.member(Call.caller,state.platform_users),\"not allowed\")\n      require(state.platform_users[Call.caller].profile.name==\"Viewer\",\"not allowed\")\n  \n  stateful entrypoint init()={active_contract=true, profiles={[1] = {id=1,name=\"Admin\"},[2] = {id=2,name=\"Operator\"},[3] = {id=3,name=\"Lab\"},[4] = {id=4,name=\"Viewer\"}},\n    systems = {[1]={id=1,name=\"SNP\"},[2]={id=2,name=\"STR\"}},\n    files={},\n    humans={},\n    lhumans=[],\n    personal_datas={},\n    platform_users={},\n    dna_samples={}}\n\n\n  function get_human_by_id(document_id_to_find:string) : option(human) =\n    switch(Map.lookup(document_id_to_find,state.personal_datas))\n      None=>abort(\"doesn't exist\")\n      Some(personal_data)=>Map.lookup(personal_data.case_number,state.humans)\n\n  stateful entrypoint add_human(case_number:string, human_to_add:human, personal_data_to_add:personal_Data) = \n    isOperator()\n    require(!Map.member(case_number,state.humans),\"already exist\")\n    put(state{humans[case_number]=human_to_add})\n    put(state{personal_datas[personal_data_to_add.document_id]=personal_data_to_add})\n    put(state{lhumans=human_to_add::state.lhumans})\n    Chain.event(AddHuman(case_number))\n    true\n\n  stateful entrypoint add_dna_sample(sample_to_add:dNA_Sample,case_number:string) =\n    isLab()\n    require(Map.member(case_number,state.humans),\"doesn't exist\")\n    put(state{dna_samples[case_number]=sample_to_add})\n    Chain.event(AddDNASample(case_number))\n    true\n\n  entrypoint ask_for_sample_dna_test(document_id:string) : string = \n    isOperator()\n    let human = get_human_by_id(document_id)\n    switch (human)\n      None=>abort(\"doesn't exist\")\n      Some(human)=>\n        Chain.event(AskForDNASample(human.case_number)) \n        human.case_number\n                \n\n\n  stateful entrypoint add_user(email_to_add:string, name_to_add:string, profile_id:int, address_to_add:address) = \n    isAdmin()\n    require(Map.member(profile_id,state.profiles),\"doesn't exist\")\n    let profile=state.profiles[profile_id]\n    let platform_user_to_add =  {user_name=email_to_add, email= email_to_add, profile=profile, unique_address=address_to_add}\n    put(state{platform_users[address_to_add]=platform_user_to_add})\n    Chain.event(AddUser(email_to_add))     \n    true\n\n  function there_is_match_str(str1:list(sTRIndicator),str2:list(sTRIndicator),fail_count:int): bool =\n      if (fail_count==3)\n        abort(\"there is no match\")\n      switch(str1)\n        [] => fail_count<3\n        x::tail=>\n          switch(str2)\n            [] => fail_count<3\n            y::ytail => \n              if(!(x.value2==y.value1||x.value1==y.value2||x.value1==y.value1||x.value2==y.value2))\n                there_is_match_str(tail,ytail,fail_count+1)\n              else\n                there_is_match_str(tail,ytail,fail_count)\n\n  function there_is_match_snp(snp1:list(string),snp2:list(string),fail_count:int): bool =\n    if (fail_count==4)\n      abort(\"there is no match\")\n    switch(snp1)\n      [] => fail_count<4\n      x::tail=>\n        switch(snp2)\n          [] => fail_count<4\n          y::ytail => \n            if(x!=y&&(x!=\"10\"&&y==\"01\"||y==\"10\"&&x!=\"01\"))\n              there_is_match_snp(tail,ytail,fail_count+1)\n            else\n              there_is_match_snp(tail,ytail,fail_count)\n              \n  function get_snp_dna_by_case_number(case_number:string):list(string) =\n    switch(Map.member(case_number,state.dna_samples))\n      false => []\n      true => state.dna_samples[case_number].analysis.snp_result\n  \n  function get_str_dna_by_case_number(case_number:string):list(sTRIndicator) =\n    switch(Map.member(case_number,state.dna_samples))\n      false => []\n      true => state.dna_samples[case_number].analysis.str_result\n    \n\n  function try_to_find_snp(snp:list(string), humans_universe:list(human)) : list(human) = \n    switch(humans_universe)\n      x::tail => \n        if(there_is_match_snp(snp,get_snp_dna_by_case_number(x.case_number),0))\n          x::try_to_find_snp(snp,tail)\n        else\n          try_to_find_snp(snp,tail)\n      []=>[]\n\n  function try_to_find_str(str:list(sTRIndicator), humans_universe:list(human)) : list(human) = \n    switch(humans_universe)\n      x::tail => \n        if(there_is_match_str(str,get_str_dna_by_case_number(x.case_number),0))\n          x::try_to_find_str(str,tail)\n        else\n          try_to_find_str(str,tail)\n      []=>[]\n    \n  entrypoint look_for_match(sample_to_find_match:dNA_Sample):list(human) = \n    isOperator()\n    isViewer()\n    switch(sample_to_find_match.system.name)\n      \"SNP\" => try_to_find_snp(sample_to_find_match.analysis.snp_result,state.lhumans)\n      \"STR\" => try_to_find_str(sample_to_find_match.analysis.str_result,state.lhumans)\n  \n  entrypoint user_registration(): platformUser =\n    isAuthorized()\n    Chain.event(Login(Call.caller))\n    state.platform_users[Call.caller]\n\n  entrypoint get_humansl():list(human) = \n    state.lhumans\n  \n  entrypoint get_humansm():map(string,human) =\n    state.humans\n  entrypoint get_dna_samples():map(string,dNA_Sample) =\n    state.dna_samples\n\n  entrypoint get_users():map(address,platformUser) = \n    state.platform_users";
    const contract = await aeInstance.getContractInstance( contractSource, { contractAddress: CONTRACT_ADDRESS });

    console.log(contract.methods)

  } catch(e) {
    alert(e)
  }
};

test();


// const contract = await client.getContractInstance(
//   contractSource,
//   {
//     contractAddress: CONTRACT_ADDRESS
//   }
// );

// const {
//   Universal,
//   MemoryAccount,
//   Node
// } = require('@aeternity/aepp-sdk');

// module.exports.aeternityClient = async (keypair) => {
//   try {
//     const account = await MemoryAccount({
//       keypair: keypair
//     });
//     const nodeInstance = await Node({
//       url: NODE_URL
//     })

//     const client = await Universal({
//       compilerUrl: COMPILER_URL,
//       accounts: [account],
//       nodes: [{
//         name: 'test-net',
//         instance: nodeInstance
//       }]
//     })

//     return client;
//   } catch (err) {
//     console.log({
//       ErrorAEClient: err
//     })
//   }
// }

}).call(this,"/src/public/javascripts")
},{}]},{},[1]);
