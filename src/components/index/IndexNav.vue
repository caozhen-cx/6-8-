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
      unique-opened
      :default-active="$store.state.indexNav"
    >
       <el-submenu
        :index="'/' + item.path"
        v-for="(item, index) in list"
        :key="item.id"
      >
                <template slot="title">
                    <i :class="['iconfont', navIcon[index]]"></i>
                    <span>{{ item.authName }}</span>         </template
        >
                <el-menu-item-group>
                    <el-menu-item
            :index="'/' + val.path"
            v-for="val in item.children"
            :key="val.id"
          >
                        <template slot="title">
                            <i class="el-icon-menu"></i>               <span>{{
                val.authName
              }}</span>
                          </template
            >
                      </el-menu-item
          >
                  </el-menu-item-group
        >
              </el-submenu
      >
    </el-menu>
  </div>
</template>

<script>
import { getNav } from "@/http/api";
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      // 导航数据
      navIcon: [
        "icon-user",
        "icon-tijikongjian",
        "icon-shangpin",
        "icon-danju",
        "icon-baobiao",
      ],
    };
  },
  mounted() {
    getNav().then((res) => {
        this.list = res.data ;
    });
  },
  methods: {
    tab(path) {
      // this.$store.commit("indexNavTab", path);
    },
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