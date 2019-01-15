# 2vid-management

A management frontend for IDHub 2vid project.
[2vid](https://github.com/idhubnetwork/2vid) is a storage and management server for Verifiable Credentails.  
There are two parts of 2vid-management up to now.
Fisrt, there are credential tools for encoding and decoding digital certificates, which help to generate and analyse the credential as defined in [idhub requirements](https://github.com/idhubnetwork/identity-resources-and-research/blob/master/DIDs/DID%E9%9C%80%E6%B1%82%E6%95%B4%E7%90%86.md#did-verifiable-credentials).  
Second, we need store our credentials, so we build 2vid (a storage and management server for Verifiable Credentails). Here we provide a user interface for credentials CRUD operations .

## Getting Started

### Requirements
- [IDHub 2vid](https://github.com/idhubnetwork/2vid)
- [Vue](https://vuejs.org/)
- [Metamask](https://metamask.io/)
- [axios](https://github.com/axios/axios)

### Installation
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
