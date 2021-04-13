<template>
  <!-- 首页 -->
  <div class="main_container">
    <!-- banner start -->
    <div class="j-banner">
      <div class="j-banner-image">
        <img
          v-if="$store.state.bannerFlag"
          :src="$store.state.imagePath + $store.state.bannerData[0].image"
          alt=""
          class="j-b-i"
        />
        <div class="j-introduce w1200">
          <div class="j-product" v-if="$store.state.bannerFlag">
            <h3>
              {{ $store.state.bannerData[0].content }}
            </h3>
          </div>
          <div class="j-code">
            <img
              :src="$store.state.imagePath + $store.state.bannerCode.image"
              alt=""
            />
          </div>
          <div class="j-relation">
            <span>T：{{ $store.state.bannerCode.phone }}</span>
          </div>
          <div class="j-cur">
            <span class="j-span"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- banner end -->

    <!-- ENVIRONMENTAL DISPLAY start -->
    <div class="w1200">
      <div class="j-display">
        <div class="j-top">
          <h1>ENVIRONMENTAL DISPLAY</h1>
          <p>环境/AMBIENT</p>
          <div class="j-hr"></div>
        </div>
        <div class="j-private-idx animated" id="dowebok">
          <ul>
            <li
              v-for="item in environmentData"
              :key="item.id"
              @click="$router.push('/ktvenvironmentShowList/' + item.id)"
            >
              <div class="j-magnify">
                <img :src="$store.state.imagePath + item.image" alt="" />
              </div>
              <h3>{{ item.title }}</h3>
              <p>联系人：{{ item.contacts }}</p>
              <p>手 机：{{ item.phone }}</p>
              <p class="j-p10">地 址： {{ item.address }}</p>
              <div class="j-align">
                <div class="j-align-left">
                  <img v-lazy="require('../../assets/img/icon_1.png')" alt="" />
                  <span>：夜场模特</span>
                </div>
                <div class="j-align-right">
                  <img
                    v-lazy="require('../../assets/img/icon_2.png')"
                    alt=""
                  /><span>：1203人</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="j-examine" @click="$router.push('/environment_show')">
          <a href="javascript:;">查看更多</a>
        </div>
      </div>
    </div>
    <!-- ENVIRONMENTAL DISPLAY end -->

    <!-- 锦缘国际夜总会 start -->
    <div class="j-international">
      <div class="w1200">
        <div class="j-about">
          <div class="j-row_11">
            <div class="j-animated animated" id="dowebok">
              <p class="j-about-p">关于/ABOUT</p>
            </div>
            <h2 class="animated j-rotateIn" id="dowebok">锦缘国际夜总会</h2>
            <p class="p-play animated" id="dowebok">
              长沙夜总会，长沙夜场，长沙酒吧各种模特佳丽【13688143752】，设备齐<br />全，装修高端，资源丰富，生意每天开到爆，欢迎随时预定包厢
            </p>
            <a href="javascript:;" @click="$router.push('/about_us')"
              >了解详情</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 锦缘国际夜总会 end -->

    <!-- 模特部分 start -->
    <div class="w1200">
      <div class="j-blur">
        <div class="j-trademark animated" id="dowebok">
          <h2>高端KTV夜总会模特</h2>
          <div class="j-hr"></div>
        </div>
        <div class="j-inner">
          <div class="animated j-slideInLeft" id="dowebok">
            <ul>
              <li
                v-for="(k, i) in modelData"
                :key="i"
                @click="$router.push('/model/' + k.id)"
              >
                <div class="j-scale-1">
                  <img :src="$store.state.imagePath + k.image" alt="" />
                </div>
                <p>{{ k.title }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 模特部分 end -->

    <!-- 新闻资讯  start-->
    <div class="j-journalism">
      <div class="w1200">
        <div class="j-journalism-title animated" id="dowebok">
          <h2>新闻咨询</h2>
          <p>T E A C H E R</p>
          <div class="j-hr"></div>
        </div>
        <div class="j-play-item">
          <div
            class="j-img-left animated"
            id="dowebok"
            @click="$router.push('/evening_news')"
          >
            <img v-lazy="require('../../assets/img/image-110.jpeg')" alt="" />
          </div>
          <div class="j-right animated" id="dowebok">
            <div class="j-right-1 j-great" v-for="(k, i) in newsQuery" :key="i">
              <div class="j-doraem">
                <div
                  class="j-image-play j-img-bottom"
                  @click="$router.push('/chengdu_evening/' + k.id)"
                >
                  <img :src="$store.state.imagePath + k.image" alt="" />
                </div>
                <div class="j-divs j-model">
                  <i></i>
                  <h3 @click="$router.push('/chengdu_evening/' + k.id)">
                    {{ k.title }}
                  </h3>
                  <p>
                    {{ k.content }}
                  </p>
                </div>
              </div>
              <span>{{ k.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新闻资讯  end-->
  </div>
</template>
<script>
import animate from "../../assets/js/index";
export default {
  data() {
    return {
      modelData: [], // 模特数据
      newsQuery: [], // 新闻数据
      environmentData: [], // 环境数据
    };
  },
  created() {
    window.onscroll = animate.setAnimated;
    // 背景
    // const url = "";
    this.$axios
      .get("/index.php/api/carousel_map/list")
      .then((response) => {
        if (response.status == 200 && response.statusText == "OK") {
          this.$store.state.bannerData = response.data;
          this.$store.state.bannerFlag = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    //模特
    this.$axios.get("/index.php/api/models/list").then((response) => {
      if (response.status == 200 && response.statusText == "OK") {
        this.modelData = response.data;
      }
    });

    // 新闻
    this.$axios.get("/index.php/api/journalism/list").then((res) => {
      this.newsQuery = res.data;
    });

    // 环境
    this.$axios.get("/index.php/api/ambient/list").then((res) => {
      if (res.status == 200 && res.statusText == "OK") {
        this.environmentData = res.data;
      }
    });
  },
  animate,
  destroyed() {
    window.onscroll = null;
  },
};
</script>
<style scoped src="@/assets/css/animate.min.css">
</style>
<style scoped src="@/assets/css/index.css">
</style>