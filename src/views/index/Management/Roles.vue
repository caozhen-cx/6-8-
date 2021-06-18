<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>权限管理 </template>
      <template v-slot:levelThree>角色列表 </template>
    </My-breadcrumb>
    <div class="user_list">
      <addButton @add="getData" placeholder="请输入内容" btnText="添加用户" />
      <!-- 列表 -->
      <el-table
        :data="listRoles"
        style="width: 100%; margin-top: 20px"
        border
        stripe
      >
        <!-- 第一列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一行 -->

            <el-row
              class="roles_row"
              v-for="item in scope.row.children"
              :key="item.id"
            >
              <!-- 第一列 -->
              <el-col :span="5">
                <el-tag closable @close="removeRolesId(scope.row, item)">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第一列 -->

              <el-col :span="19">
                <el-row v-for="val in item.children" :key="val.id">
                  <!-- 第二列 -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      class="tog_one"
                      @close="removeRolesId(scope.row, val)"
                    >
                      {{ val.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 第二列 -->

                  <!-- 第三列 -->
                  <el-col :span="18">
                    <el-tag
                      @close="removeRolesId(scope.row, item1)"
                      class="tag_two"
                      type="warning"
                      closable
                      v-for="item1 in val.children"
                      :key="item1.id"
                    >
                      {{ item1.authName }}
                    </el-tag>
                  </el-col>
                  <!-- 第三列 -->
                </el-row>
              </el-col>
            </el-row>
            <!-- 一行  -->
          </template>
        </el-table-column>
        <!-- 第一列 -->
        <!-- 第二列 -->
        <el-table-column label="索引">
          <template slot-scope="scope"> {{ scope.$index + 1 }} </template>
        </el-table-column>
        <!-- 第二列 -->
        <!-- 第三列 -->
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <!-- 第三列 -->
        <!-- 第四列 -->
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <!-- 第四列 -->
        <!-- 第五列 -->
        <el-table-column label="操作" class="flex">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <!-- 编辑弹窗 -->
            <modify
              :flag="modifyFlag"
              @close="modifyFlag = false"
              :from="from"
              @add="determineedit"
            />
            <!-- 编辑弹窗 -->

            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确当要删除吗？"
              @confirm="del(scope.row.id)"
              confirm-button-type="danger"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>

            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="clickTree(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
        <!-- 第五列 -->
      </el-table>
      <!-- 列表 -->

      <!-- 分配权限弹框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="treeFlag"
        @closed="closed"
        @opened="opened"
      >
        <!-- 树形结构 -->
        <el-tree
          :data="treeList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
        <!-- 树形结构 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="treeFlag = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限弹框 -->

      <!-- 分页器 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 分页器 -->
    </div>
  </div>
</template>

<script>
import {
  getRole,
  getDel,
  getRoles,
  getRights,
  getModifyRole,
  getRemoveRolesId,
} from "@/http/jurisdictionList/jurisdictionApi.js";
import addButton from "@/components/rolesList/AddRole";
import modify from "@/components/rolesList/Edit";
// 添加
import myTree from "@/components/rolesList/Tree";
// 分配权限弹窗
export default {
  data() {
    return {
      list: [],
      // 数据
      currentPage: 1,
      pageSize: Object.freeze(2),
      // 每页数量
      total: 0,
      // 总页数
      modifyFlag: false,
      // 弹窗显示隐藏
      from: {
        roleName: "",
        roleDesc: "",
      },
      // 编辑的回填
      id: "",
      // 编辑id
      treeList: [],
      // 分配权限结构
      treeFlag: false,
      // 分配权限模态框
      jurisdictionId: "",
      // 权限id
      arrCheckId: [],
      // 选中权限的id
      defaultProps: {
        children: "children",
        label: "authName",
      },
      item: {},
    };
  },
  mounted() {
    this.getData();
    getRights("tree").then((res) => {
      this.treeList = res.data;
    });
  },
  methods: {
    closed() {
      this.arrCheckId = [];
      this.$refs.tree.setCheckedKeys([]);
    },
    // 关闭分配权限弹窗触发
    getData() {
      getRole().then((res) => {
        this.list = res.data;
        this.total = this.list.length;
      });
    },
    // 请求数据
    clickTree(item) {
      this.treeFlag = true;
      this.jurisdictionId = item.id;
      this.item = item;
    },
    // 点击分配权限
    opened() {
      this.arrFlat(this.item);
      this.$refs.tree.setCheckedKeys(this.arrCheckId);
    },
    // 弹框节点出现回调
    arrFlat(arr) {
      if (!arr.children) {
        return this.arrCheckId.push(arr.id);
      }
      arr.children.forEach((item) => {
        this.arrFlat(item);
      });
    },
    // 提取数组中所有id
    del(id) {
      getDel(id).then((res) => {
        this.getData();
      });
    },
    // 删除
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 页码改变
    edit(data) {
      this.modifyFlag = true;
      this.id = data.id;
      this.from = {
        roleDesc: data.roleDesc,
        roleName: data.roleName,
      };
    },
    // 点击编辑
    determineedit(val) {
      getRoles(this.id, val).then((res) => {
        this.getData();
        this.modifyFlag = false;
      });
    },
    // 确定修改
    determine() {
      let key = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ];
      let str = key.join(",");
      getModifyRole(this.jurisdictionId, { rids: str }).then((res) => {
        this.getData();
      });

      this.treeFlag = false;
    },
    // 分配权限
    async removeRolesId(row, item) {
      let flag = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {});
      // confirm是Promise对象，使用async catch不加会报错
      if (!flag) {
        return this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
      // 如果每页有返回值就提示取消

      getRemoveRolesId(row.id, item.id).then((res) => {
        row.children = res.data;
      });
      // 删除接口
    },
    // 删除权限
  },
  computed: {
    listRoles(data) {
      return data.list.slice(
        (data.currentPage - 1) * data.pageSize,
        data.currentPage * data.pageSize
      );
    },
  },
  components: {
    addButton,
    modify,
    myTree,
  },
};
</script>

<style lang="scss">
.roles_row {
  padding: 0.1rem 0;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
td > div:nth-child(n + 2) {
  margin-top: -1px;
}
.tag_two,
tog_one {
  margin: 0.06rem;
}
</style>