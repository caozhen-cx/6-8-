<template>
  <div>
    <indexHeaders />
    <div class="index_content">
      <div class="index_left">
        <indexNav />
      </div>
      <div class="index_right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import indexHeaders from "@/components/index/Headers.vue";
// 头部
import indexNav from "@/components/index/IndexNav.vue";
// 主页导航
import "@/assets/css/index/index.css";
// 主页样式

export default {
  components: {
    indexHeaders,
    indexNav,
  },
  mounted() {},
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>