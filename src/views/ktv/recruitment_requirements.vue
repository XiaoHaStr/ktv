
<template>
  <!-- 关于我们 -->
  <div>
    <!-- 轮播图 -->
    <div class="slideshow">
      <img
        src="https://aimg8.dlszyht.net.cn/ev_user_module_content_tmp/2018_09_30/tmp1538300266_1761174_s.jpg"
        alt=""
      />
    </div>
    <!-- 轮播图 结束 -->
    <!-- 关于我们 -->
    <div class="regard">
      <div class="regard-center w1200">
        <!-- 左侧边栏 -->
        <div class="regard-left">
          <ul
            class="list animate__animated animate__bounce animate__fadeInLeft"
          >
            <li>
              <router-link to="/about_us">{{ listData1.title }}</router-link>
            </li>
            <li>
              <router-link to="/contact_us">{{ listData2.title }}</router-link>
            </li>
            <li class="point">
              <router-link to="/recruitment_requirements">{{
                listData3.title
              }}</router-link>
            </li>
          </ul>
          <div
            class="box animate__animated animate__animated animate__fadeInRight"
          >
            <div id="items" class="q_items">
              <h1>{{ listData3.title }}</h1>
              <pre>{{ listData1.content }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listData1: [],
      listData2: [],
      listData3: [],
    };
  },
  created() {
    this.$axios.get("/index.php/api/about_us/list").then((res) => {
      this.listData1 = res.data[0];
      this.listData2 = res.data[1];
      this.listData3 = res.data[2];
    });
  },
};
</script>
<style scoped src="@/assets/css/recruitment.css">
</style>