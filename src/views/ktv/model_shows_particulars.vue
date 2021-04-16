<template>
  <div style="background-color='#fff">
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
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/model_shows' }">
        <a>模特展示</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-container>
      <el-aside style="width: 360px">
        <div>
          <div class="show">
            <img src="../../assets/img/MoHead_Bg.png" alt />
            <span>模特展示</span>
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
      <div ref="mainleft">
        <el-main class="main-left">
          <div class="show">
            <img src="../../assets/img/MoHead_Bg.png" alt />
            <span>详细说明</span>
          </div>
          <!-- 详细 放大镜 -->
          <div class="magnifyingGlass-box">
            <div>
              <div
                class="glass-left"
                ref="big"
                @mouseenter="onMouseEnter"
                @mouseleave="leave"
                @mousemove="onMouseMoveSmall($event)"
              >
                <img :src="$store.state.imagePath + modelDataList.image" alt />
                <div class="coating" ref="small" v-show="isShow"></div>
              </div>
              <!-- 分享 -->
              <div class="share">
                <ul class="share-ul">
                  <li>
                    <div class="lis" @click="onClickWx"></div>
                    <div class="qrcode" v-show="isQrcode">
                      <div class="qrcode-top">
                        <span>分享到微信</span>
                        <b @click="onClickX">X</b>
                      </div>
                      <div id="qrcode" ref="qrcode" class="qrcodeImg"></div>
                    </div>
                  </li>
                  <li @click="onClickLiTwo"></li>
                  <li @click="onClickLiThree"></li>
                  <li @click="onClickLiFour"></li>
                  <!-- <li></li> -->
                </ul>
              </div>
            </div>
            <div class="glass-right">
              <div class="showImg-box" v-show="isShow">
                <div class="showImg" ref="showImg">
                  <img
                    :src="$store.state.imagePath + modelDataList.image"
                    alt
                  />
                </div>
              </div>
              <div class="glass-right-text">{{ modelDataList.title }}</div>
              <div class="money">
                <span>价格</span>
                <b>{{ modelDataList.price }}</b>
              </div>
            </div>
          </div>
          <!-- 产品说明 -->
          <div class="explain">
            <div class="explain-top">
              <ul>
                <li>产品说明</li>
              </ul>
            </div>
            <div class="explain-bom">
              <img :src="$store.state.imagePath + modelDataList.image" alt />
            </div>
          </div>
          <!-- 相关产品 -->
          <div class="relatedProducts">
            <div class="relatedProducts-top">相关产品</div>
            <div class="relatedProducts-bom">
              <!-- 轮播图 -->
              <el-carousel :interval="4000" type="card" height="250px">
                <el-carousel-item
                  v-for="item in productListData"
                  :key="item.id"
                >
                  <a href="#">
                    <div class="lbt-box" @click="onClickdata(item)">
                      <div class="lbt-box-img">
                        <img :src="$store.state.imagePath + item.image" alt />
                      </div>
                      <p>{{ item.price }}元</p>
                      <h3>{{ item.title }}</h3>
                    </div>
                  </a>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      selectClass: "",
      iClass: "",
      liClassFlag: false,
      productListData: [], //轮播图数据
      modelDataList: {}, //指定的数据
      imgSrc01: "",
      isShow: false, //蒙层显示隐藏
      isQrcode: false, //二维码层
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
      this.$router.push("/model_shows");
    },
    onClickdata(item) {
      this.modelDataList = item;
    },
    //移入事件
    onMouseEnter() {
      this.isShow = true;
    },
    //移出事件
    leave() {
      this.isShow = false;
    },
    //移动小盒子
    onMouseMoveSmall(e) {
      var maxY = this.$refs.big.offsetHeight - this.$refs.small.offsetHeight;
      var maxX = this.$refs.big.offsetWidth - this.$refs.small.offsetWidth;
      var min = 0;

      //获取小盒子到顶部和左边的距离
      var sX = this.$refs.mainleft.offsetLeft + 5;
      var sY = this.$refs.mainleft.offsetTop + 40;
      //盒子的距离顶部窗口和左边的距离
      var smallX = e.pageX;
      var smallY = e.pageY;
      //获取小盒子的高度
      var smallH = this.$refs.small.offsetHeight / 2;
      var smallW = this.$refs.small.offsetWidth / 2;
      //求出移动的距离
      var x = smallX - sX - smallW;
      var y = smallY - sY - smallH;
      if (x < min) {
        x = min;
      } else if (x > maxX) {
        x = maxX;
      }

      if (y < min) {
        y = min;
      } else if (y > maxY) {
        y = maxY;
      }
      this.$refs.small.style.left = x + "px";
      this.$refs.small.style.top = y + "px";

      this.$refs.showImg.style.left = -x * 2 + "px";
      this.$refs.showImg.style.top = -y * 2 + "px";
    },
    //点击微信
    onClickWx() {
      this.isQrcode = true;
    },
    //点击二维码X
    onClickX() {
      this.isQrcode = false;
    },
    //点击分享朋友圈
    onClickLiTwo() {
      location.href =
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=http%3A%2F%2F49.235.93.38:8001/%2Fyczp1%2Fproducts%2F14887040.html%3Fbsh_bid%3D5602044948&pics=&title=长沙KTV&summary=长沙高级豪华KTV";
    },
    onClickLiThree() {
      location.href =
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2F49.235.93.38:8001/%2Fyczp1%2Fproducts%2F14887040.html%3Fbsh_bid%3D5602045873&title=长沙KTV&summary=长沙KTV&desc=长沙KTV";
    },
    onClickLiFour() {
      location.href =
        "https://service.weibo.com/share/share.php?appkey=583395093&title=长沙KTV&url=http%3A%2F%2F49.235.93.38:8001/%3Fbsh_bid%3D5602045914&source=bshare&retcode=0&ralateUid=#_loginLayer_1618403678981";
    },
  },
  created() {
    let id = this.$route.params.id;
    var url = "/index.php/api/models/list";
    this.$axios.get(url).then((response) => {
      if (response.status == 200 && response.statusText == "OK") {
        this.productListData = response.data;
      }
    });
    this.$axios.get("/index.php/api/models/get?id=" + id).then((response) => {
      if (response.status == 200 && response.statusText == "OK") {
        this.modelDataList = response.data;
      }
    });
  },
  mounted() {
    //初始化生成二维码
    var url = window.location.href;
    let qrcode = new QRCode("qrcode", {
      width: 150, //图像宽度
      height: 150, //图像高度
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      typeNumber: 4,
      correctLevel: QRCode.CorrectLevel.H, //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    });
    qrcode.clear(); //清除二维码
    qrcode.makeCode(url); //生成另一个新的二维码
    // this.$refs.qrcode.innerHTML = "";
  },
};
</script>


<style scoped lang="less" >
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

.el-container {
  width: 1200px;
  margin: 0 auto;
  // background-color: #fff;
}

.el-aside {
  position: relative;
  margin-right: 10px;
  box-sizing: border-box;
}

.uls-select {
  // margin-top: 17px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
}
.uls-select .uls-one {
  margin-top: 28px;
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

.show {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 32px;
  margin-bottom: 10px;
  border-bottom: 2px solid #2090ff;
  box-sizing: border-box;
}
.show img {
  width: 2px;
  height: 13px;
  margin: 0 5px;
}
.show span {
  font-size: 14px;
  font-weight: 700;
  color: #2090ff;
}

.main-left {
  position: relative;
  border: 1px solid #cccccc;
  margin-bottom: 10px;
}

.magnifyingGlass-box {
  display: flex;
  margin: 40px 5px 0;
  width: 818px;
  height: 450px;
  box-sizing: border-box;
}
.glass-left {
  position: relative;
  width: 320px;
  height: 400px;
  // border: 1px solid #3b5fcb;
}
.glass-left .coating {
  position: absolute;
  // left: 0;
  // top: 0;
  width: 150px;
  height: 150px;
  background-color: rgba(254, 204, 135, 0.5);
  z-index: 100;
}
.glass-left img {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.showImg-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 300px;
  overflow: hidden;
}
.showImg {
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 800px;
}
.showImg img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.glass-right {
  position: relative;
  margin: 0 10px;
  width: 386px;
}
.glass-right-text {
  font-size: 16px;
  font-weight: 700;
  height: 32px;
  line-height: 32px;
}
.money {
  display: flex;
  width: 100%;
  height: 38px;
  background-color: #f9f9f9;
  line-height: 38px;
  border-radius: 3px;
}
.money > span {
  display: inline-block;
  margin: 0 20px;
  font-size: 12px;
  color: #888;
  line-height: 38px;
}
.money > b {
  color: #e53a3e;
  font-size: 24px;
  line-height: 38px;
}

.share-ul {
  position: relative;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.share-ul li {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
}
.share-ul li:nth-child(1) .lis {
  width: 100%;
  height: 100%;
  background: url("http://static.bshare.cn/frame/images/logos/s4/weixin.png")
    no-repeat;
}
.qrcodeImg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode {
  position: absolute;
  left: 50px;
  top: -100px;
  width: 200px;
  height: 250px;
  background-color: #fff;
  border: 4px solid gray;
  border-radius: 5px;
  z-index: 1000;
}
.qrcode-top {
  line-height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #666;
  background-color: rgb(241, 240, 240);
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 40px;
}
.qrcode-top b {
  cursor: pointer;
}
.share-ul li:nth-child(2) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -216px;
}
.share-ul li:nth-child(2) .alist {
  width: 16px;
  height: 16px;
}
.share-ul li:nth-child(3) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -234px;
}
.share-ul li:nth-child(4) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -270px;
}
// .share-ul li:nth-child(5)  {
//   background: url(http://static.bshare.cn/frame/images/logos/s4/more-style-addthis.png)
//     no-repeat;
// }

.explain {
  border: 1px solid #1e90ff;
  margin: 0 5px;
  width: 818px;
}
.explain-top {
  width: 100%;
  height: 31px;
  background-color: #d5f1fc;
  border-bottom: 1px solid #1e90ff;
}
.explain-top ul li {
  width: 60px;
  font-size: 12px;
  padding: 0 20px;
  height: 32px;
  line-height: 31px;
  text-align: center;
  border-right: 1px solid #1e90ff;
  background-color: #fff;
}
.explain-bom {
  padding: 0 5px;
  box-sizing: border-box;
}
.explain-bom img {
  margin: 5px 0;
}

.relatedProducts {
  margin: 10px 5px 15px;
  width: 818px;
  height: 325px;
  border: 1px solid #ccc;
}
.relatedProducts-top {
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #555;
  font-weight: 700;
  text-indent: 5px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.relatedProducts-bom {
  line-height: 30px;
  text-align: center;
}
.el-carousel__item {
  background-color: rgba(240, 241, 243, 0.1);
}

.lbt-box-img {
  position: relative;
  height: 180px;
}
.lbt-box-img img {
  height: 180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lbt-box p {
  color: red;
  font-weight: 700;
}
</style>