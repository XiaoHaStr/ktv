import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element ui
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://49.235.93.38:82';
Vue.config.productionTip = false;

import 'github-markdown-css/github-markdown.css'

//懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')