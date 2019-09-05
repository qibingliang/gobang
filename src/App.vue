<template>
  <div id="app">
    <Checkerboard/>
  </div>
</template>

<script>
import Checkerboard from './components/Checkerboard.vue'

export default {
  name: 'app',
  components: {
    Checkerboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
