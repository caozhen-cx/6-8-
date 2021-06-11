<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>商品管理 </template>
      <template v-slot:levelThree>商品列表 </template>
    </My-breadcrumb>
    <div class="user_list">
      <AddGoods />
      <!-- 添加 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column label="" type="index"> </el-table-column>
        <el-table-column label="商品名称" width="400px" prop="goods_name">
        </el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price">
        </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight">
        </el-table-column>
        <el-table-column label="商品数量" prop="goods_number">
        </el-table-column>
        <el-table-column label="创建时间" width="300px">
          <template slot-scope="scope">
            {{ scope.row.add_time | timeFilter }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import AddGoods from "@/components/addCommodity/Add.vue";
import { getList } from "@/http/commodity/api.js";

export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      list: [],
      pagenum: 1,
      //当前页码
      pagesize: 5,
      // 每页显示条数
    };
  },
  components: {
    AddGoods,
  },
  methods: {
    getData() {
      getList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          console.log(res.data.goods);
          this.list = res.data.goods;
        }
      );
    },
    // 请求数据
    del(){

    },
    // 删除
  },
  filters: {
    timeFilter(val) {
      let time = new Date(val);
      let getFullYear = time.getFullYear();
      // 年
      let getMonth = time.getMonth() + 1;
      // 月
      if (getMonth < 10) getMonth = "0" + getMonth;

      let getDate = time.getDate();
      // 日
      let getHours = time.getHours();
      // 时
      getHours = getHours < 10 ? "0" + getHours : getHours;
      let getMinutes = time.getMinutes();
      // 分
      getMinutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;
      let getSeconds = time.getSeconds();
      getSeconds = getSeconds < 10 ? "0" + getSeconds : getSeconds;
      // 秒
      return (
        getFullYear +
        "-" +
        getMonth +
        "-" +
        getDate +
        " " +
        getHours +
        ":" +
        getMinutes +
        ":" +
        getSeconds
      );
    },
  },
};
</script>

<style>
</style>