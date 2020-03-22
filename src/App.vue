<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/dfo.png">
    <File msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import File from './components/File.vue'

export default {
  name: 'App',
  components: {
    File
      }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
