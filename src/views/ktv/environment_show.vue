<template>
  <!-- 环境展示 -->
  <div>
    <!-- banner start -->
    <div class="j-banner">
      <div class="j-banner-image">
        <div class="j-introduce w1200">
          <div class="j-product">
            <h3>
              全场所有啤酒均可享受买二送一，还有更多豪礼等着你!
              <br />当晚本包间消费满6666以上，当晚可赠送豪华名宿酒店一套，限当天使用。
            </h3>
            <p>小包低消1080元 中包低消1280 大包低消1380 豪包低消2680</p>
          </div>
          <div class="j-code">
            <img src="@/assets/img/image_2.png" alt="" />
          </div>
          <div class="j-relation">
            <span>T：13688143752</span>
          </div>
          <div class="j-cur">
            <span class="j-span"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- banner end -->

    <!-- 环境展示 start -->
    <div class="w1200">
      <div class="j-atmosphere">
        <a href="javascript:;">首页</a>
        <span>&gt;&gt;</span>
        <em>环境展示</em>
      </div>
      <div class="j-night">
        <a href="javascript:;" @click="onClickList(1)">夜场环境</a>
      </div>
      <div class="j-private">
        <ul class="clearfix">
          <li @click="onClickList(item.id)" v-for="item in dataList" :key = "item.id">
            <img :src="$store.state.imagePath +item.image" alt="" />
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 环境展示 end -->

    <!-- 翻页部分 start -->
    <div class="j-page">
      <div class="w1200">
        <div class="j-page-go">
          <span>共有一页</span>
          <i>首页</i>
          <span>上一页</span>
          <em>1</em>
          <i>下一页</i>
          <span>尾页</span>
        </div>
      </div>
    </div>
    <!-- 翻页部分 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList:[],
    };
  },
  methods: {
    onClickList(id) {
      this.$router.push("ktvenvironmentShowList/"+ id);
    },
  },
  //初始化
  created() {
    var url = 'http://49.235.93.38:82/index.php/api/ambient/list';
    this.$axios.get(url).then((data)=> {
      // console.log(data);
      if(data.data&& data.status == 200){
        this.dataList = data.data;
        console.log(this.dataList);
      }
    })
  },
};
</script>


<style scoped src="@/assets/css/environment_show.css">
</style>