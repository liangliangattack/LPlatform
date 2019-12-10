<template>
  <el-row>
    <Header :type="'register'"></Header>
    <el-row class="container">
      <p>这里显示所有问题</p>
    </el-row>
  </el-row>
</template>

<script>
  import Header from '../components/Header'
  export default{
    data () {
      return {
      }
    },
    components: {
      Header
    },
    created () {
      // this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        this.$store.dispatch('getUser')
      },
      logOut () {
        this.$store.dispatch('logOut')
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
