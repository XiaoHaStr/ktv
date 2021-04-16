<template>
  <!-- 首页 -->
  <el-container>
    <!-- 侧边导航 -->
    <div class="sidebar" ref="sidebar">
      <div class="onlineList">
        <em
          class="online_close"
          id="onlineClose"
          title="关闭"
          @click="clickShow"
        ></em>
        <div
          class="online_open"
          id="onlineOpen"
          @mouseover="mouseoverShow"
          v-show="showFlag"
        ></div>
        <div
          id="online_tel_icon"
          class="online_icon"
          @click="
            phoneFlag = true;
            formFlag = false;
          "
        >
          <div class="pic"><img src="../assets/img/online_tel.png" /></div>
          <span class="name">电话直呼</span>
          <div class="pop-up contact" v-show="phoneFlag">
            <div class="arrows"></div>
            <dl>
              <dt>联系我们:</dt>
              <dd>{{ footer.phone }}</dd>
            </dl>
            <div class="shut" @click.stop="phoneFlag = false"></div>
          </div>
        </div>
        <div
          id="online_message_icon"
          class="online_icon"
          @click="
            formFlag = true;
            phoneFlag = false;
          "
        >
          <div class="pic"><img src="../assets/img/online_message.png" /></div>
          <span class="name">在线留言</span>
          <div class="pop-up pop-up-form" v-show="formFlag">
            <div class="arrows"></div>
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
              label-width="75px"
              class="leaveWordForm"
              hide-required-asterisk
            >
              <el-form-item prop="textarea">
                <el-input
                  type="textarea"
                  maxlength="50"
                  placeholder="您好，如果您对我公司产品感兴趣，请点些留言，谢谢!(限50个汉字)"
                  show-word-limit
                  v-model="form.textarea"
                ></el-input>
              </el-form-item>
              <el-form-item label="您的姓名:" prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入您的姓名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" label="您的邮箱:">
                <el-input
                  v-model="form.email"
                  placeholder="请输入您的邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="您的电话:" prop="phone">
                <el-input
                  type="phone"
                  v-model.number="form.phone"
                  autocomplete="off"
                  placeholder="请输入您的电话"
                ></el-input>
              </el-form-item>
              <el-button
                type="primary"
                :disabled="buttonFlag"
                @click="onSubmit('form')"
                >提交</el-button
              >
            </el-form>
            <div class="shut" @click.stop="formFlag = false"></div>
          </div>
        </div>
        <div id="online_email_icon" class="online_icon">
          <div class="pic">
            <a href="mailto:260208989@qq.com"
              ><img src="../assets/img/online_email.png"
            /></a>
          </div>
          <span class="name">发送邮件</span>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div
      class="backTop_Z"
      id="backTop"
      @click="backTop"
      v-show="backTopFlag"
    ></div>
    <!-- 头部 -->
    <header>
      <div class="header-box w1200">
        <el-row>
          <el-col :span="5">
            <img
              class="logo"
              src="../assets/img/20771839_1609920594.png"
              alt=""
            />
          </el-col>
          <el-col :span="19">
            <el-menu
              mode="horizontal"
              class="nav"
              active-text-color="#409EFF"
              text-color="#333"
              :router="true"
              :default-active="route"
            >
              <el-menu-item index="/index">首页</el-menu-item>
              <el-menu-item index="/about_us">关于我们</el-menu-item>
              <el-menu-item index="/model_shows">模特展示</el-menu-item>
              <el-menu-item index="/environment_show">环境展示</el-menu-item>
              <el-menu-item index="/evening_news">夜场新闻</el-menu-item>
              <el-menu-item index="/contact_us">联系我们</el-menu-item>
              <el-menu-item index="/recruitment_requirements"
                >招聘要求</el-menu-item
              >
              <el-menu-item class="li-tel"
                ><img src="../assets/img/7877635_1538278040.png" alt="" />
                <span>{{ footer.phone }} </span>
              </el-menu-item>
              <div class="line"></div>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </header>
    <!-- 身体 -->
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- 尾部 -->
    <el-footer height="auto">
      <div class="footer_main w1200">
        <div class="footer_main_r">
          <h2 style="font-family: 微软雅黑" class="ev-text-title-2">
            {{ footer.title }}
          </h2>
          <div class="footer_greeting">
            <p>
              {{ footer.describe }}
            </p>
          </div>
          <div class="footer_msg">
            <p>咨询电话：{{ footer.phone }}</p>
            <p>公司地址：{{ footer.address }}</p>
          </div>
        </div>
        <div class="footer_main_l">
          <div class="ev-pic">
            <img :src="$store.state.imagePath + footer.image" alt="" />
          </div>
          <p>关注加好友更优惠</p>
        </div>
      </div>
      <div class="footer_copy w1200">
        <p>
          {{ footer.record }}
        </p>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      route: "",
      backTopFlag: false,
      showFlag: true,
      form: {
        textarea: "",
        name: "",
        email: "",
        phone: "",
      },
      rules: {
        textarea: [{ required: true, message: "请填写留言", trigger: "blur" }],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, message: "长度在2个字符以上", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
      phoneFlag: false,
      formFlag: false,
      footer: [],
      buttonFlag: false,
    };
  },
  created: function () {
    this.route = location.hash.substring(1);
    this.$axios.get("/index.php/api/footer/get").then((res) => {
      if (res.status == 200 && res.statusText == "OK") {
        this.footer = res.data;
        this.$store.state.bannerCode = res.data;
      }
    });
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
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
  },
  watch: {
    // 监听路由改变
    $route: "getPath",
  },
  methods: {
    onSubmit(formName) {
      // 提交留言
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.buttonFlag = true;
          this.$axios
            .get(
              "http://49.235.93.38:82/index.php/api/leaving_message/add?name=" +
                this.form.name +
                "&email=" +
                this.form.email +
                "&phone=" +
                this.form +
                "&content=" +
                this.form.textarea
            )
            .then((res) => {
              if (res.status == 200 && res.statusText == "OK") {
                this.$confirm(res.data.msg, "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  callback: () => {
                    this.buttonFlag = false;
                    this.formFlag = false;
                    this.form = {
                      textarea: "",
                      name: "",
                      email: "",
                      phone: "",
                    };
                  },
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    getScroll() {
      // 回到顶部按钮是否显示
      var winTop = document.documentElement.scrollTop;
      if (winTop > 150) {
        this.backTopFlag = true;
      } else {
        this.backTopFlag = false;
      }
    },
    getPath() {
      let id = this.$route.params.id;
      // 路由改变导航栏高亮显示跟随改变
      switch (this.$route.path) {
        case "/index":
          this.route = this.$route.path;
          break;
        case "/about_us":
          this.route = this.$route.path;
          break;
        case "/model_shows":
          this.route = this.$route.path;
          break;
        case "/model/" + id:
          this.route = "/model_shows";
          break;
        case "/environment_show":
          this.route = this.$route.path;
          break;
        case "/evening_news":
          this.route = this.$route.path;
          break;
        case "/chengdu_evening/" + id:
          this.route = "/evening_news";
          break;
        case "/contact_us":
          this.route = this.$route.path;
          break;
        case "/recruitment_requirements":
          this.route = this.$route.path;
          break;
      }
    },
    backTop() {
      // 回到顶部
      var timer = setInterval(function () {
        var x = document.body.scrollTop || document.documentElement.scrollTop;
        var juli = (0 - x) / 8;
        juli = juli > 0 ? Math.ceil(juli) : Math.floor(juli);
        if (x <= 0) {
          clearInterval(timer);
        } else {
          window.scroll(0, x + juli);
        }
      }, 10);
    },
    mouseoverShow() {
      // 侧边栏移入显示
      this.showFlag = false;
      this.$refs.sidebar.style.right = 0;
    },

    clickShow() {
      // 侧边栏点击隐藏
      this.$refs.sidebar.style.right = "-100px";
      this.showFlag = true;
      this.phoneFlag = false;
      this.formFlag = false;
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/common.css";
</style>