let NODE_URL = 'https://testnet.aeternity.io';
let COMPILER_URL = 'https://compiler.aeternity.io';
let KEYPAIR = JSON.parse('{"publicKey":"ak_xew1bEqH4f59jNdP9jwRmBfBWDa3uoWqMdcsoZ1F2ZkrtXTcB","secretKey":"54cbdf775706568d58705c574b358831e68be41eeb35304810e7b7b4033971897e5e82de52e7e296cba9cc4167bf4be210a6e5133e32ecb9cb12d45b50b44093"}')

$(document).ready(function() {
  console.log(localforage);

  Ae.Node({ url: NODE_URL }).then(node => {
    Ae.Universal({
      nodes: [{ name: 'test-net', instance: node }],
      accounts: [Ae.MemoryAccount({ keypair: KEYPAIR })]
    }).then(aeInstance => {
      aeInstance.height().then(height => {
        console.log("Current Block Height:" + height)
      })
    })
  })
});


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
