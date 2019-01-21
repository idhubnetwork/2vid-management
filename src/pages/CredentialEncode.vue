<template>
  <div>
    <div class="title is-4 has-text-centered">
      <h1>Credential Viewer: Encode</h1>
    </div>
    <div class="field">
      <label class="label">Credential Issuer: 证书签发者（必须）</label>
      <input class="input" type="text" placeholder="did:idhub:0x1234567890exampleEthereumAddress" v-model="credJWTPayload.iss"></input>
    </div>
    <div class="field">
      <label class="label">Credential Audience: 证书接收方（必须）</label>
      <input class="input" placeholder="did:idhub:0x1234567890exampleEthereumAddress" v-model="credJWTPayload.aud"></input>
    </div>
    <div class="field">
      <label class="label">Credential Subject: 证书主题（必须）</label>
      <input class="input" placeholder="credential subject defined by did application" v-model="credJWTPayload.sub"></input>
    </div>
    <div class="field">
      <label class="label">Credential Expire Time: 证书有效期（默认：6个月）</label>
      <date-picker v-model="expireDate" :not-before="new Date()" :clearable=false type="datetime" lang="en" format="YYYY-MM-DD hh:mm:ss" @confirm="updateExpireTime()" confirm></date-picker>
    </div>
    <!-- <div class="field">
      <label class="label">Credential Modify Permission:</label>
      <textarea class="textarea" v-model="credJWTSigningInput"></textarea>
    </div> -->
    <div class="field">
      <label class="label">Signed Credential: 带签名的证书</label>
      <textarea class="textarea" v-model="credJWT" placeholder="Signed Credential" readonly></textarea>
      Take signed credential to:
      <!-- <button @click="setData()" to="/operations/create" exact>Create</button> -->
      <router-link @click.native="setData()" to="/operations/create" exact>Create</router-link>
      /
      <router-link @click.native="setData()" to="/operations/read" exact>Read</router-link>
      /
      <router-link @click.native="setData()" to="/operations/update" exact>Update</router-link>
      /
      <router-link @click.native="setData()" to="/operations/delete" exact>Delete</router-link>
      /
      <router-link @click.native="setData()" to="/credential/decode" exact>Decode</router-link>
    </div>
    <button class="button is-link is-rounded" @click="signCredential()">
      Sign
    </button>
  </div>
</template>
<script>
import JwtUtility from '@/util/JwtUtility.js';
import MathUtility from '@/util/MathUtility.js';
import DatePicker from 'vue2-datepicker';

export default {
  props: [

  ],
  data() {
    return {
      expireDate: {},
      credJWTSigningInput: '',
      credJWTHeader: {
        alg: 'ES256k',
        typ: 'JWT',
      },
      credJWTPayload: {
        iss: '',
        sub: '',
        aud: '',
        exp: 0,
        // jti: 123,
        net: 'eth_ropsten',
        ipfs: '', // jwt合规说明书链接（可选，默认存储在IPFS上）
        context: '', // jwt上下文（可选，由上层应用或业务逻辑决定）
        status: 11, // 0b1011
      },
      credJWTSignature: '',
      credJWT: '',
    };
  },
  computed: {

  },
  components: {
    DatePicker,
  },
  mounted() {
    this.resetExpireTime();
  },
  methods: {
    updateExpireTime() {
      console.log(Math.round(this.expireDate.getTime() / 1000));
      this.credJWTPayload.exp = Math.round(this.expireDate.getTime() / 1000);
    },
    resetExpireTime() {
      const date = new Date();
      // 默认有效期 month 个月
      const month = 6;
      this.expireDate = new Date(date.setMonth(date.getMonth() + month));
      this.credJWTPayload.exp = Math.round(this.expireDate.getTime() / 1000);
    },
    test() {
      console.log('test button is clicked');
    },
    transfer() {
      console.log(this.expireDate);
      this.credJWTSigningInput = `${JwtUtility.base64url.encode(JSON.stringify(this.credJWTHeader))}.${JwtUtility.base64url.encode(JSON.stringify(this.credJWTPayload))}`;
    },
    signPromise() {
      return new Promise((resolve, reject) => {
        window.web3.personal.sign(window.web3.fromUtf8(this.credJWTSigningInput), window.web3.eth.coinbase, (err, res) => {
          if (err) {
            this.signature = err;
            reject(err);
          } else {
            if (res) {
              this.credJWTSignature = JwtUtility.base64url(Buffer.from(MathUtility.BigNumber(res).toString(16), 'hex'));
              // console.log(Buffer.from(MathUtility.BigNumber(res).toString(16), 'hex'))
              // // console.log('0x' + JwtUtility.base64url.toBuffer(this.credJWTSignature).toString('hex'))
              // console.log(res)
              this.credJWT = `${this.credJWTSigningInput}.${this.credJWTSignature}`;
              resolve('Sign is done!');
            }
            reject(Error('Sign response error.'));
          }
        });
      });
    },
    signCredential() {
      const transferPromise = new Promise((resolve, reject) => {
        this.transfer();
        resolve('Transfer is done!');
      });
      transferPromise
        .then(this.signPromise)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    },
    setData() {
      console.log('Data set: Done!');
      this.$store.dispatch('setExchangeData', this.credJWT);
    },
  },
};
</script>
