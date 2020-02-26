<template>
  <div>
    <el-row class="qList">
      <div v-for="item in list">
          <div class="media listItem">
            <div class="media-left qLeft">
              <a href="#">
                <img class="media-object userAvatar" :src="item.luser.avatarUrl" alt="错误...">
              </a>
            </div>
            <div class="media-body qRight">
              <h4 class="media-heading qRTitle" style="color: #1760ab;">{{item.title}}</h4>
              <p class="media-bottom qRBottom" style="color: #747474">
                {{item.luser.name}}&nbsp;&nbsp;发起了问题&nbsp;&nbsp;•&nbsp;
                {{item.viewCount}}人浏览&nbsp;&nbsp;•&nbsp;
                {{item.starCount}}人收藏&nbsp;&nbsp;•&nbsp;&nbsp;
                {{item.commentCount}}人评论&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="float: right;">{{item.createTime}}</span>

              </p>

            </div>
          </div>
      </div>
    </el-row>

    <el-row class="qPage">
      <!--分页-->
      <Page style="float: right"
            :total="page.total"
            :current="page.page"
            :page-size="page.pageSize"
            @on-change="changePage"
      />
    </el-row>


  </div>

</template>

<script>
  // $(function () {
  //   alert("欢迎使用 jquery");
  // });

  export default {
    name: "hot",
    data(){
      return{
        //话题列表
        list:[
          {
            title:"重磅《Elasticsearch 中国开发者调查报告》探索开发者的现状和未来",
            url:"https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
            description:"发布了置顶文章 • 8 个评论 • 5940 次浏览 • 2019-12-06 21:10"
          },
          {
            title:"重磅《Elasticsearch 中国开发者调查报告》探索开发者的现状和未来",
            url:"https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
            description:"发布了置顶文章 • 8 个评论 • 5940 次浏览 • 2019-12-06 21:10"
          },
        ],
        page:{
          total:0,
          page:1,
          pageSize:17,

        },
      };
    },
    methods:{
      getQuestion:function () {//发起问题
        this.$store.dispatch('toGetQuestions', {page:this.page.page,pageSize:this.page.pageSize})
          .then((res) => {
            if(res.status == 200){
              this.list = res.data.data;
              this.page.total = res.data.cursor.total;
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

      },
      changePage:function (i) {
        console.log("ssssssssssss"+i)
        this.page.page=i;
        this.getQuestion();
      }


    },
    mounted() {
      this.getQuestion(1);
    }

  }
</script>

<style scoped>
  .qList{
    height:95%;
    width: 100%;
  }
  .qPage{
    height:5%;
    width: 100%;
    vertical-align: center;
  }
  .userAvatar{
    width: 1rem;
    height: 1rem;
    border-radius: .1rem;
  }
  .listItem{
    height: 1.5rem;
    border-bottom: #cccccc .005rem solid;
    padding: .2rem;

  }
  .qLeft{
    padding-right: .35rem;
  }
  .qRight{
    padding: .15rem 0;
  }
  .qRBottom{
    margin-top: .2rem;
  }

</style>
