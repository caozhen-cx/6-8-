import Vue from 'vue'
import Vuex from 'vuex'
import name from 'vuex-persist'
// 数据持久化

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    // 登录成功token
  },
  mutations: {
    login(state, token) {
      state.token = token;

    },
    // 登录成功
    out(state){
      this.state.token  = "";
    },
    // 退出登录
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
