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
</style>