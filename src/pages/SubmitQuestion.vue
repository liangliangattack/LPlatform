<template>
  <el-row>
    <Header/>
    <el-row class="background">
      <el-row class="container">
        <el-col span="18" class="lBody">
          <el-row class="lTitle">
            <img src="../../static/img/add.png">
            <span>发起</span>
            <span class="s1" style="float: right;margin-right: 1rem">问题</span>
          </el-row>
          <el-row class="lContent">
            <p style="margin-bottom: -.35rem">问题：</p>
            <el-input v-model="input" placeholder="问题标题..."></el-input>
            <p>内容：</p>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-row>
        </el-col>
        <el-col span="6" class="rBody">
          <el-row class="">
            问题发起指南
            • 问题标题: 请用精简的语言描述您发布的问题，不超过25字

            • 问题补充: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料：

            服务器运行环境信息；
            软件版本；
            问题发生的上下文信息；
            可以完整复现问题的代码（如可直接运行于 Kibana Console 的复现流程）；
            补充完整的异常和错误信息；
            注意阅读格式友好，代码和异常信息请用代码标签格式化张贴；
            • 选择标签: 选择一个或者多个合适的标签，不超过10个字

            • 关于积分： 发起一个问题会消耗您 20 个积分, 每多一个回复你将获得 5 个积分的奖励 ,为了您的利益, 在发起问题的时候希望能够更好的描述您的问题以及多使用站内搜索功能.
          </el-row>
        </el-col>
      </el-row>
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
  .background{
    background: #cccccc;
    width: 100%;
    height: 11rem;
  }
  .container{
    width: 24rem;
    background: white;
    margin: .5rem auto;
  }
  .lBody {
    background: #fff;
    height: 10rem;
    border-right: 0.01rem #cccccc solid;
  }
  .lTitle{
    width: 100%;
    height: 1rem;
    font-size: .35rem;
    padding: .2rem  0 .2rem .2rem;
    align-items: center;
    border-bottom: 0.01rem #cccccc solid;
  }
  .lTitle img {
    width: .35rem;
    height: .45rem;
  }
  /*相对布局*/
  .lTitle .s1{
    font-weight: bolder;
    position: relative;
    top: .3rem;
    /*background: #78dded;*/
    /*padding: .03rem ;*/
  }

  .rBody {
    height: 10rem;
    font-size: .25rem;
    padding: .15rem;
  }
  .lContent{
    width: 100%;
    padding: .4rem;
    /*height: 2rem;*/
  }
  .lContent > p{
    margin: 0;
  }
</style>
