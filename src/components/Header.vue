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

      <el-menu-item index="0"><img src="../assets/LPlatform.png" style="width: 30px;height: 30px"/></el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
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
      <el-menu-item index="3">消息中心</el-menu-item>


      <el-submenu index="5" style="float: right">
      <template slot="title">
        <el-avatar @error="errorHandler">
          <img src="../assets/红月.jpg"/>
        </el-avatar>
      </template>
      <el-menu-item index="5-1">
        <i class="el-icon-s-tools"></i>
        Setting
      </el-menu-item>
      <el-menu-item index="5-2" @click="logOut()">
        <i class="el-icon-back"></i>
        Logout
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="1" style="float: right">
        <el-avatar @error="errorHandler">
          <img src="../assets/github.png"/>
        </el-avatar>
        <a href="https://github.com/login/oauth/authorize?client_id=0e5beec3e6398c0c0ad6&redirect_uri=http://localhost:8230/author/callback"></a>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
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

  export default {
    name: "Header",
    data() {
      return {
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      errorHandler() {
        return true
      },
      logOut:function () {

        this.$router.push({path:'/Login'});
      }
    }

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
