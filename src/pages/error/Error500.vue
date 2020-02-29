<template>
  <div class="background">
    <div class="btn">
      <el-button type="warning" @click="gotoIndex()" style="width: 3.4rem;height: 1.5rem;">返回主页</el-button>
      <el-button type="warning" @click="goBack()" style="margin-left: 1rem;width: 3.4rem;height: 1.5rem;">后退一步</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Error500",
    methods:{
      gotoIndex:function(){
        this.$router.push({path:'/index'});
      },
      goBack:function(){
        this.$router.go(-1);
        // this.$router.push({path:'/login'});
      },

    }
  }
</script>

<style scoped>
  .background {
    background-image: url("../../../static/img/error500.jpg");
    position:fixed;
    top: 0;
    left: 0;/*这三句是让整个固定在屏幕的最上方和最左方*/

    width:100%;
    height:100%;
    min-width: 1000px;
    /*上面前两句是让整个p跟屏幕实现一模一样的大小，从而达到全屏效果，而min-width是为了实现让屏幕宽度在1000px以内时，
    p的大小保持不变，也就是说在这种情况下，缩放屏幕宽度时，图片不要缩放（只有在1000px以内才有效）。*/
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;

    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    /*上面三句是一个意思，就是让图片随屏幕大小同步缩放，但是有部分可能会被裁切，不过不至于会露白，
    下面两句是为chrome和opera浏览器作兼容。*/

    background-position: center 0;/*上面这句的意思就是图片的位置，居中，靠左对齐*/
  }
  .btn{
    position: fixed;
    top: 9.4rem;
    left: 8.5rem;
  }
</style>
