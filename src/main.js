import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/js/app";
// rem适配
import "./plugins/element"
// 按需引入element

import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器


import './assets/css/index.css';
// 基本样式
import "./assets/css/icon/fonts/iconfont.css";
// 字体图标
Vue.config.productionTip = false
import MyBreadcrumb from "@/components/userList/Breadcrumb.vue";
Vue.component("MyBreadcrumb", MyBreadcrumb)
// 面包屑
import "@/assets/css/userlist/userlist.css";

import axios from "axios";

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";

axios.interceptors.request.use(config => {
  config.headers.Authorization = store.state.token;
  return config;
});

Vue.prototype.$axios = axios;


// Vue.prototype.$axios = axios;

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)
// 注册富文本编辑器
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
