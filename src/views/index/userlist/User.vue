<template>
  <div>
    <My-breadcrumb>
      <template v-slot:levelTwo>用户管理 </template>
      <template v-slot:levelThree>用户列表 </template>
    </My-breadcrumb>
    <div class="user_list">
      <addUsers
        @adduser="getData"
        placeholder="请输入内容"
        btnText="添加用户"
        @enter="sosu"
      >
      </addUsers>
      <!-- tab表格 -->
      <el-table :data="list" style="width: 100%" border>
        <!-- 第一列 -->
        <el-table-column label="#" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!-- 第一列 -->
        <!-- 第二列 -->
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <!-- 第二列 -->

        <!-- 第三列 -->
        <el-table-column label="邮箱">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <!-- 第三列 -->
        <!-- 第四列 -->
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <!-- 第四列 -->

        <!-- 第五列 -->
        <el-table-column label="角色">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
          </template>
        </el-table-column>
        <!-- 第五列 -->

        <!-- 第六列 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- 第六列 -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(scope.row)"
            ></el-button>
            <!-- 修改 -->

            <!-- 删除 -->

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
                icon="el-icon-delete"
                circle
                slot="reference"
              ></el-button>
            </el-popconfirm>

            <!-- 删除 -->

            <!-- 设置 -->

            <el-tooltip
              class="item"
              effect="dark"
              content="角色分配"
              placement="right"
            >
              <el-button
                type="info"
                icon="el-icon-setting"
                circle
                @click="setUp(scope.row)"
              ></el-button>
            </el-tooltip>

            <!-- 设置 -->
          </template>
        </el-table-column>
      </el-table>
      <!-- tab表格 -->

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 分页 -->
    <!-- 编辑弹框 -->
    <myEdit
      :editFlag="editFlag"
      @out="out"
      :val="item"
      @editChange="editChange"
    />
    <!-- 编辑弹框 -->

    <!-- 修改模态框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="role"
      width="50%"
      @before-close="handleClose"
    >
      <!-- 内容 -->
      <el-form
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="年龄" prop="age">{{ roleUsername }} </el-form-item>
        <el-form-item label="当前角色" prop="age">{{ myRole }} </el-form-item>
        <el-form-item label="分配角色">
          <el-select v-model="roleArr" placeholder="请选择文章标签">
            <el-option
              v-for="item in RoleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 内容 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="role = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改模态框 -->
  </div>
</template>

<script>
import { getUsers } from "@/http/api";
// 请求数据
import addUsers from "@/components/userList/AddUser.vue";
// 搜素根添加
import {
  getUserListDel,
  getState,
  getModifyRole,
} from "@/http/userList/userListApi.js";
// 用户列表api接口
import myEdit from "@/components/userList/Edit.vue";
// 编辑弹框
import { getRole } from "@/http/jurisdictionList/jurisdictionApi.js";
// 角色列表
export default {
  mounted() {
    this.getData();
    getRole().then((res) => {
      this.RoleList = res.data;
    });
  },
  methods: {
    handleCurrentChange(num) {
      this.pagenum = num;
      this.getData();
    },
    // 切换页数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getData();
    },
    // 切换每页数量
    getData() {
      getUsers({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.text,
      }).then((res) => {
        if (res.meta.status === 200) {
          this.list = res.data.users;
          this.total = res.data.total;
        }
      });
    },
    // 请求数据
    del(id) {
      this.visible = true;
      getUserListDel(id).then(() => {
        this.getData();
      });
    },
    // 删除
    edit(item) {
      this.item = item;
      this.editFlag = true;
    },
    // 编辑
    setUp(item) {
      this.roleId = item.id;
      this.role = true;
      this.roleUsername = item.username;
      this.myRole = item.role_name;
    },
    // 设置
    sosu(text) {
      this.text = text;
    },
    // 搜素
    change(id, flag) {
      getState({ uid: id, flag: flag });
    },
    // 用户状态
    out() {
      this.editFlag = false;
    },
    editChange() {
      this.editFlag = false;
      this.getData();
    },
    // 修改成功
    handleClose(done) {
      done();
    },
    // 关闭分配教学模态框
    addRole() {
      getModifyRole(this.roleId, this.roleArr).then((res) => {
        this.role = false;
        this.getData();
      });
    },
    // 确定分配角色
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
      visible: false,
      editFlag: false,
      // 编辑模态框
      item: {},
      role: false,
      // 分配角色模态框
      roleUsername: "",
      // 角色名称
      myRole: "",
      // 角色职位
      roleArr: "",
      RoleList: [],
      // 角色列表
      roleUid: 0,
      text: "",
    };
  },
  components: {
    addUsers,
    myEdit,
  },
  watch: {
    text(val) {
      this.pagenum = 1;
      this.getData();
    },
  },
};
</script>

<style>
</style>