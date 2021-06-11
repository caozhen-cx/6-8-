<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加角色</el-button
    >
    <!-- 添加模态框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="roleForm" ref="ruleForm" label-width="100px">
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]"
        >
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleDesc"
          :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]"
        >
          <el-input v-model="roleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
  </div>
</template>

<script>
import { getAddRole } from "@/http/jurisdictionList/jurisdictionApi.js";

export default {
  methods: {
    addRoles() {
      this.$refs["ruleForm"].validate((val) => {
        if (!val) return false;
        getAddRole(this.roleForm).then((res) => {
          this.$emit("add");
          this.dialogFormVisible = false
          this.$refs["ruleForm"].resetFields();
          //   清空表单
        });
      });
    },
    // 添加角色
  },
  data() {
    return {
      dialogFormVisible: false,
      roleForm: {
        roleName: "",
        roledescription: "",
      },
    };
  },
};
</script>

<style>
</style>