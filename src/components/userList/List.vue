<template>
  <div class="user_list">
    <div class="user_sosu">
      <el-input
        placeholder="请输入内容"
        v-model="text"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="dialogVisible = true"
        >添加用户</el-button
      >
    </div>

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
      <el-table-column label="电话">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <!-- 第三列 -->

      <!-- 第四列 -->
      <el-table-column label="角色">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <!-- 第四列 -->

      <!-- 第五列 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 第五列 -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row.id)"
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
          <el-button
            type="info"
            icon="el-icon-setting"
            circle
            @click="setUp(scope.row.id)"
          ></el-button>
          <!-- 设置 -->
        </template>
      </el-table-column>
      <!-- 第三列 -->
    </el-table>
    <!-- tab表格 -->

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页 -->

    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form
        ref="adduser"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        :model="addUser"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUser.mobile" type="tel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户弹框 -->
  </div>
</template>

<script>
import "@/assets/css/userlist/userlist.css";
import { getUserListDel, getAdduserList } from "@/http/userList/userListApi.js";
// 用户列表api接口

export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number,
      default: 10,
    },
    pagenum: {
      type: Number,
      default: 1,
    },
    pagesize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    edit() {},
    // 编辑
    del(id) {
      this.visible = true;
      getUserListDel(id);
      this.$emit("del", id);
    },
    // 删除
    setUp() {},
    // 设置
    handleSizeChange(val) {
      this.$emit("pagenumChange", val);
    },
    // 每页数量改变时触发
    handleCurrentChange(val) {
      this.$emit("sizeChange", val);
    },
    // 当前页数改变时触发
    handleClose(done) {
      done();
    },
    // 添加用户弹窗点击X
    add() {
      this.$refs["adduser"].validate((val) => {
        if (!val) return false;
        this.dialogVisible = false;
        getAdduserList(this.addUser).then((res) => {
          this.dialogVisible = false;
          if (res.meta.status >= 200 && res.meta.status < 300) {
            this.$emit("adduser");
          }
        });
      });
    },
    // 添加用户
  },
  data() {
    return {
      text: "",
      // 添加的内容
      dialogVisible: false,
      addUser: {
        username: "",
        password: "123456",
        email: "870455682@qq.com",
        mobile: "12345678922",
      },
      // 添加表单
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "请输入正确邮箱", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
      },
      // 添加表单验证
      visible: false,
    };
  },
};
</script>
