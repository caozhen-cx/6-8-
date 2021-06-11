import Vue from 'vue'
import Vuex from 'vuex'
import name from 'vuex-persist'
// 数据持久化

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    // 登录成功token
    indexNav: "/"
  },
  mutations: {
    login(state, token) {
      state.token = token;
      state.indexNav = "/";
    },
    // 登录成功
    out(state) {
      this.state.token = "";
    },
    // 退出登录
    indexNavTab(state, path) {
      state.indexNav = "/" + path;
    }
    // 切换侧导航
  },
  actions: {
  },
  modules: {
  }, plugins: [
    new name({
      storage: window.localStorage,
    }).plugin,
  ],
})
