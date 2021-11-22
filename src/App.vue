<template>
  <div id="app">
    <Home />
    <Map />
  </div>
</template>

<script>
import Home from './views/Home.vue'
import Map from './views/Map.vue'

export default {
  name: 'App',
  components: {
    Home,
    Map
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
