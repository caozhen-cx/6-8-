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
        <el-table-column label="商品名称" width="200px" prop="goods_name">
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

        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>

            <!-- 删除 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确当要删除吗？"
              @confirm="del(scope.row.goods_id)"
              confirm-button-type="danger"
            >
              <el-button type="danger" size="mini" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>

            <!-- 删除 -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AddGoods from "@/components/addCommodity/Add.vue";
import { getList, getDel } from "@/http/commodity/api.js";

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
      total: 0,
      // 共多少条数据
    };
  },
  components: {
    AddGoods,
  },
  methods: {
    getData() {
      getList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          console.log(res.data);
          this.total = res.data.total;
          this.list = res.data.goods;
        }
      );
    },
    // 请求数据
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getData();
    },
    // 切换页数触发
    handleSizeChange(val) {
      console.log(val);
      this.pagesize = val;
      this.getData();
    },
    // 切换每页数量触发
    del(id) {
      console.log(id);
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
    // 时间过滤器
  },
};
</script>

<style>
</style>