<template>
  <div>
    <div class="user_sosu">
      <el-input placeholder="请输入内容" class="input-with-select" v-model="text">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="$router.push({path:'/goods/add'})"
        >添加商品</el-button
      >
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {

      text:"",
      // 搜素内容
    };
  },
  methods: {

  },
};
</script>

<style>
</style>