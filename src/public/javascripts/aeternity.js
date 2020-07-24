const fs = require("fs");
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
    const contractSource = fs.readFileSync(__dirname + "/contract/FreedomOrigins.aes", "utf-8");
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
