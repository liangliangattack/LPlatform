<template>
  <el-row>
    <Header :type="'register'"></Header>
    <el-row class="background">
      <el-row class="container">
        <el-col span="18" class="lBody">
          <el-row class="lTitle">
            <h3>doc values 与 field data 的一些知识整理</h3>
            <span style="margin-top: .4rem;font-size: .2rem;">作者 TracyMacGrade | 发布于6 天前 | 阅读数：160</span>
            <span class="favoriteArea">收藏  | {{startCount}}</span>
          </el-row>
          <el-row class="lContent">
            <pre>一直不明白doc value 和 filed Data 区别和作用，看了一些资料整理了一下。
              1，什么是doc value 数据结构？

              DocValues是在Lucene4.0引入的新特性，属于正向索引。它存储文档编号到字段值正向关系的索引（意思就是一个以DocID为键，以Value为值的Map。存储了DocID 和 对应文档的正向关系，在排序或者统计计算时，通过DocID可以迅速取字段的值进行二次计算。），意在取代FieldCache在搜索时所发挥的作用，消除搜索时需要 加载倒排索引构建 FieldCache而引起的性能问题。（什么性能问题呢？ fieldData存在 JVM的堆内存里，当倒排索引量大的时候，容易OOM。 为什么 doc value不占内存？ doc value 是被序列化存储到磁盘里的，可以用操作系统的文件缓存来代替JVM heap）。

              DocValues存储结构： 主要是存储了DocID与Values之间的映射关系。一个Segment只有一个DocValues文件。也就是被DocValues标记的字段在建索引时会额外存储文件到值的映射关系，存储这个映射的文件叫DocValues data，简称**.dvd**。（Lucene 7.5）DocValues共支持五种字段的值类型，且针对每种字段值的类型有不同的编码策略，以适应它们的数据特征。由Solr根据你文档的类型自动帮你指定了。如下：
              1，Numeric:NumericDocValuesWriter
              对于一般的integer/long/float/double/date都采用NumericDocValuesWriter
              2，Binary:BinayDocValuesWriter
              对应BinaryField，并且它会被转成byte[]进行存储
              3，Sorted:SortedDocValuesWriter
              对应String
              4，Sorted Set:SortedSetDocValuesWriter
              对应StrField字段，但仅限于multiValue="true"的情况
              5，Sorted Number:SortedNumericDocValuesWriter
              对应所有Trie*Field，包括TrieIntField和TrieDateField
              但是 DocValues目前还不支持分词字段类型，也就是TextField，那分词聚合怎么办？ 还是用fielddata。

              什么时候要用到 DocValues呢？
              倒排索引 优势在于通过某个单词找到 某个文档，但是 比如说 在一张表中根据某个字段排序，分组，是不是就需要用这张表去分析某个字段而不是用某个字段去 找到某个文档，doc value就是干这个的。
              在一般的es 查询的 步骤为：
              1，将一个很多条件的query 树，根据查询条件分为很多subQuery去查询
              2，将所有query的结果汇集到一起形成一个  postinglist 也就是所有符合的 idset
              3，将idset 按照要求 评分（这个是计算相关度），排序。
              这时候 docvalue 结构运用于 第三步的 排序。在排序或 分组时，如果不使用docvalue，lucene内部会遍历提取所有出现在文档集合
              的排序字段然后再次构建一个最终的排好序的文档集合list，这个步骤的过程全部维持在内存中操作，而且如果排序数据量巨大的话，非常容易就造成es内存溢出和性能缓慢。


              2，什么是 field data？
              field data 是在text 类型查询时，在内存中形成的一种数据结构，称之为正排索引。也是文档对于字段id的正向存储关系。当text字段被排序，聚合或者通过脚本访问时这种数据构会被创建。它是通过从磁盘读取每个segment的整个反向索引来构建的，然后存存储在java的堆内存中。
              fileddata默认是不开启的。Fielddata可能会消耗大量的堆空间，尤其是在加载高基数文本字段时。一旦fielddata已加载到堆中，它将在该段的生命周期内保留。此外，加载fielddata是一个昂贵的过程，可能会导致用户遇到延迟命中。这就是默认情况下禁用fielddata的原因。如果尝试对文本字段进行排序，聚合或脚本访问，将看到以下异常：
              “Fielddata is disabled on text fields by default. Set fielddata=true on [your_field_name] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory.”

              3，总结一下
              doc value 是在排序，分组等 需要文档映射到具体字段的一种正向索引，适用于很多类型字段，存储在磁盘上。 而field data 是单指text 类型 也就是可以分词的类型的字段 在使用排序或分组等情况下 在内存中形成的一种正向索引，耗内存，一般默认不使用。

              以上知识很多来源于 网上各种资料，可能思绪有点乱，想到哪写到哪 ，如果有错误的地方，欢迎大家 拍砖指正。</pre>
            <p style="border-bottom: #dddddd .01rem solid;margin-top: .5rem;"></p>
            <p style="border-bottom: #dddddd .01rem solid;margin-top: .1rem;"></p>
            <span>发布于6 天前</span>
            <span style="margin-left: 1rem;">评论</span>
            <el-row class="comment">
              <h3 style="padding: .2rem 0;border-bottom: .01rem #ccc solid">2个回复</h3>
            </el-row>
          </el-row>
        </el-col>
        <el-col span="6" class="rBody">
          <p style="margin-top: .4rem">发起人</p>
          <img src="../../static/img/ad.png" class="userAvatar" alt="错误">
          <span style="margin-left: .4rem;">TracyMacGrade</span>
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
        startCount:1,
      }
    },
    components: {
      Header,
    },
    created () {

    },
    methods: {

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
  .container{
    width: 20rem;
    height: 94%;
    background: #fff;
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
    height: 6%;
    font-size: .35rem;
    padding: .2rem  .2rem .2rem .4rem;
    align-items: center;
    border-bottom: 0.01rem #cccccc solid;
  }
  .favoriteArea{
    border: .01rem #ccc solid;
    border-radius: .1rem;
    background: #747474;
    width: 1.4rem;
    height: .5rem;
    float: right;
    color: white;
    font-size: .2rem;
    padding: .1rem;
    text-align: center;
  }
  .lContent{
    width: 100%;
    height: 96%;
    padding: .1rem .3rem;
  }
  .lContent >span {
    color: #7a7a7a;
  }
  .comment {
    margin-top: .7rem;

  }

  .rBody {
    height: 100%;
    font-size: .2rem;
    padding: .4rem .3rem 0 .3rem;
  }
  .userAvatar{
    width: .6rem;
    height: .6rem;
    border-radius: .1rem;
  }

</style>
