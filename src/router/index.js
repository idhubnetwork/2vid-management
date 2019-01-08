import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import CredentialOperations from '@/pages/CredentialOperations'
import CredentialCreate from '@/pages/CredentialCreate'
import CredentialRead from '@/pages/CredentialRead'
import CredentialUpdate from '@/pages/CredentialUpdate'
import CredentialDelete from '@/pages/CredentialDelete'
import Credential from '@/pages/Credential'
import CredentialEncode from '@/pages/CredentialEncode'
import CredentialDecode from '@/pages/CredentialDecode'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/operations', component: CredentialOperations,
      children: [
        { path: 'create', component: CredentialCreate },
        { path: 'read', component: CredentialRead },
        { path: 'update', component: CredentialUpdate },
        { path: 'delete', component: CredentialDelete },
      ]
    },
    { path: '/credential', component: Credential,
      children: [
        { path: 'encode', component: CredentialEncode },
        { path: 'decode', component: CredentialDecode }
      ]
    },
    // { path: '*', component: NotFoundComponent }
  ]
})
