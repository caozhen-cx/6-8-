<template>
  <div>
    <div class="nav_top" @click="isCollapse = !isCollapse">|||</div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <!-- 用户管理 -->
      <el-submenu index="/">
        <template slot="title">
          <i class="iconfont icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 用户管理 -->

      <!-- 权限管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-tijikongjian"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 权限管理 -->

      <!-- 商品管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 商品管理 -->

      <!-- 订单管理 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-danju"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 订单管理 -->

      <!-- 数据统计 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-baobiao"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 数据统计 -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style>
.nav_top {
  width: 100%;
  height: 0.4rem;
  background: #475165;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>