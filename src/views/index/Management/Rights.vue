<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>权限管理 </template>
      <template v-slot:levelThree>权限列表 </template>
    </My-breadcrumb>
    <div class="rights">
      <el-table :data="list" style="width: 100%" border>
        <el-table-column label="#" width="50px">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="address" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.level == 2">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getRights } from "@/http/jurisdictionList/jurisdictionApi";
export default {
  data() {
    return {
      list: [],
      // 数据
    };
  },
  methods: {
    getData() {
      getRights("list").then((res) => {
        this.list = res.data;
        console.log(res.data);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss">
.rights {
  padding: 0.2rem;
  background: #fff;
}
</style>