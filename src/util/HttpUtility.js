import axios from 'axios';

const myAxios = axios.create({
  // baseURL: 'http://localhost:8090',
  baseURL: 'http://aws-demo.idhub.network:1224',
  // baseURL: 'https://api.etherscan.io',
  // baseURL: location.protocol + '//' + location.hostname + ':1312/',
  // withCredentials: true,
});

const HttpUtility = {
  axios, myAxios,
};
// myAxios.defaults.headers.post['Content-Type'] = 'application/json';
// myAxios.defaults.timeout = 2500;

export default { axios, myAxios };
