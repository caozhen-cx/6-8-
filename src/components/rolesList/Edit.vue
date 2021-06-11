<template>
  <el-dialog title="编辑角色" :visible.sync="flag" :before-close="handleClose">
    <div slot="footer" class="dialog-footer">
      <el-form
        :model="addFrom"
        ref="addFrom"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
          :rules="[{ required: true, message: '请输入角色名称' }]"
        >
          <el-input v-model="addFrom.roleName"></el-input>
        </el-form-item>
        <el-form-item
          prop="roleDesc"
          label="角色描述"
          :rules="[{ required: true, message: '请输入角色描述' }]"
        >
          <el-input v-model="addFrom.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    from: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    add() {
      this.$emit("add", this.addFrom);
    },
    // 点击确定
    handleClose() {
      this.$emit("close");
    },
  },
  data() {
    return {
      addFrom: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  watch: {
    from(val) {
      console.log(val);
      this.addFrom = val;
    },
  },
};
</script>

<style>
</style>