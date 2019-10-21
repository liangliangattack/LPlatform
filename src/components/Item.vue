<template>
  <el-row class="login-style">
    <h1 v-show = "type === 'register'">注册</h1>
    <h1 v-show = "type === 'login'">登录</h1>
    <el-input placeholder="用户名" v-model="userName"></el-input>
    <el-input type="password" placeholder="密码" v-model="password"></el-input>
    <el-input type="password" placeholder="确认密码" v-if = "type === 'register'" v-model="re_password"></el-input>
    <el-button type="primary" v-if = "type === 'register'" @click="signup()">注册</el-button>
    <el-button type="primary" v-else @click="login()">登录</el-button>
    <el-button type="primary" @click="loginOut()">销毁token</el-button>
    <el-button type="primary" @click="getMessage()">getMessage</el-button>
    <router-link to="/login" v-show = "type === 'register'" tag="p">已有账号，去登录</router-link>
    <router-link to="/register" v-show = "type === 'login'" tag="p">没有账号，去注册</router-link>

  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        userName: '',
        password: '',
        re_password: '',
        sayhub_token: ''
      }
    },
    props: {
      type: {
        type: String
      }
    },
    methods: {
      // 注册
      signup () {
      },
      // 登陆
      login () {
        if (this.userName === '') {
          this.$message.warning('用户名不能为空哦~~')
        } else if (this.password === '') {
          this.$message.warning('密码不能为空哦~~')
        } else {
          this.$store.dispatch('toLogin', {
            userName: this.userName,
            password: this.password
          }).then(
          //   () => {
          //   this.$store.dispatch('getUser')
          //   let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
          //   console.log(redirectUrl)
          //   // 跳转到指定的路由
          //   this.$router.push({
          //     path: redirectUrl
          //   })
          // }
          ).catch((error) => {
            console.log(error.response.data.message)
          })
        }
      },
      loginOut(){
        console.log("销毁token成功")
        this.$store.dispatch("loginOut",{})
          .then(res => {
            console.log("销毁token成功")
          }).catch(error => {
          console.log(error)
        })
      },
      //测试验证结果
      getMessage() {
        this.$store.dispatch("toGetMessage",{})
          .then(res => {
            console.log(res)
          }).catch()
      }
    }
  }
</script>

<style scoped>
  .login-style {
    border: 1px solid #fff;
    text-align: center;
    padding: 20px;
    line-height: 50px;
    background: #fff;
    width: 300px;
    box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.5);
    margin: 50px auto;
  }
  p {
    font-size: 12px;
    cursor: pointer;
  }
</style>
