<template>
  <el-row>
    <Header :type="'register'"></Header>
    <el-row class="background">
      <el-row class="container">
        <el-col span="18" class="lBody">
          <el-row class="lTitle">
            <img src="../../static/img/display.png">
            <span>发现</span>
            <a href="#" class="s1" ref="newest" @click="changeNewest('newest')">最新</a>
            <a href="#" class="s1" ref="recommend" @click="changeRecommend('recommend')">推荐</a>
            <a href="#" class="s1 active" ref="hot" @click="changeHot('hot')">热门</a>
            <a href="#" class="s1" ref="" @click="" style="color: red;">消灭零回复</a>
          </el-row>
          <el-row class="lContent" :is="currentView">
          </el-row>
        </el-col>
        <el-col span="6" class="rBody">
          <img src="../../static/img/ad.png" style="width: 4.4rem;height: 4.4rem;" alt="错误">
        </el-col>
      </el-row>
      <BackTop :height="400" :bottom="100">
        <div class="top">
          <img src="../../static/img/up.png" style="width: .3rem;height: .3rem;">
        </div>
      </BackTop>
    </el-row>
  </el-row>
</template>

<script>
  import Header from '../components/Header'
  import newest from './indexItems/newest'
  import recommend from './indexItems/recommend'
  import hot from './indexItems/hot'

  export default{
    data () {
      return {
        currentView:'hot',
      }
    },
    components: {
      Header,
      hot,
      newest,
      recommend
    },
    created () {
      // this.getUserInfo()
    },
    methods: {
      /*               二级导航栏                             */
      changeNewest(page){
        this.currentView = page;
        this.$refs.hot.classList.remove('active');
        this.$refs.recommend.classList.remove('active');
        this.$refs.newest.classList.add('active');
      },
      changeRecommend(page){
        this.currentView = page;
        this.$refs.newest.classList.remove('active');
        this.$refs.hot.classList.remove('active');
        this.$refs.recommend.classList.add('active');
      },
      changeHot(page){
        this.currentView = page;
        this.$refs.newest.classList.remove('active');
        this.$refs.recommend.classList.remove('active');
        this.$refs.hot.classList.add('active');
      },
      /*               二级导航栏                             */

    }
  }
</script>

<style scoped>
  .background{
    margin-top: .8rem;
    background: #cccccc;
    width: 100%;
    height: 30rem;
  }
  .top{
    padding: .2rem;
    background: rgba(0, 10, 16, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }

  .container{
    width: 20rem;
    height: 95%;
    background: white;
    margin: .5rem auto;
    padding: 0;/*消除bootstrap的container的css*/
    border-radius: .1rem;
  }
  .lBody {
    height: 100%;
    border-right: 0.01rem #cccccc solid;
  }
  .lTitle{
    width: 100%;
    height: 4%;
    font-size: .35rem;
    padding: .2rem  0 .2rem .2rem;
    align-items: center;
    border-bottom: 0.01rem #cccccc solid;
  }
  .lTitle img {
    width: .45rem;
    height: .45rem;
  }
  /*相对布局*/
  .lTitle .s1{
    position: relative;
    top: .4rem;
    font-size: .25rem;
    color: #747474;
    float: right;
    padding: 0 .2rem;
    margin: 0 .1rem;
    text-decoration: none;
    outline: none;/*去掉firefox、ie a标签选中之后的虚线框框*/


    /*background: #78dded;*/
    /*padding: .03rem ;*/
  }
  .s1:hover {
    border-bottom: .04rem solid #2394ff;
  }
  /*s1 的激活状态*/
  .active {
    border-bottom: .04rem solid #2394ff;
  }

  .rBody {
    height: 100%;
    font-size: .2rem;
    padding: .4rem .3rem 0 .3rem;
  }
  .textInner {

  }
  .lContent{
    width: 100%;
    height: 96%;
    padding: .1rem .3rem;
  }
  .lContent > p{
    margin: 0;
  }
</style>
