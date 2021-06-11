<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>商品管理 </template>
      <template v-slot:levelThree>商品分类 </template>
    </My-breadcrumb>
    <div class="user_list">
      <el-button type="primary">添加分类</el-button>
      <el-table :data="list" style="width: 100%">
        <el-table-column label="索引" type="index" width="70px" />
        <el-table-column label="分类名称" width="400px" prop="cat_name" />
        <el-table-column label="是否有效" prop="goods_name">
          <template slot-scope="scope"> 
              <i class="el-icon-success" v-if="!scope.row.cat_deleted"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="goods_name">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0"> 一级 </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCategories } from "@/http/commodity/api";
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 5,
      list: [],
      total: 0,
    };
  },
  methods: {
    getData() {
      getCategories({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          this.list = res.data.result;
          this.total = res.data.total;
        }
      );
    },
    // 获取数据
    del(id) {
    },
    // 删除
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.el-icon-success {
    color: lightgreen;
}
</style>