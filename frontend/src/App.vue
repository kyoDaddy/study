<template>
  <div id="app">
    <div id="header">
      <main-header/>
    </div>

    <router-view/>

    <div id="footer">
      <main-footer/>
    </div>

  </div>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'

export default {
  name: 'App',
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter
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
  margin-top: 60px;
}
</style>
