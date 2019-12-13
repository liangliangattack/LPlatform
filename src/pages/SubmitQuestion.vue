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
            <p style="margin-bottom: -.5rem">问题标题（简单扼要）:</p>
            <el-input v-model="title" placeholder="问题标题..."></el-input>
            <p style="margin-top: .5rem;margin-bottom: .1rem">问题补充 (必填，请参照右侧提示):</p>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="content">
            </el-input>
            <p style="margin-top: .5rem;margin-bottom: -.5rem">添加标签:</p>
            <el-input v-model="tag" placeholder="创建或搜索添加新话题..."></el-input>
          </el-row>
          <el-row class="submitBody">
            <el-button type="info" class="submitButton" @click="addQuestion()">提交</el-button>
          </el-row>
        </el-col>
        <el-col span="6" class="rBody">
          <el-row class="txt">
            <el-row class="textInner">问题发起指南</el-row>
            <el-row class="textInner">• 问题标题: 请用精简的语言描述您发布的问题，不超过25字</el-row>
            <el-row class="textInner">• 问题补充: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料：</el-row>
            <el-row class="textInner">• 服务器运行环境信息；</el-row>
            <el-row class="textInner">• 软件版本；</el-row>
            <el-row class="textInner">• 问题发生的上下文信息；</el-row>
            <el-row class="textInner">• 可以完整复现问题的代码（如可直接运行于 Kibana Console 的复现流程）；</el-row>
            <el-row class="textInner">• 补充完整的异常和错误信息；</el-row>
            <el-row class="textInner">• 注意阅读格式友好，代码和异常信息请用代码标签格式化张贴；</el-row>
            <el-row class="textInner">• 选择标签: 选择一个或者多个合适的标签，不超过10个字</el-row>
            <el-row class="textInner">• 关于积分： 发起一个问题会消耗您 20 个积分, 每多一个回复你将获得 5 个积分的奖励 ,为了您的利益, 在发起问题的时候希望能够更好的描述您的问题以及多使用站内搜索功能.</el-row></el-row>
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
        title:"",
        creator:"",
        tag:"",
        content:"",
      }
    },
    components: {
      Header
    },
    methods: {
      addQuestion:function () {//发起问题
        if (this.title === '') {
          this.$message.warning('标题不能为空')
        } else if (this.content === '') {
          this.$message.warning('内容不能为空')
        } else {
          this.$store.dispatch('toAddQuestion', this.getDataTemplate("normalTemplate"))
            .then((res) => {
              if(res.status == 200){
                this.$message.success(res.data.successMessage)
                this.$router.push({path: '/index'})
              }else if(res.status == 401){
                console.log(res.status);
                this.$notify({
                  title: 'token过期',
                  message: '登录失效,请重新登录',
                  type: 'warning'
                });
              }
              // this.$store.dispatch('getUser')
              // let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
              // console.log(redirectUrl)
              // // 跳转到指定的路由
              // this.$router.push({
              //   path: redirectUrl
              // })
            }).catch((error) => {
            console.log(error.response.data.message)
          })
        }
      },
      getDataTemplate:function (inputInfo) {
        let outputData = {};
        switch (inputInfo) {
          case "defaultTemplate": outputData = {
            title:this.title,
            creator:this.creator,
            tag:this.tag,
            content:this.content,
          };break;
          case "normalTemplate":outputData = {
            title:this.title,
            creator:this.creator,
            tag:this.tag,
            content:this.content,
          };break;
        }
        return outputData;
      },
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
    font-size: .2rem;
    padding: .4rem .3rem 0 .3rem;
  }
  .textInner {

  }
  .lContent{
    width: 100%;
    height: 75%;
    padding: .4rem;
  }
  .lContent > p{
    margin: 0;
  }
  .submitBody {
    height: .5rem;
  }
  .submitButton{
    float: right;
    margin-right: 1rem;
  }
</style>
