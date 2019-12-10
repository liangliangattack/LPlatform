<template>
  <el-row class="login-style">
    <h2 v-show = "type === 'register'">注册</h2>
    <h2 v-show = "type === 'login'">登录</h2>
    <el-input placeholder="用户名" v-model="userName"></el-input>
    <el-input type="password" placeholder="密码" v-model="password"></el-input>
    <el-input type="password" placeholder="确认密码" v-if = "type === 'register'" v-model="re_password"></el-input>
    <el-button type="primary" v-if = "type === 'register'" @click="signUp()">注册</el-button>
    <el-button type="primary" v-else @click="login()">登录</el-button>
    <el-button type="danger" icon="el-icon-delete" @click="loginOut" circle></el-button>
    <el-button type="info" icon="el-icon-message" @click="getMessage" circle></el-button>
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
    //子组件在props中创建一个属性，用以接收父组件(Login、register)传过来的值
    //子组件在props中创建一个属性，用以接收父组件传过来的值
    // 父组件中注册子组件
    // 在子组件标签中添加子组件props中创建的属性
    // 把需要传给子组件的值赋给该属性
    props: {
      //自定义名字
      type: {
        //类型 String
        type: String
      }
    },
    methods: {
      // 注册
      signUp () {
        if (this.userName === '') {
          this.$message.warning('用户名不能为空哦~~')
        } else if (this.password === '') {
          this.$message.warning('密码不能为空哦~~')
        }else if (this.re_password === '') {
          this.$message.warning('确认密码不能为空哦~~')
        }
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
            (res) => {
              if(res.status == 200){
                console.log("登录成功");
                this.$router.push({
                  path: '/Index'
                })
              }
            // this.$store.dispatch('getUser')
            // let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
            // console.log(redirectUrl)
            // // 跳转到指定的路由
            // this.$router.push({
            //   path: redirectUrl
            // })
          }
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
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .login-style {
    border: 0.02rem solid #fff;
    text-align: center;
    padding: .3rem;
    line-height: .83rem;
    background: #fff;
    width: 5rem;
    box-shadow: 0 0.02rem 0.05rem 0 rgba(0, 34, 77, 0.5);
    margin: .83rem auto;
  }

</style>
