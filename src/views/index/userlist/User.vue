<template>
  <div>
    <breadcrumb />

    <list
      :list="list"
      :total="total"
      :pagenum="pagenum"
      :pagesize="pagesize"
      @sizeChange="sizeChange"
      @pagenumChange="pagenumChange"
      @del="del"
      @adduser="getData"
    />
  </div>
</template>

<script>
import breadcrumb from "@/components/userList/Breadcrumb.vue";
// 面包屑
import list from "@/components/userList/List.vue";
// 用户列表
import { getUsers } from "@/http/api";
// 请求数据


export default {
  mounted() {
    this.getData();
  },
  methods: {
    sizeChange(num) {
      this.pagenum = num;
      this.getData();
    },
    // 切换页数
    pagenumChange(val) {
      this.pagesize = val;
      this.getData();
    },
    // 切换每页数量
    getData() {
      getUsers({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          if (res.meta.status === 200) {
            this.list = res.data.users;
            this.total = res.data.total;
          }
        }
      );
    },
    del(id) {
      // this.list = this.list.filter((item) => {
      //   return item.id !== id;
      // });
      this.getData();
    },
    // 删除
  },
  data() {
    return {
      pagenum: 1,
      // 当前页数
      pagesize: 2,
      // 每页数量
      list: [],
      // 用户数据
      total: 0,
      // 共多少条数据
    };
  },
  components: {
    breadcrumb,
    list,
  },
};
</script>

<style>
</style>