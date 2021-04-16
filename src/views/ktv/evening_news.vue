<template>
  <div>
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
    <!-- 夜场新闻 -->
    <div class="l-w">
      <el-row>
        <el-col>
          <div class="l-nav">
            <div class="l-icon"></div>
            <a href="javascript:;" @click="$router.push('/index')"
              ><h4>首页</h4></a
            >
            <a href="javascript:;" @click="onClickevening"
              ><h4>>> 夜场新闻</h4></a
            >
            <a href="javascript:;" v-show="titleFlag" @click="onClickback">
              <h4>>> {{ titleName }}</h4>
            </a>
          </div>
          <div class="lj-customModuleRow">
            <div class="lx-box">
              <div class="l-icon-one"></div>
              <a href="javascript:;" @click="onClickevening"
                ><h5>夜场新闻</h5></a
              >
            </div>
            <div class="l-journalism">
              <div
                class="box-hzi"
                v-for="(item, index) in showstion"
                :key="index"
                @click="onClickshowstion(item.id, index)"
                :class="index == idx ? 'positive' : ''"
              >
                <div class="l-dot"></div>
                <a href="javascript:;">{{ item.name }}</a>
              </div>
            </div>
            <div class="lx-box">
              <div class="l-icon-one"></div>
              <a href="javascript:;" @click="onClickevening">
                <h5>{{ titleName }}</h5>
              </a>
            </div>
            <div class="l-MoBody">
              <div class="l-text-list-module">
                <ul class="l-xd">
                  <li
                    class="f-lex"
                    v-for="(item, index) in information"
                    :key="index"
                    @click="onClicksju(item.id)"
                  >
                    <div class="l-dot"></div>
                    <a href="javascript:;">{{ item.title }}</a>
                  </li>
                </ul>
              </div>
              <div class="l-paging">
                <el-button disabled class="bled"
                  >共有{{ pageSizeSum }}页</el-button
                >
                <el-button
                  type="primary"
                  plain
                  :disabled="firstDisabled"
                  @click="jumpFirstPage"
                  >首页</el-button
                >
                <el-pagination
                  background
                  small
                  layout="prev, pager, next"
                  :page-size="pageSize"
                  :total="pageSum"
                  :current-page="currentPage"
                  prev-text="上一页"
                  next-text="下一页"
                  @current-change="handleCurrentChange"
                >
                </el-pagination>
                <el-button
                  type="primary"
                  plain
                  class="rih"
                  :disabled="lastDisabled"
                  @click="jumpLastPage"
                  >尾页</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped src="@/assets/css/evening.css">
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      information: [],
      // 夜场新闻2tba切换的数据
      showstion: [],
      titleName: "",
      pageNumber: 1,
      pageSize: 21,
      pageSum: null,
      pageSizeSum: null,
      firstDisabled: true,
      lastDisabled: false,
      currentPage: null,
      idx: null,
      titleFlag: false,
    };
  },
  created() {
    axios.get("/index.php/api/journalism/list").then((res) => {
      this.pageSum = res.data.length;
      this.pageSizeSum = Math.ceil(this.pageSum / this.pageSize);
      if (this.pageSizeSum == 1) {
        this.lastDisabled = true;
      } else {
        this.lastDisabled = false;
      }
    });
    axios
      .get(
        "/index.php/api/journalism/list?pageNumber=1&pageSize=21&journalismtypeid=1"
      )
      .then((res) => {
        this.information = res.data;
      });
    axios
      .get("/index.php/api/journalismtype/list?pageNumber=1&pageSize=21")
      .then((res) => {
        this.showstion = res.data;
        this.titleName = this.showstion[0].name;
      });
  },
  methods: {
    jumpFirstPage() {
      this.handleCurrentChange(1);
      this.currentPage = 1;
    },
    jumpLastPage() {
      this.handleCurrentChange(this.pageSizeSum);
      this.currentPage = this.pageSizeSum;
    },
    handleCurrentChange(val) {
      axios
        .get(
          "/index.php/api/journalism/list?pageNumber=" + val + "&pageSize=21"
        )
        .then((res) => {
          this.information = res.data;
        });
      if (val == 1) {
        this.firstDisabled = true;
      } else {
        this.firstDisabled = false;
      }
      if (val == this.pageSizeSum) {
        this.lastDisabled = true;
      } else {
        this.lastDisabled = false;
      }
    },
    onClickevening: function () {
      this.titleFlag = false;
      this.idx = null;
      axios
        .get(
          "/index.php/api/journalism/list?pageNumber=1&pageSize=21&journalismtypeid=1"
        )
        .then((res) => {
          this.information = res.data;
        });
      console.log(1);
      this.$router.push("/evening_news");
    },
    onClicksju: function (id) {
      this.$router.push("/chengdu_evening/" + id);
    },
    onClickshowstion: function (id, index) {
      axios
        .get(
          "/index.php/api/journalism/list?pageNumber=1&pageSize=21&journalismtypeid=" +
            id
        )
        .then((res) => {
          this.idx = index;
          this.titleFlag = true;
          this.information = res.data;
          if (res.status == 200 || res.statusText == "OK") {
            this.titleName = res.data[0].name;
          }
          console.log(this.information);
        });
    },
  },
};
</script>