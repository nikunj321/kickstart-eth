import Web3 from 'web3';
import secret from './secret';

// if(window.ethereum) {
//     window.web3 = new Web3(ethereum);
//     try {
//         ethereum.enable();
//     } catch (error) {
//         console.log(error)
//     }
// } else if (window.web3) {
//     // Legacy dapp browsers…
//     window.web3 = new Web3(web3.currentProvider);
//   } else {
//     // Non-dapp browsers…
//     console.log(
//       'Non-Ethereum browser detected. You should consider trying Status!'
//     );
//   }
//   console.log(web3);
// //   export default web3;

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser
    web3 = new Web3(window.web3.currentProvider);
} else {
    const provider = new Web3.providers.HttpProvider(
        secret.api
    );

    web3 = new Web3(provider);
}

export default web3;