<template>
  <div class="environment">
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

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/environment_show' }">
        <a>环境展示</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="Bigbox" ref="Bigbox">
      <!-- 商品详情 -->
      <div class="x-detail-box">
        <div class="x-detail-box-left">
          <div
            class="x-detail-box-left-img"
            ref="big"
            @mouseenter="onMouseEnter"
            @mouseleave="leave"
            @mousemove="onMouseMoveSmall($event)"
          >
            <img :src="$store.state.imagePath + appointData.image" alt />
            <div class="small-box" ref="small" v-show="isShow"></div>
          </div>
          <ul>
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
          </ul>
        </div>
        <div class="x-detail-box-right">
          <div class="show-box" v-show="isShow">
            <div class="showImg" ref="showImg">
              <img :src="$store.state.imagePath + appointData.image" alt />
            </div>
          </div>
          <b>{{ appointData.title }}</b>
          <p>暂无价格</p>
        </div>
      </div>

      <!-- 产品说明 -->
      <div class="description-of-products">
        <div class="products-top">产品说明</div>
        <div class="products-bom">
          <img :src="$store.state.imagePath + appointData.image" alt />
        </div>
      </div>
      <!-- //相关产品 -->
      <div class="related-products">
        <div class="related-top">相关产品</div>
        <div class="related-bom">
          <el-carousel :interval="40000" type="card" height="250px">
            <el-carousel-item v-for="item in dataLists" :key="item.id">
              <a href="#" @click="onClickSelect(item)">
                <div class="lbt-box">
                  <div class="lbt-box-img">
                    <img :src="$store.state.imagePath + item.image" alt />
                  </div>
                  <p>{{ item.title }}</p>
                </div>
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      isShow: false, //蒙层显示隐藏
      dataLists: [], //全部数据
      appointData: {}, //指定数据
      isQrcode: false, //二维码层
    };
  },
  methods: {
    //移入
    onMouseEnter() {
      this.isShow = true;
    },
    //移出
    leave() {
      this.isShow = false;
    },
    //移动小盒子
    onMouseMoveSmall(e) {
      //移动范围最大 最小
      var maxY = this.$refs.big.offsetHeight - this.$refs.small.offsetHeight;
      var maxX = this.$refs.big.offsetWidth - this.$refs.small.offsetWidth;
      var min = 0;
      //鼠标
      var Sx = e.pageX;
      var Sy = e.pageY;
      //小盒子的位置
      var smallY = this.$refs.Bigbox.offsetTop;
      var smallX = this.$refs.Bigbox.offsetLeft;
      //小盒子的宽高
      var smallH = this.$refs.small.offsetHeight / 2;
      var smallW = this.$refs.small.offsetWidth / 2;
      //求出移动的距离
      var x = Sx - smallX - smallW;
      var y = Sy - smallY - smallH;
      //判断小于0 就等于0   大于最大值  就等于最大值 做限制
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
      //赋值
      this.$refs.small.style.left = x + "px";
      this.$refs.small.style.top = y + "px";

      this.$refs.showImg.style.left = -x * 2 + "px";
      this.$refs.showImg.style.top = -y * 2 + "px";
    },
    //选择产地
    onClickSelect(data) {
      this.appointData = data;
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
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url=http%3A%2F%2Fwww.comektv.com%2Fyczp1%2Fproducts%2F14887040.html%3Fbsh_bid%3D5602044948&pics=&title=%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9&summary=%E6%88%90%E9%83%BD%E9%94%A6%E7%BC%98%E5%9B%BD%E9%99%85%E5%A4%9C%E6%80%BB%E4%BC%9A%E4%B8%BA%E4%BC%81%E4%B8%9A%E6%8F%90%E4%BE%9B%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E4%BB%B7%E6%A0%BC%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E5%8F%82%E6%95%B0%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.";
    },
    onClickLiThree() {
      location.href =
        "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2Fwww.comektv.com%2Fyczp1%2Fproducts%2F14887040.html%3Fbsh_bid%3D5602045873&title=%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9&pics=&summary=%E6%88%90%E9%83%BD%E9%94%A6%E7%BC%98%E5%9B%BD%E9%99%85%E5%A4%9C%E6%80%BB%E4%BC%9A%E4%B8%BA%E4%BC%81%E4%B8%9A%E6%8F%90%E4%BE%9B%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E4%BB%B7%E6%A0%BC%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E5%8F%82%E6%95%B0%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.&desc=%E6%88%90%E9%83%BD%E9%94%A6%E7%BC%98%E5%9B%BD%E9%99%85%E5%A4%9C%E6%80%BB%E4%BC%9A%E4%B8%BA%E4%BC%81%E4%B8%9A%E6%8F%90%E4%BE%9B%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E4%BB%B7%E6%A0%BC%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E5%8F%82%E6%95%B0%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.";
    },
    onClickLiFour() {
      location.href =
        "https://service.weibo.com/share/share.php?appkey=583395093&title=%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%20-%20%E6%88%90%E9%83%BD%E9%94%A6%E7%BC%98%E5%9B%BD%E9%99%85%E5%A4%9C%E6%80%BB%E4%BC%9A%E4%B8%BA%E4%BC%81%E4%B8%9A%E6%8F%90%E4%BE%9B%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E4%BB%B7%E6%A0%BC%2C%E6%88%90%E9%83%BD%E5%A4%9C%E6%80%BB%E4%BC%9A%E6%A8%A1%E7%89%B9%E5%8F%82%E6%95%B0%E7%9B%B8%E5%85%B3%E4%BF%A1%E6%81%AF.%20%20&url=http%3A%2F%2Fwww.comektv.com%2Fyczp1%2Fproducts%2F14887040.html%3Fbsh_bid%3D5602045914&source=bshare&retcode=0&ralateUid=#_loginLayer_1618403678981";
    },
  },
  //初始化
  created() {
    this.$axios.get("/index.php/api/ambient/list").then((data) => {
      if (data.data && data.status == 200) {
        this.dataLists = data.data;
      }
    });
    let id = this.$route.params.id;
    var url = "/index.php/api/ambient/get?id=" + id;
    this.$axios.get(url).then((data) => {
      if (data.data && data.status == 200) {
        this.appointData = data.data;
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


<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.environment {
  background-color: #fff;
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

// 面包屑
.el-breadcrumb {
  margin: 0 auto;
  width: 1200px;
  height: 35px;
  line-height: 35px;
  color: #9f9dff;
  background-color: #f8f8f8;
  text-indent: 10px;
  margin-bottom: 10px;
}
.el-breadcrumb__inner a,
/deep/ .el-breadcrumb__inner.is-link {
  //   color: #2090ff;
  font-weight: 400;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a {
  color: #2090ff;
  cursor: pointer;
}
/deep/.el-icon-d-arrow-right:before {
  color: #2090ff;
}

//商品详情
.Bigbox {
  margin: 0 auto;
  width: 1200px;
}
.x-detail-box {
  width: 100%;
  height: 370px;
  display: flex;
  justify-content: space-between;
}
.x-detail-box-left {
  width: 420px;
}
.x-detail-box-left-img {
  position: relative;
  width: 420px;
  height: 320px;
}
.small-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
  background-color: rgba(174, 120, 50, 0.5);
  z-index: 100;
}

.x-detail-box-left-img img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.x-detail-box-left ul {
  position: relative;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.x-detail-box-left li {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.x-detail-box-left li:nth-child(1) .lis {
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
  left: 100px;
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
.x-detail-box-left li:nth-child(2) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -216px;
}
.x-detail-box-left li:nth-child(3) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -234px;
}
.x-detail-box-left li:nth-child(4) {
  background: url("../../assets/img/top_logos_sprite.png") no-repeat 0 -270px;
}
// .x-detail-box-left li:nth-child(5) {
//   background: url(http://static.bshare.cn/frame/images/logos/s4/more-style-addthis.png)
//     no-repeat;
// }
.x-detail-box-right {
  position: relative;
  width: 770px;
}
.show-box {
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background-color: #fff;
  overflow: hidden;
}
.showImg {
  position: relative;
  left: 0;
  top: 0;
  width: 840px;
  height: 640px;
}
.showImg img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}
.x-detail-box-right b {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 18px;
}
.x-detail-box-right p {
  margin-top: 10px;
  line-height: 36px;
  background-color: #f9f9f9;
  color: #666666;
}
//产品说明
.description-of-products {
  width: 100%;
}
.products-top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 5px;
  font-size: 14px;
  color: #444;
  background-color: #f7f7f7;
  margin-bottom: 10px;
}
.products-bom {
  width: 100%;
  padding: 5px;
  border: 1px solid #f7f7f7;
  box-sizing: border-box;
}

// 相关产品
.related-products {
  width: 100%;
}
.related-top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 5px;
  font-size: 14px;
  color: #444;
  margin-bottom: 10px;
  border-bottom: 1px dashed gray;
}
.related-bom {
  width: 100%;
}
.lbt-box-img {
  position: relative;
  height: 220px;
}
.lbt-box-img img {
  height: 220px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.lbt-box p {
  text-align: center;
  line-height: 40px;
}
</style>