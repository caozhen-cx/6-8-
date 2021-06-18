<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>商品管理 </template>
      <template v-slot:levelThree>商品分类 </template>
    </My-breadcrumb>
    <div class="user_list">
      <getAdd @add="getData()" />
      <Tereetable
        ref="table"
        :data="list"
        :columns="columns"
        :selectionType="false"
        :showIndex="true"
        index-text="索引"
        :expandType="false"
      >
        <!-- 排序插槽 -->
        <template slot="cat_level" scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1" type="success"
            >二级</el-tag
          >
          <el-tag v-else type="warning">三级</el-tag>
        </template>
        <!-- 排序插槽 -->
        <!-- 操作插槽 -->
        <template slot="likes" scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="edit(scope.row.cat_name, scope.row.cat_id,scope.rowIndex)"
            >编辑</el-button
          >
          <!-- 删除 -->
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确当要删除吗？"
            @confirm="del(scope.row.cat_id)"
            confirm-button-type="danger"
          >
            <el-button type="danger" size="mini" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
          <!-- 删除 -->
        </template>
        <!-- 操作插槽 -->
        <!-- 是否有效插槽 -->
        <template slot="cat_deleted" scope="scope">
          <i
            :class="{ 'el-icon-success': true, col: scope.row.cat_deleted }"
            v-if="!scope.row.cat_deleted"
          ></i>
          <i
            :class="{ 'el-icon-success': true, col: !scope.row.cat_deleted }"
            v-if="scope.row.cat_deleted"
          ></i>
        </template>
        <!-- 是否有效插槽 -->
      </Tereetable>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="parameter.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="parameter.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 分页 -->
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog title="收货地址" :visible.sync="editFlag">
      <el-form :model="formEdit">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="formEdit.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFlag = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
  </div>
</template>

<script>
import Tereetable from "vue-table-with-tree-grid";
import { getCategories, getRemove, getEdit } from "@/http/commodity/api";
import getAdd from "@/components/addCommodity/AddCategories";
export default {
  data() {
    return {
      parameter: {
        pagenum: 1,
        pagesize: 5,
      },
      // 传递的参数
      list: [],
      // 接收的参数
      total: 0,
      // 总共多少条数据
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: "400px",
        },
        {
          label: "是否有效",
          minWidth: "50px",
          type: "template",
          template: "cat_deleted",
        },
        {
          label: "排序",
          type: "template",
          template: "cat_level",
        },
        {
          label: "操作",
          minWidth: "200px",
          type: "template",
          template: "likes",
        },
      ],
      // tab表格配置
      editFlag: false,
      // 编辑模态框
      formEdit: {
        cat_name: "",
        cat_id: "",
      },
      // 编辑表单
    };
  },
  methods: {
    getData() {
      getCategories(this.parameter).then((res) => {
        this.list = res.data.result;
        this.total = res.data.total;
      });
    },
    // 获取数据
    del(id) {
      getRemove(id).then((res) => {
        this.getData();
      });
    },
    // 删除
    handleSizeChange(val) {
      this.parameter.pagesize = val;
      this.getData();
    },
    // 每页数量噶便触发
    handleCurrentChange(val) {
      this.parameter.pagenum = val;
      this.getData();
    },
    // 当前页数改变触发
    edit(val, cat_id) {
      console.log(index);
      this.formEdit = {
        cat_name: val,
        cat_id,
      };
      this.editFlag = true;
    },
    // 点击编辑
    determine() {
      getEdit(this.formEdit).then((res) => {
        console.log(res);
        this.editFlag = false;
        this.getData();
      });
    },
    // 编辑提交
  },
  mounted() {
    this.getData();
  },
  components: {
    getAdd,
    Tereetable,
  },
};
</script>

<style>
.el-icon-success {
  color: lightgreen;
}
.zk-table__cell-inner button {
  margin: 0 10px;
}
.col {
  color: red;
}
</style>