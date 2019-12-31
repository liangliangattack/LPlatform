<template>
  <div id="Header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#00ffff">

      <el-menu-item index="0"><img src="../assets/L_grey.jpg" style="width: .3rem;height: .3rem"/></el-menu-item>
      <el-menu-item index="1" @click="gotoIndex()">动态</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" @click="tokenTest()">消息中心</el-menu-item>
      <el-menu-item index="3" @click="submitQuestion()" v-show="this.token != null">发起问题</el-menu-item>

      <el-submenu index="5" style="float: right"   v-show="this.token != null">
      <template slot="title" v-show="type === ''" class="mine">
        <el-avatar @error="errorHandler">
          <img :src="avatarUrl"/>
        </el-avatar>
      </template>
      <el-menu-item index="5-1">
        <i class="el-icon-s-tools"></i>
        Setting
      </el-menu-item>
      <el-menu-item index="5-2" @click="loginOut()">
        <i class="el-icon-back"></i>
        LoginOut
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="1" style="float: right"  v-show="this.token === null">
        <el-avatar @error="errorHandler">
          <img src="../assets/github.png"/>
        </el-avatar>
        <a href="https://github.com/login/oauth/authorize?client_id=0e5beec3e6398c0c0ad6">登录</a>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
  //导入api.js文件的方法
  import {getXX} from '../vuex/api.js'

  export default {
    name: "Header",
    data() {
      return {
        activeIndex2: '1',
        token: window.localStorage.getItem('token'),
        // avatarUrl: this.$store.getters.getAvatarUrl,//刷新就没了
        avatarUrl: window.localStorage.getItem('avatarUrl'),
        loginStatus: this.$store.getters.getLoginStatus,
      };
    },
    props:{
      type:{
        type: String
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      errorHandler() {
        return true
      },
      //退出登录
      loginOut:function () {
        this.$router.push({path:'/login'});
      },
      //打印token
      my:function () {
        console.log("当前token是："+this.token);
        console.log("当前图片是："+this.avatarUrl);
        console.log("登录状态："+this.loginStatus);
      },
      gotoIndex:function(){
        this.$router.push({path:'/index'});
      },
      submitQuestion:function(){//发起问题页面
        this.$router.push({path:'/submitQuestion'});
      },

      //token接口调用测试ing.........
      tokenTest:function () {
        //token检查
        getXX("/token/getXX",null)
          .then(response => {
            if(response.status == 200){
              //请求成功
              if(response.data.result == "ok"){
                //数据返回成功

              }
            }else {
            }
          }).catch(error => {
            console.log(error);
          });
      },
    },
    mounted() {
      this.my();
    }

  }

  //==================打印 github验证的code
  window.onload = function () {//窗体加载完毕事件
    const code = getQueryString("code");
    if(code != null && code .toString().length > 1){
      console.log("code:"+getQueryString("code"));
    }else{
      console.log("code不存在");
    }
  };
  function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    return r != null ? decodeURI(r[2]) : null ;
  }
</script>


<style scoped>
  #Header{
    font-weight: bolder;

  }
  a{
    text-decoration: none;
  }
</style>
