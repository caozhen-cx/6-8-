<template>
  <div class="index_headers">
    电商后台管理系统
    <el-button type="info" @click="out">退出</el-button>
  </div>
</template>

<script>
import { Message } from "element-ui";
import "@/assets/css/index/indexHead.css";
export default {
  methods: {
    out() {
      this.$store.commit("out");
      this.$router.push("/login");
      Message({
        message: "退出成功",
        type: "success",
      });
    },
  },
};
</script>