<template>
  <div>
    <div class="customModuleRow"></div>
    <div class="l-w-two">
      <div class="l-nav-two">
        <div class="l-icon-two"></div>
        <a href="javascript:;" @click="$router.push('/index')"><h4>首页</h4></a>
        <a href="javascript:;" @click="onClickevening"><h4>>> 夜场新闻</h4></a>
        <a href="javascript:;" @click="onClickevening"><h4>>> {{informationl.name}}</h4></a>
        <span><i>>></i> {{ informationl.title }}</span>
      </div>
      <div class="chengdu-box">
        <div class="chengdu-l">
          <a href="javascript:;">{{informationl.name}}</a>
        </div>
        <div class="chengdu-r">
          <div class="chengdu-txet">{{ informationl.title }}</div>
          <div class="writing markdown-body">
            <VueMarkdown :source="content"></VueMarkdown>
          </div>
          <div class="page-box">
            <div class="next-page">
              <div v-show="showPrise">
                <i>上一篇</i>&nbsp;&nbsp;&nbsp;<a
                  href="javascript:;"
                  @click="onClicknext"
                  >{{ informationltwo.title }}</a
                >
              </div>
            </div>
            <div class="previous-page">
              <div v-show="showprevious">
                <i>下一篇</i>&nbsp;&nbsp;&nbsp;<a
                  href="javascript:;"
                  @click="onClickprevious"
                  >{{ journalismtype.title }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/assets/css/chengdu_evening.css">
</style>
<script>
import VueMarkdown from "vue-markdown";
import axios from "axios";
export default {
  components: {
    VueMarkdown, // 注入组件
  },
  data() {
    return {
      informationl: [],
      informationltwo: [],
      journalismtype: [],
      showPrise: true,
      showprevious: true,
      msg: "http://49.235.93.38:82/",
      datares: [],
      content: "",
    };
  },
  methods: {
    onClickevening: function () {
      this.$router.push("/evening_news");
    },
    onClickprevious: function () {
      this.$router.push("/chengdu_evening/" + this.journalismtype.id);
      this.$router.go(0);
    },
    onClicknext: function () {
      this.$router.push("/chengdu_evening/" + this.informationl.id);
      this.$router.push("/chengdu_evening/" + this.informationltwo.id);
      this.$router.go(0);
    },
  },
  created() {
    axios.get("/index.php/api/journalism/list").then((res) => {
      this.datares = res.data;
      
      let datas = this.$route.params.id - 1;
      this.informationl = res.data[datas];
      console.log(this.informationl);
      this.content = this.informationl.content;
      if (this.informationl.id == 1) {
        this.showPrise = false;
        this.journalismtype = res.data[datas + 1];
      }
      if (this.informationl.id == 2) {
        this.informationltwo = res.data[datas - 1];
        console.log(this.informationltwo);
      }
      if (datas == this.datares.length - 1) {
        this.showprevious = false;
        this.journalismtype = res.data[datas - 1];
      }
    });
  },
};
</script>
