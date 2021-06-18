<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>订单管理 </template>
      <template v-slot:levelThree>订单列表 </template>
    </My-breadcrumb>
    <div class="user_list">
      <el-row type="flex" justify="">
        <el-col :span="6">
          <sosu @clear="clear" @sosu="sosu" />
        </el-col>
      </el-row>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="#" type="index" width="50px"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status == 0"
              >未付款</el-tag
            >
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 设置 -->
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
            ></el-button>
            <!-- 设置 -->
            <!-- 物流状态 -->
            <el-button
              size="mini"
              icon="el-icon-location"
              type="success"
              @click="kuaidi(scope.row.order_id)"
            ></el-button>
            <!-- 物流状态 -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParameter.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="listParameter.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 物流信息 -->

    <el-dialog title="物流信息" :visible.sync="dialogVisible" width="50%">
      <span>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in kuaidiData"
            :key="index"
            :timestamp="activity.time"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sosu from "@/components/orders/Sosu";
// 搜素
import { getList } from "@/http/orders/api.js";
export default {
  components: {
    sosu,
  },
  methods: {
    getData() {
      getList(this.listParameter).then((res) => {
        console.log(res.data);
        this.list = res.data.goods;
        this.total = res.data.total;
      });
    },
    // 请求数据
    handleCurrentChange(val) {
      this.listParameter.pagenum = val;
      this.getData();
    },
    // 切换页数触发
    handleSizeChange(val) {
      this.listParameter.pagenum = 1;
      this.listParameter.pagesize = val;
      this.getData();
    },
    // 切换每页数量触发
    clear() {
      this.listParameter.pagenum = 1;
      this.getData();
    },
    // 清空搜素内容
    sosu(val) {
      this.listParameter.pagenum = 1;
      this.listParameter.query = val;
      this.getData();
    },
    kuaidi(id) {
      this.$axios.get("/kuaidi/" + id).then((res) => {
        console.log(res);
        this.kuaidiData = res.data.data;
        this.dialogVisible = true;
      });
    },
  },
  data() {
    return {
      listParameter: {
        pagenum: 1,
        pagesize: 5,
        query: "",
      },
      // 接口数据
      list: [],
      // 数据
      total: 0,
      // 总页数
      kuaidiData: [],
      // 物流信息数据
      dialogVisible: false,
      // 物流信息弹窗
    };
  },
  watch: {},
  mounted() {
    this.getData();
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