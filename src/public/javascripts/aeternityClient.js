const NODE_URL = 'https://testnet.aeternity.io';
const COMPILER_URL = 'https://compiler.aeternity.io';

$(document).ready(function() {
  console.log(localforage);
});
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
