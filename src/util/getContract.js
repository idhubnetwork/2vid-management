import Web3 from 'web3'
import {address, ABI} from './constants/registryContract'

let getContract = new Promise(function (resolve, reject) {
  let web3 = new Web3(window.web3.currentProvider)
  let registryContract = web3.eth.contract(ABI)
  let registryContractInstance = registryContract.at(address)
  resolve(registryContractInstance)
})

export default getContract
