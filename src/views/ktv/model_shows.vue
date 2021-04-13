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
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/model_shows' }">
        <a @click="hrefModelShow">模特展示</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 选项菜单 -->
    <el-container>
      <el-aside style="width: 360px">
        <div>
          <div class="model-box">
            <div class="model-img">
              <!-- <img src="../../assets/img/MoName_Bg.png" alt /> -->
            </div>
            <div class="modelText">模特展示</div>
            <div class="model-img-hand">
              <!-- <img src="../../assets/img/MoName_Bg.png" alt /> -->
            </div>
          </div>
          <ul class="uls-select">
            <li class="uls-one" @click="onClickUlsOne">
              <a href="javascript:;">
                <i class="el-icon-caret-right" :class="iClass"></i>
                <span :class="selectClass">高端模特</span>
              </a>
            </li>
          </ul>
        </div>
      </el-aside>
      <!-- -----------------------右边 ----------------------- -->
      <el-main class="main-left">
        <div class="model-box">
          <div class="model-img">
            <!-- <img src="../../assets/img/MoName_Bg.png" alt /> -->
          </div>
          <div class="modelText">模特展示</div>
          <div class="model-img-hand">
            <!-- <img src="../../assets/img/MoName_Bg.png" alt /> -->
          </div>
        </div>
        <div class="dataListImg">
          <ul class="Img-top">
            <li
              @click="onClickliOne(item.id)"
              v-for="item in modelData"
              :key="item.id"
            >
              <div class="liImg">
                <img :src="$store.state.imagePath + item.image" alt />
              </div>
              <div class="liText">
                <div>
                  <b>{{ item.price }}</b> 元
                </div>
                <p>{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <div class="pagination-box">
          <el-pagination background layout="total,slot" :total="6">
            <span class="first-pager">首页</span>
          </el-pagination>
          <el-pagination
            background
            layout="prev, pager, next,slot"
            :total="6"
            next-text="下一页"
            prev-text="上一页"
          >
            <span class="first-pager">尾页</span>
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>



<script>
export default {
  data() {
    return {
      selectClass: "",
      iClass: "",
      liClassFlag: false,
      modelData: null,
    };
  },
  methods: {
    onClickUlsOne() {
      this.liClassFlag = !this.liClassFlag;
      if (this.liClassFlag) {
        this.iClass = "uls-i-rotate";
        this.selectClass = "uls-one-Click";
      } else {
        this.iClass = "";
        this.selectClass = "";
      }
      this.onClickliOne(1);
    },
    onClickliOne(id) {
      this.$router.push("/model/" + id);
    },
    hrefModelShow() {
      this.$router.push("/model_shows");
    },
  },
  created() {
    var url = "/index.php/api/models/list";
    this.$axios.get(url).then((response) => {
      if (response.status == 200 && response.statusText == "OK") {
        this.modelData = response.data;
      }
    });
  },
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}

/* banner start */

.j-banner {
  position: relative;
  width: 100%;
  height: 100%;
}

.j-banner-image {
  width: 100%;
  height: 600px;
  background-size: 100%;
}

.j-b-i {
  width: 100%;
  height: 100%;
}

.j-product {
  position: absolute;
  width: 803px;
  background-color: rgba(102, 0, 0, 0.7);
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
}

.j-product h3 {
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 35px;
  padding: 42px 0 24px 0;
  font-size: 22px;
  font-weight: 700;
  font-family: "幼圆";
  z-index: 7;
}

.j-product p {
  text-align: center;
  color: #fbf900;
  padding-bottom: 29px;
  font-size: 20px;
  font-family: "幼圆";
  font-weight: 400;
}

.j-code {
  position: absolute;
  top: 353px;
  left: 46.5%;
  width: 134px;
  height: 134px;
}

.j-code img {
  width: 100%;
}

.j-relation {
  position: absolute;
  top: 499px;
  left: 46.5%;
  width: 135px;
  height: 45px;
  background-color: #d9534f;
}

.j-relation span {
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}

.j-relation:hover {
  background-color: #c9302c;
}

.j-cur span {
  position: absolute;
  bottom: 15px;
  left: 49.5%;
  display: block;
  width: 17px;
  height: 17px;
  border: 1px solid #fff;
  border-radius: 50%;
}

/* banner end */
.el-breadcrumb {
  margin: 0 auto;
  width: 1200px;
  height: 35px;
  line-height: 35px;
  color: #9f9dff;
  background-color: #eff8ff;
  text-indent: 10px;
  margin-bottom: 10px;
}
.el-breadcrumb > .el-breadcrumb__inner.is-link {
  color: red;
}
.el-breadcrumb__inner a,
/deep/ .el-breadcrumb__inner.is-link {
  color: #2090ff;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a {
  color: #2090ff;
}
/deep/.el-icon-d-arrow-right:before {
  color: #2090ff;
}

.el-aside {
  position: relative;
  margin-right: 10px;
  box-sizing: border-box;
}

.uls-select {
  margin-top: 17px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px dotted #1e90ff;
}
.uls-select .uls-one {
  margin-top: 20px;
}
.uls-select li {
  position: relative;
  width: 100%;
  border-bottom: 1px dotted gray;
  height: 32px;
  line-height: 32px;
  margin-bottom: 5px;
}
.uls-select li span {
  margin-left: 20px;
  color: black;
  font-size: 14px;
  font-weight: 700;
}
.uls-one i {
  position: absolute;
  top: 10px;
  color: #2090ff;
}
.uls-one span:hover {
  color: #2090ff;
}
.uls-i-rotate {
  transform: rotate(45deg);
}
.uls-select li .uls-one-Click {
  color: #2090ff;
}

.model-box {
  display: flex;
  position: absolute;
  top: -1px;
  left: 5px;
}
.model-img,
.model-img-hand {
  width: 24px;
  height: 34px;
  overflow: hidden;
}
.model-img {
  background: url("../../assets/img/MoName_Bg.png") no-repeat 0 0px;
}
.model-img-hand {
  width: 40px;
  background: url("../../assets/img/MoName_Bg.png") no-repeat 0 -70px;
}
.modelText {
  text-align: center;
  padding: 0 10px 0 8px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  font-weight: 700;
  background-color: #1e90ff;
  color: white;
}
// .model-img-hand img {
//   position: relative;
//   top: -70px;
// }

.el-container {
  width: 1200px;
  height: 671px;
  margin: 0 auto;
}
/deep/ .el-main {
  overflow: visible;
}
.main-left {
  position: relative;
  margin-top: 17px;
  border: 1px dotted #1e90ff;
}
.main-left .model-box {
  display: flex;
  position: absolute;
  top: -18px;
  left: 5px;
  z-index: 100;
}
.main-left .model-img,
.main-left .model-img-hand {
  width: 24px;
  height: 34px;
  overflow: hidden;
}
.main-left .model-img-hand {
  width: 40px;
}
.main-left .modelText {
  text-align: center;
  padding: 0 10px 0 8px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  font-weight: 700;
  background-color: #1e90ff;
  color: white;
}
.main-left .model-img-hand img {
  position: relative;
  top: -70px;
}

.Img-top {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}
.Img-top li {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 33%;
  width: 200px;
  height: 265px;
  margin-bottom: 20px;
}
.Img-top li .liImg {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px dotted gray;
}
.Img-top li .liImg img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  transform: translate(-50%, -50%);
}
.Img-top li .liText {
  width: 200px;
}
.Img-top li .liText > div {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #999999;
}
.Img-top li .liText > div > b {
  color: red;
}
.Img-top li .liText > p {
  font-size: 14px;
  font-weight: 700;
  color: black;
}

.el-pagination button,
/deep/ .el-pagination span:not([class*="suffix"]) {
  font-size: 12px;
  padding: 0 5px;
  height: 24px;
  line-height: 24px;
  border: 1px solid rgb(233, 229, 229);
}
/deep/.el-pagination.is-background .btn-next,
/deep/ .el-pagination.is-background .btn-prev,
/deep/.el-pagination.is-background .el-pager li {
  background-color: white;
}
/deep/.el-pager li {
  height: 24px;
  line-height: 24px;
}
.first-pager {
  // margin: 0 10px 0 0 ;
  color: #c0c4cc;
}
.pagination-box {
  position: absolute;
  bottom: 15px;
  right: 10px;
  display: flex;
}
</style>