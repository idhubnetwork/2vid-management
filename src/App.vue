<template>
  <div id="app">
    <NavBar></NavBar>
    <section class="section">
      <div class="container is-fluid">
        <router-view/>
      </div>
    </section>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
    NavBar, FooterBar
  },
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from App.vue')
    this.$store.dispatch('registerWeb3')
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
//
// h1, h2 {
//   font-weight: normal;
// }
//
// ul {
//   list-style-type: none;
//   padding: 0;
// }
//
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
//
// a {
//   color: #42b983;
// }
</style>
