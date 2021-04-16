<template>
  <div>
    <div class="customModuleRow"></div>
    <div class="l-w-two">
      <div class="l-nav-two">
        <div class="l-icon-two"></div>
        <a href="javascript:;" @click="$router.push('/index')"><h4>首页</h4></a>
        <a href="javascript:;" @click="onClickevening"><h4>>> 夜场新闻</h4></a>
        <a href="javascript:;" @click="onClickevening"
          ><h4>>> {{ datares.name }}</h4></a
        >
        <span><i>>></i> {{ datares.title }}</span>
      </div>
      <div class="chengdu-box">
        <div class="chengdu-l">
          <a href="javascript:;">{{ datares.name }}</a>
        </div>
        <div class="chengdu-r">
          <div class="chengdu-txet">{{ datares.title }}</div>
          <div class="writing markdown-body">
            <VueMarkdown :source="datares.content"></VueMarkdown>
          </div>
          <div class="page-box">
            <div class="next-page">
              <div v-show="showPrise">
                <i>上一篇</i>&nbsp;&nbsp;&nbsp;<a
                  href="javascript:;"
                  @click="onClickPaging('prev')"
                  >{{ informationPrev.title }}</a
                >
              </div>
            </div>
            <div class="previous-page">
              <div v-show="showprevious">
                <i>下一篇</i>&nbsp;&nbsp;&nbsp;<a
                  href="javascript:;"
                  @click="onClickPaging('next')"
                  >{{ informationlNext.title }}</a
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
      informationPrev: {},
      informationlNext: {},
      datares: {},
      showPrise: true,
      showprevious: true,
      msg: "http://49.235.93.38:82/",
      content: "",
    };
  },
  methods: {
    onClickevening: function () {
      this.$router.push("/evening_news");
    },
    onClickPaging: function (type) {
      let id = this.$route.params.id;
      axios
        .get("/index.php/api/journalism/get?id=" + id + "&operate=" + type)
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.statusText == "OK") {
            if (res.data) {
              this.datares = res.data;
              this.$router.push("/chengdu_evening/" + this.datares.id);
              this.decideShow();
            }
          }
        });
    },
    decideShow: function () {
      let id = this.$route.params.id;
      axios
        .get("/index.php/api/journalism/get?id=" + id + "&operate=prev")
        .then((res) => {
          if (res.status == 200 && res.statusText == "OK") {
            if (res.data && res.data.title) {
              this.showPrise = true;
              this.informationPrev = res.data;
            } else {
              this.showPrise = false;
            }
          }
        });

      axios
        .get("/index.php/api/journalism/get?id=" + id + "&operate=next")
        .then((res) => {
          if (res.status == 200 && res.statusText == "OK") {
            if (res.data && res.data.title) {
              this.showprevious = true;
              this.informationlNext = res.data;
            } else {
              this.showprevious = false;
            }
          }
        });
    },
  },
  created() {
    let id = this.$route.params.id;
    axios.get("/index.php/api/journalism/get?id=" + id).then((res) => {
      this.datares = res.data;
      this.decideShow();
    });
  },
};
</script>
