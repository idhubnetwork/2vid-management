import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from '../util/getWeb3';
import pollWeb3 from '../util/pollWeb3';
import getContract from '../util/getContract';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance(state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload);
      const result = payload;
      const web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = parseInt(result.balance, 10);
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
      pollWeb3();
    },
    pollWeb3Instance(state, payload) {
      // console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = parseInt(payload.balance, 10);
      // // 加入 state.web3.web3Instance 的更新结果
      // state.web3.web3Instance = payload.web3
    },
    registerContractInstance(state, payload) {
      console.log('Casino contract instance: ', payload);
      state.contractInstance = () => payload;
    },
    setExchangeDataInstance(state, payload) {
      state.exchangeData.credJWT = payload;
    },
  },
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed');
      getWeb3.then((result) => {
        console.log('committing result to registerWeb3Instance mutation');
        commit('registerWeb3Instance', result);
      }).catch((e) => {
        console.log('error in action registerWeb3', e);
      });
    },
    pollWeb3({ commit }, payload) {
      // console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload);
    },
    getContractInstance({ commit }) {
      getContract.then((result) => {
        commit('registerContractInstance', result);
      }).catch(e => console.log(e));
    },
    setExchangeData({ commit }, payload) {
      commit('setExchangeDataInstance', payload);
    },
  },
  getters: {
    getExchangeData: state => state.exchangeData,
  },
});

export default store;
