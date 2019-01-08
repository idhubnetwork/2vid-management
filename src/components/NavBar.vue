<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img :src="logo" alt="">
                <label class="has-text-white">&nbsp;&nbsp; IDHub 2vid Management</label>
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            </router-link>
            <div class="navbar-burger burger" :class="{ 'is-active': isActive }" @click="isActiveToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarBasic" class="navbar-menu" :class="{ 'is-active': isActive }">
          <div class="navbar-start is-hoverable">
            <div class="navbar-item is-hoverable">
              <a class="navbar-link">
                Operations
              </a>
              <div class="navbar-dropdown is-boxed">
                <router-link class="navbar-item" to="/operations/create" exact>Create</router-link>
                <router-link class="navbar-item" to="/operations/read" exact>Read</router-link>
                <router-link class="navbar-item" to="/operations/update" exact>Update</router-link>
                <router-link class="navbar-item" to="/operations/delete" exact>Delete</router-link>
              </div>
            </div>
            <div class="navbar-item is-hoverable">
              <a class="navbar-link">
                Credential
              </a>
              <div class="navbar-dropdown is-boxed">
                <router-link class="navbar-item" to="/credential/encode" exact>Credential Encode</router-link>
                <router-link class="navbar-item" to="/credential/decode" exact>Credential Decode</router-link>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item has-text-light">
              <div>Owner: </div>
              <div>
                {{ this.$store.state.web3.coinbase }}
              </div>
            </div>
          </div>
          <div class="navbar-end is-hoverable buttons has-addons">
              <!-- <button class="button is-rounded is-small" :disabled="isCurrent('zh_CN')" @click="set('zh_CN')">简</button>
              <button class="button is-rounded is-small" :disabled="isCurrent('zh_TW')" @click="set('zh_TW')">繁</button>
              <button class="button is-rounded is-small" :disabled="isCurrent('en_US')" @click="set('en_US')">EN</button> -->
          </div>
        </div>
    </nav>
</template>

<script>
import logo from '@/img/logo.png'

export default {
    data() {
        return {
            logo: logo,
            isActive: false,
        }
    },
    methods: {
      isActiveToggle() {
            this.isActive = !this.isActive
      }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #0c1854;
  padding: 0 30px 0 30px;
}

.navbar-item,
.navbar-link {
  color: rgba($color: #ffffff, $alpha: 0.5);
  margin: 5px 0;
  font-weight: bold;
}

a.navbar-link,
a.navbar-item {
  &:hover,
  &.is-active {
    color: #ffffff;
  }
}

.navbar-menu {
  .navbar-link,
  .navbar-item {
    &.is-active {
      border-bottom: 1px solid;
    }
  }
}

.button {
  background-color: transparent;
  color: #ffffff;
  font-weight: bold;
}

:disabled {
  background-color: #ffffff;
  color: #0c1854;
  opacity: 1;
}

.buttons {
  margin: 20px 20px 10px 20px;
}

.navbar-burger {
  color: #ffffff;
}
.navbar-link:hover, .navbar-link.is-active{
  background-color: transparent;
}
.navbar-menu {
  background-color: transparent;
}
a.navbar-link:hover, a.navbar-link.is-active {
  background-color: transparent;
}
.navbar-dropdown {
  background-color: #0c1854;
  // background-color: transparent;
}
.navbar-item:hover {
  background-color: transparent;
}
a.navbar-item:hover {
  background-color: #0c1854;
}
</style>
