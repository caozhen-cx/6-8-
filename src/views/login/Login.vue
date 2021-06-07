<template>
  <div class="login_wrap">
    <div class="login_from">
      <div class="username">
        <div class="img">
          <img src="@/assets/logo.png" alt="" />
        </div>
        <el-form
          :model="loginUser"
          ref="loginUser"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
            :rules="[{ required: true, message: '用户名' }]"
          >
            <el-input
              v-model="loginUser.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
          >
            <el-input
              v-model="loginUser.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="login">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/http/api.js";
import "@/assets/css/login/login.min.css";
export default {
  methods: {
    login() {
      this.$refs["loginUser"].validate((val) => {
        if (!val) return false;
        // 用户和密码不能为空
        getLogin( this.loginUser ).then(
          (res) => {
            if (res.meta.status === 200) {
              // 登录成功状态码
              this.$store.commit("login", res.data.token);
              this.reset();
              this.$router.push("/");
            }
          }
        );
      });
    },
    // 登录
    reset() {
      this.loginUser.username = "";
      this.loginUser.password = "";
    },
    // 重置
  },
  data() {
    return {
      loginUser: {
        username: "",
        password: "",
      },
    };
  },
};
</script>