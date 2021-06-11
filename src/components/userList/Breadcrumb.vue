<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="levelTwo"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="levelThree"></slot></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style>
.breadcrumb {
  margin-bottom: 0.2rem;
}
</style>