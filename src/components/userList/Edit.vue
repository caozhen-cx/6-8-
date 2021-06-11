<template>
  <!-- 编辑弹框 -->
  <div>
    <!-- 编辑用户弹框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editFlag"
      width="30%"
      @before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form
        ref="adduser"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        :model="EditUser"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="EditUser.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="EditUser.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="EditUser.mobile" type="tel"></el-input>
        </el-form-item>
      </el-form>
      <!-- 表单 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('out')">取 消</el-button>
        <el-button type="primary" @click="add">修改</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹框 -->
  </div>
</template>

<script>
import { getEdit } from "@/http/userList/userListApi.js";
export default {
  props: {
    editFlag: {
      type: Boolean,
      default: false,
    },
    val: {
      default: {},
    },
  },
  // 模态框显示隐藏
  data() {
    return {
      EditUser: {
        username: "",
        email: "",
        mobile: "",
      },

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
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "请输入正确邮箱", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
      },
      // 校验
    };
  },
  methods: {
    add() {
      getEdit(this.val.id, this.EditUser).then((res) => {
        this.$emit("editChange");
      });
    },
    // 修改
    handleClose() {
      this.$emit("out");
    },
    // 关闭弹窗
  },
  watch: {
    val(val) {
      this.EditUser = {
        username: val.username,
        email: val.email,
        mobile: val.mobile,
      };
    },
  },
};
</script>

<style>
</style>