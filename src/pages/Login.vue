<template>
  <el-row>
    <Header :type="'register'"></Header>
    <el-row class="container">
      <Item :type="'login'"/>
    </el-row>
  </el-row>
</template>

<script>
  import Item from '../components/Item'
  import Header from '../components/Header'
  export default{
    data () {
      return {
      }
    },
    components: {
      Item,
      Header
    },
    methods: {}
  }
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
