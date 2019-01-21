import Web3 from 'web3';
import { address, ABI } from './constants/registryContract';

const getContract = new Promise((resolve, reject) => {
  try {
    const web3 = new Web3(window.web3.currentProvider);
    const registryContract = web3.eth.contract(ABI);
    const registryContractInstance = registryContract.at(address);
    resolve(registryContractInstance);
  } catch (err) {
    console.error(err);
    reject(new Error(err));
  }
});

export default getContract;
