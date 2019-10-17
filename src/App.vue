<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header"

export default {
  name: 'App',
  components:{
    "app-header":Header,
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
  body{
    margin: 0;
    padding: 0;
  }
  #app{
    margin: 0;
    padding: 0;
  }
</style>
