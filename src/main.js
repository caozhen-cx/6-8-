import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/js/app";
// rem适配
import "./plugins/element"
// 按需引入element
import 'element-ui/lib/theme-chalk/index.css';
// 引入element 样式
import './assets/css/index.css';
// 基本样式
import "./assets/css/icon/fonts/iconfont.css";
// 字体图标
Vue.config.productionTip = false
import MyBreadcrumb from "@/components/userList/Breadcrumb.vue";
Vue.component("MyBreadcrumb",MyBreadcrumb)
// 面包屑
import "@/assets/css/userlist/userlist.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
