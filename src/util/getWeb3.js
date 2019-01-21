import Web3 from 'web3';

/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

const getWeb3 = new Promise((resolve, reject) => {
  // Check for injected web3 (mist/metamask)
  const web3js = window.web3;
  if (typeof web3js !== 'undefined') {
    const web3 = new Web3(web3js.currentProvider);
    resolve({
      injectedWeb3: web3.isConnected(),
      web3() {
        return web3;
      },
    });
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error('Unable to connect to Metamask'));
  }
})
  .then((res) => {
    const promise = new Promise((resolve, reject) => {
      // Retrieve network ID
      res.web3().version.getNetwork((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          reject(new Error('Unable to retrieve network ID'));
        } else {
          // Assign the networkId property to our result and resolve promise
          const result = Object.assign({}, res, { networkId });
          resolve(result);
        }
      });
    });
    return promise;
  }).then((res) => {
    const promise = new Promise((resolve, reject) => {
      // Retrieve coinbase
      res.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'));
        } else {
          console.log(`here coinbase is ${coinbase}`);
          const result = Object.assign({}, res, { coinbase });
          resolve(result);
        }
      });
    });
    return promise;
  }).then((res) => {
    const promise = new Promise((resolve, reject) => {
      // Retrieve balance for coinbase
      if (res.coinbase) {
        res.web3().eth.getBalance(res.coinbase, (err, balance) => {
          if (err) {
            reject(new Error(`Unable to retrieve balance for address: ${res.coinbase}`));
          } else {
            const result = Object.assign({}, res, { balance });
            resolve(result);
          }
        });
      } else {
        const result = Object.assign({}, res, { balance: 0 });
        console.log('warning: Coinbase is not exist!');
        resolve(result);
      }
    });
    return promise;
  });

export default getWeb3;
