<template>
  <!-- 环境展示 -->
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
          <li
            @click="onClickList(item.id)"
            v-for="item in dataList"
            :key="item.id"
          >
            <img :src="$store.state.imagePath + item.image" alt="" />
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 环境展示 end -->

    <!-- 翻页部分 start -->
    <div class="l-paging">
      <el-button disabled class="bled">共有{{ pageSizeSum }}页</el-button>
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
    <!-- 翻页部分 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      pageNumber: 1,
      pageSize: 4,
      pageSum: null,
      pageSizeSum: null,
      firstDisabled: true,
      lastDisabled: false,
      currentPage: null,
    };
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
      this.$axios
        .get(
          "/index.php/api/ambient/list?pageNumber=" +
            val +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          this.dataList = res.data;
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
    onClickList(id) {
      this.$router.push("ktvenvironmentShowList/" + id);
    },
  },
  //初始化
  created() {
    var url = "http://49.235.93.38:82/index.php/api/ambient/list";
    this.$axios.get(url).then((res) => {
      if (res.data && res.status == 200) {
        this.pageSum = res.data.length;
        this.pageSizeSum = Math.ceil(this.pageSum / this.pageSize);
        this.handleCurrentChange(1);
        if (this.pageSizeSum == 1) {
          this.lastDisabled = true;
        } else {
          this.lastDisabled = false;
        }
      }
    });
  },
};
</script>

<style scoped src="@/assets/css/environment_show.css">
</style>

<style scoped>
.l-paging {
  display: flex;
  margin: 11px 0;
  justify-content: center;
  align-items: center;
}
.l-paging .bled {
  width: 55px;
  height: 22px;
  font-size: 12px;
  border-radius: 0;
  padding: 0;
  margin: 2px 7px 0 0;
  border: 1px solid rgb(170, 170, 170);
  color: rgb(192, 196, 204);
}

.l-paging .rih {
  margin-right: 10px;
}

.l-paging .el-button--primary:hover {
  color: #fff;
  border: 1px solid rgb(64, 158, 255);
}
.el-button--primary {
  width: 55px;
  height: 22px;
  font-size: 12px;
  border-radius: 0;
  padding: 0;
  margin: 2px;
  border: 1px solid rgb(170, 170, 170);
  color: rgb(105, 105, 105);
}
.el-pagination--small .el-pager li:last-child,
.l-paging .el-pager .number {
  border: 1px solid rgb(170, 170, 170);
}
.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover,
.el-pagination.is-background.el-pagination--small .el-pager li:hover {
  background-color: rgb(64, 158, 255);
  color: #fff;
  border: 1px solid rgb(64, 158, 255);
}

.el-pagination .btn-prev,
.el-pagination .btn-next {
  border: 1px solid rgb(170, 170, 170);
}
.el-pagination .btn-next span,
.el-pagination .btn-prev span {
  font-size: 12px;
  padding: 0 6px;
}
</style>