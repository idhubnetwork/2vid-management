<template>
  <div>
    <div class="field">
      <label class="label">Credential Issuer: 证书签发者（必须）</label>
      <input class="input" type="text" v-model="credJWTPayload.iss"></input>
    </div>
    <div class="field">
      <label class="label">Credential Audience: 证书接收方（必须）</label>
      <input class="input" v-model="credJWTPayload.aud"></input>
    </div>
    <div class="field">
      <label class="label">Credential Subject: 证书主题（必须）</label>
      <input class="input" v-model="credJWTPayload.sub"></input>
    </div>
    <div class="field">
      <label class="label">Raw Credential:</label>
      <textarea class="textarea" v-model="credJWTSigningInput"></textarea>
    </div>
    <div class="field">
      <label class="label">Signed Credential:</label>
      <textarea class="textarea" v-model="credJWT" placeholder="Signed Credential"></textarea>
    </div>
    <button class="button is-link is-rounded" @click="signCredential()">
      Sign
    </button>
  </div>
</template>
<script>
import JwtUtility from '@/util/JwtUtility.js'
import MathUtility from '@/util/MathUtility.js'

export default {
  props: [

  ],
  data () {
    return {
      credJWTSigningInput: '',
      credJWTHeader: {
        alg: 'ES256k',
        typ: 'JWT'
      },
      credJWTPayload: {
        iss: '',
        sub: '',
        aud: '',
        exp: 1569859200,
        // jti: 123,
        net: 'eth_ropsten',
        ipfs: 'jwt合规说明书链接（可选，默认存储在IPFS上）',
        context: 'jwt上下文（可选，由上层应用或业务逻辑决定）',
        status: 11
      },
      credJWTSignature: '',
      credJWT: '',
    }
  }, computed: {

  }, methods: {
    transfer: function() {
      this.credJWTSigningInput = JwtUtility.base64url.encode(JSON.stringify(this.credJWTHeader)) + '.' + JwtUtility.base64url.encode(JSON.stringify(this.credJWTPayload))
    },
    sign: function() {
      web3.personal.sign(web3.fromUtf8(this.credJWTSigningInput), web3.eth.coinbase, (err, res) => {
        if (err) this.signature = err
        if (res) {
          this.credJWTSignature = JwtUtility.base64url(Buffer.from(MathUtility.BigNumber(res).toString(16), 'hex'))
          this.credJWT = this.credJWTSigningInput + '.' + this.credJWTSignature
        }
      })
    },
    signCredential: function() {
      this.transfer()
      this.sign()
    }
  }
}
</script>
