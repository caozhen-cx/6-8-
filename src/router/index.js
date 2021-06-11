import Vue from 'vue'
import VueRouter from 'vue-router';
import store from "@/store/index.js";
import indexRouter from "@/views/index/router/indexRouter.js";
// 主页路由

import { Message } from 'element-ui';
// 引入轻提示
Vue.use(VueRouter)


// 解决重复点击链接的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [

  ...indexRouter,
  // 主页路由
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/login/Login.vue'),
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name === "Login") {
    next();
  } else {
    if (store.state.token) {
      next();
    } else {
      Message({
        message: "请先登录",
        type: "error"
      })
      next({ path: "/login" });
    }
  }

})

export default router
