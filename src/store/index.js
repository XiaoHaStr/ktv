import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imagePath: '//49.235.93.38:82', // 图片域名
    modelData: [], // 模特信息
    bannerData: [],
    bannerCode: [],
    bannerFlag: false,
  },
  mutations: {},
  actions: {},
  modules: {}
})