<template>
  <div>
    <div>
      <h1 class="subtitle has-text-centered">2vid Data Opertations: Create</h1>
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
      <input class="input" type="text" v-model="requestJsonTokenMsg.did"></input>
    </div>
    <div class="field">
      <label class="label">Issuer: </label>
      <input class="input" v-model="requestJsonTokenMsg.jwt_iss"></input>
    </div>
    <div class="field">
      <label class="label">Audience: </label>
      <input class="input" type="text" v-model="requestJsonTokenMsg.jwt_aud"></input>
    </div>
    <div class="field">
      <label class="label">Subject: </label>
      <input class="input" v-model="requestJsonTokenMsg.jwt_sub"></input>
    </div>

    <div class="field">
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
    </div>
    <div class="field">
      <label class="label">turn back:</label>
      <textarea class="textarea" v-model="turnBack" placeholder="turnBack"></textarea>
    </div>
    <button class="button is-link is-rounded" @click="sendRequestToken()">
      Create
    </button>
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
      	did: 'did:idhub:0x1234567890exampleEthereumAddress',
      	action: 'CREATE',
      	destination: 'idhub',
      	expiration: 1569859200,
      	jwt_iss: 'did:idhub:0x1234567890exampleEthereumAddress',
      	jwt_sub: 'credential subject defined by did application',
      	jwt_aud: 'did:idhub:0x1234567890exampleEthereumAddress',
      	// jwt_jti: 123 //uuid
      },
      requestJsonTokenSig: '',
      turnBack: ''
    }
  },
  methods: {
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
          this.credJWTSignature = '0x' +  Buffer.from(JwtUtility.base64url.decode(this.credJWT.split('.')[2])).toString('hex')
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
      // JWT Example: eyJhbGciOiJFUzI1NmsiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJoZWxvIGRpZCIsInN1YiI6IiIsImF1ZCI6IiIsImV4cCI6Imp3dOeahOi_h-acn-aXtumXtO-8jOi_meS4qui_h-acn-aXtumXtOW_hemhu-imgeWkp-S6juetvuWPkeaXtumXtO-8iOW_hemhu--8iSIsImp0aSI6Imp3dOeahOWUr-S4gOi6q-S7veagh-ivhu-8jOS4u-imgeeUqOadpeS9nOS4uuS4gOasoeaAp3Rva2VuLOS7juiAjOWbnumBv-mHjeaUvuaUu-WHu--8iOWPr-mAie-8iSIsIm5ldCI6ImRpZOeahOe9kee7nOagh-ekuu-8iOW_hemhu--8jOm7mOiupGV0aF9yb3BzdGVu77yJIiwiaXBmcyI6Imp3dOWQiOinhOivtOaYjuS5pumTvuaOpe-8iOWPr-mAie-8jOm7mOiupOWtmOWCqOWcqElQRlPkuIrvvIkiLCJjb250ZXh0Ijoiand05LiK5LiL5paH77yI5Y-v6YCJ77yM55Sx5LiK5bGC5bqU55So5oiW5Lia5Yqh6YC76L6R5Yaz5a6a77yJIiwic3RhdHVzIjoxMX0.xddZQO3DOGxiR3wg7aW7ZNj4tpap6-aSc-B0v4QVKZk9tyJ0AsFQCMb4HspYvbiZQljU5rYdifo5912S8D5NChs

    },
    packJsonToken: function() {
      var p = new Promise((resolve, reject) => {
        console.log('mission 1 completed')
        this.requestJsonToken.msg = '0x' + Buffer.from(JSON.stringify(this.requestJsonTokenMsg)).toString('hex')
        resolve("Stuff worked!")
      })
      return p
    },
    signJsonToken: function() {
      var p = new Promise((resolve, reject) => {
        console.log('mission 2 completed')
        web3.personal.sign(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg)), web3.eth.coinbase, (err, res) => {
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
      return p
    },
    postRequest: function() {
      var p = new Promise((resolve, reject) => {
        console.log('mission 3 completed')
        console.log(HttpUtility.axios.defaults)
        console.log(HttpUtility.myAxios.defaults)
        HttpUtility.myAxios({
          method: 'POST',
          url: '/api/v1/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            token: this.requestToken,
            jwt: this.credJWT
          })
        })
        .then(res => {
          this.turnBack = res.data.toString()
          // console.log('here is the message' + this.message)
          resolve("Stuff worked!")
        }).catch(
          err => {
            console.log(err)
            this.turnBack = err.toString()
            reject("err")
          }
        )
      })
      return p
    },
    sendRequestToken: function() {
      return new Promise((resolve, reject) => {
        console.log('mission 1 completed')
        this.requestJsonToken.msg = '0x' + Buffer.from(JSON.stringify(this.requestJsonTokenMsg)).toString('hex')
        resolve("Stuff worked!")
      })
      .then(result => {
        return new Promise((resolve, reject) => {
          console.log('mission 2 completed')
          // console.log('req.msg is ' + this.requestJsonToken.msg)
          // console.log('formated message 1 is:' + web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg)))
          // console.log('formated message 2 is:' + web3.fromUtf8(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg))))
          web3.personal.sign(web3.fromUtf8(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg))), web3.eth.coinbase, (err, res) => {
          // web3.personal.sign(web3.fromUtf8(JSON.stringify(this.requestJsonTokenMsg)), web3.eth.coinbase, (err, res) => {
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
            this.turnBack = res.data.toString()
            resolve("Stuff worked!")
            // console.log('here is the message' + this.message)
          }).catch(err => {
            console.log(err)
            this.turnBack = err.toString()
            reject(err)
          })
        })
      })
      .then(result => {
        console.log('correct')
        alert('OK!')
      })
      .catch(err => {
        console.log(err)
        alert('Some error happen')
      })
      // 1.打包 RequestToken: packJsonToken()
      // 2.签名 RequestToken: signJsonToken()
      // 3.发送 Operation Post 请求: postRequest()
    }
  }
}
</script>
