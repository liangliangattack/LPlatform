<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header"

export default {
  name: 'App',
  components:{
    "app-header":Header,
  },
  data(){
    return {

    }
  }

}




</script>

<style>
  html{
    font-size: 60px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  body{
    margin: 0;
    padding: 0;
  }
  #app{
    margin: 0;
    padding: 0;
  }

  /*rem适应*/
  h2{
    font-size: .8rem;
  }
  p {
    font-size: .2rem;
  }
</style>
