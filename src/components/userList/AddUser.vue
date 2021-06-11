<template>
  <div>
    <div class="user_sosu">
      <el-input
        :placeholder="placeholder"
        v-model="text"
        class="input-with-select"
        @change="sosu"
        clearable
      >
        <el-button
          @click="sosu"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="dialogVisible = true"
        >{{btnText}}</el-button
      >
    </div>
    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      @before-close="handleClose"
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
import { getAdduserList } from "@/http/userList/userListApi.js";
// 用户列表api接口
export default {
  methods: {
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
            this.$refs["adduser"].resetFields();
            this.$emit("adduser");
          }
        });
      });
    },
    // 添加用户
    sosu() {
      this.$emit("enter",this.text);
    },
    // 搜素事件
  },
  data() {
    return {
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
      text: "",
      // 搜素内容
      dialogVisible: false,
      // 添加模态框显示隐藏
    };
  },
  props:{
    placeholder:{
      type:String,
      default:"请输入内容"
    },
    btnText:{
      type:String,
      default:"按钮"
    }
  }
};
</script>

<style>
</style>