<template>
  <div>
    <div class="title is-4 has-text-centered">
      <h1>2vid Data Opertation: Create</h1>
    </div>
    <div class="field">
      <label class="label">Initial Signed Credential:</label>
      <textarea class="textarea" v-model="credJWT"></textarea>
      <button class="button is-link is-rounded" @click="parseCredJWT()">
        Parse Credential
      </button>
    </div>
    <div class="field">
      <label class="label">DID: </label>
      <input class="input" type="text" placeholder="did:idhub:0x1234567890exampleEthereumAddress" v-model="requestJsonTokenMsg.did"></input>
    </div>
    <div class="field">
      <label class="label">Issuer: </label>
      <input class="input" type="text" placeholder="did:idhub:0x1234567890exampleEthereumAddress" v-model="requestJsonTokenMsg.jwt_iss"></input>
    </div>
    <div class="field">
      <label class="label">Audience: </label>
      <input class="input" type="text" placeholder="did:idhub:0x1234567890exampleEthereumAddress" v-model="requestJsonTokenMsg.jwt_aud"></input>
    </div>
    <div class="field">
      <label class="label">Subject: </label>
      <input class="input" placeholder="credential subject defined by did application" v-model="requestJsonTokenMsg.jwt_sub"></input>
    </div>
    <!-- <div class="field">
      <label class="label">Signed Credential:</label>
      <textarea class="textarea" v-model="requestToken" placeholder="Signed Credential"></textarea>
    </div>
    <div class="field">
      <label class="label">requestJsonToken.msg</label>
      <textarea class="textarea" v-model="requestJsonToken.msg" placeholder="requestJsonToken.msg"></textarea>
    </div>
    <div class="field">
      <label class="label">requestJsonToken.sig</label>
      <textarea class="textarea" v-model="requestJsonToken.sig" placeholder="requestJsonToken.sig"></textarea>
    </div> -->
    <div class="field">
      <label class="label">Result:</label>
      <textarea class="textarea" v-model="oprationResponse" placeholder="oprationResponse" readonly></textarea>
    </div>
    <div class="field">
      <button class="button is-link is-rounded" @click="sendRequestToken()">
        Create
      </button>
    </div>
  </div>
</template>
<script>
import JwtUtility from '@/util/JwtUtility.js'
import HttpUtility from '@/util/HttpUtility.js'

export default {
  data () {
    return {
      credJWTSigningInput: '',
      credJWTHeader: {
        alg: 'ES256k',
        typ: 'JWT'
      },
      credJWTPayload: {
        // iss: '',
        // sub: '',
        // aud: '',
        // exp: 'jwt的过期时间，这个过期时间必须要大于签发时间（必须）',
        // jti: 'jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击（可选）',
        // net: 'did的网络标示（必须，默认eth_ropsten）',
        // ipfs: 'jwt合规说明书链接（可选，默认存储在IPFS上）',
        // context: 'jwt上下文（可选，由上层应用或业务逻辑决定）',
        // status: 11
      },
      credJWTSignature: '',
      credJWT: '',
      requestToken: '',
      requestJsonToken: {
        msg: '',
        sig: '',
      },
      requestJsonTokenMsg: {
      	did: '',
      	action: 'CREATE',
      	destination: 'idhub',
      	expiration: 0,
      	jwt_iss: '',
      	jwt_sub: '',
      	jwt_aud: '',
      	// jwt_jti: 123 //uuid
      },
      requestJsonTokenSig: '',
      oprationResponse: ''
    }
  },
  mounted: function() {
    if (this.$store.getters.getExchangeData.credJWT) {
      this.credJWT = this.$store.getters.getExchangeData.credJWT
      console.log("credJWT initialized.")
      this.$store.dispatch('setExchangeData', null)
    }
  },
  methods: {
    setExpireTime: function(value) {
      var second = (value) ? value : 3600
      var date = new Date()
      // 默认有效期 second 秒
      var expireDate = new Date(date.setSeconds(date.getSeconds() + second))
      this.requestJsonTokenMsg.expiration = Math.round(expireDate.getTime()/1000)
    },
    parseCredJWT: function() {
      // Step1: 判断 JWT 是否正确，长度、JSON
      if (this.credJWT.split('.').length != 3)
        //⚠️警告：jwt格式应为“aaa.bbb.ccc”
        alert('⚠️输入格式错误: Credential的格式应符合 JWT 标准:“aaa.bbb.ccc”')
      else {
        try {
          console.log(Buffer.from(JwtUtility.base64url.decode(this.credJWT.split('.')[2])).toString('hex'))
          this.credJWTHeader = JSON.parse(JwtUtility.base64url.decode(this.credJWT.split('.')[0]))
          this.credJWTPayload = JSON.parse(JwtUtility.base64url.decode(this.credJWT.split('.')[1]))
          this.credJWTSignature = '0x' + JwtUtility.base64url.toBuffer(this.credJWT.split('.')[2]).toString('hex')
        }
        catch(err){
          alert('⚠️警告: Credential的来源有问题，未按要求格式填写')
          throw err
        }
        console.log('Step1 passes!')

        // Step2: 拆分 JWT payload 得到 iss、aud、sub、jti，并赋值
        try {
          this.requestJsonTokenMsg.did = this.credJWTPayload.iss
          this.requestJsonTokenMsg.jwt_iss = this.credJWTPayload.iss
          this.requestJsonTokenMsg.jwt_aud = this.credJWTPayload.aud
          this.requestJsonTokenMsg.jwt_sub = this.credJWTPayload.sub
          // this.credJWTPayload.jti 是否存在，如果存在则赋值给 this.requestJsonTokenMsg.jwt_jti
        }
        catch(err) {
          alert('Step2 error!')
        }
      }
    },
    // packJsonToken: function() {
    //   var p = new Promise((resolve, reject) => {
    //     console.log('mission 1 completed')
    //     this.requestJsonToken.msg = '0x' + Buffer.from(JSON.stringify(this.requestJsonTokenMsg)).toString('hex')
    //     resolve("Stuff worked!")
    //   })
    //   return p
    // },
    // signJsonToken: function() {
    //   var p = new Promise((resolve, reject) => {
    //     console.log('mission 2 completed')
    //     web3.personal.sign(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg)), web3.eth.coinbase, (err, res) => {
    //       if (err) {
    //         reject("err.toString()")
    //       }
    //       if (res) {
    //         this.requestJsonToken.sig = res.toString()
    //         this.requestToken = 'DIDJsonToken ' + '0x' + Buffer.from(JSON.stringify(this.requestJsonToken)).toString('hex')
    //         resolve("Stuff worked!")
    //       }
    //     })
    //   })
    //   return p
    // },
    // postRequest: function() {
    //   var p = new Promise((resolve, reject) => {
    //     console.log('mission 3 completed')
    //     console.log(HttpUtility.axios.defaults)
    //     console.log(HttpUtility.myAxios.defaults)
    //     HttpUtility.myAxios({
    //       method: 'POST',
    //       url: '/api/v1/',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       data: JSON.stringify({
    //         token: this.requestToken,
    //         jwt: this.credJWT
    //       })
    //     })
    //     .then(res => {
    //       this.oprationResponse = res.data.toString()
    //       // console.log('here is the message' + this.message)
    //       resolve("Stuff worked!")
    //     }).catch(
    //       err => {
    //         console.log(err)
    //         this.oprationResponse = err.toString()
    //         reject("err")
    //       }
    //     )
    //   })
    //   return p
    // },
    sendRequestToken: function() {
      return new Promise((resolve, reject) => {
        // Init Parameters
        // oprationResponse set as ''
        this.oprationResponse = ''
        this.setExpireTime()
        console.log("exp is " + this.requestJsonTokenMsg.expiration)
        console.log('mission 1 completed')
        this.requestJsonToken.msg = '0x' + Buffer.from(JSON.stringify(this.requestJsonTokenMsg)).toString('hex')
        resolve("Stuff worked!")
      })
      .then(result => {
        return new Promise((resolve, reject) => {
          console.log('mission 2 completed')
          web3.personal.sign(web3.fromUtf8(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg))), web3.eth.coinbase, (err, res) => {
            if (err) {
              reject("err.toString()")
            }
            if (res) {
              this.requestJsonToken.sig = res.toString()
              this.requestToken = 'DIDJsonToken ' + '0x' + Buffer.from(JSON.stringify(this.requestJsonToken)).toString('hex')
              resolve("Stuff worked!")
            }
          })
        })
      })
      .then(result => {
        return new Promise((resolve, reject) => {
          console.log('mission 3 completed')
          HttpUtility.myAxios({
            method: 'POST',
            url: '/api/v1/',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              token: this.requestToken,
              jwt: this.credJWT
            }
          }).then(res => {
            this.oprationResponse = JSON.stringify(res.data)
            resolve("Stuff worked!")
            // console.log('here is the message' + this.message)
          }).catch(err => {
            console.log(err)
            this.oprationResponse = err.toString()
            reject(err)
          })
        })
      })
      .then(result => {
        console.log('correct')
        // alert('OK!')
      })
      .catch(err => {
        console.log(err)
        alert('Some error happen' + err)
      })
      // 1.打包 RequestToken: packJsonToken()
      // 2.签名 RequestToken: signJsonToken()
      // 3.发送 Operation Post 请求: postRequest()
    }
  }
}
</script>
