<template>
  <div id="app">
    <Board/>
  </div>
</template>

<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
import Board from './components/Board'
import store from './store'

import 'vue-awesome/icons'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)
Vue.use(VModal)

export default {
  name: 'app',
  store,
  components: {
    Board,
    Icon
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  background-color: #8dd5ff;
}
</style>
