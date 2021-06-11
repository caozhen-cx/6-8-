<template>
  <el-dialog title="分配权限" :visible.sync="flag" :before-close="cancel">
    <!-- 树形结构 -->
    <el-tree
      :data="treeList"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      :default-checked-keys="arrCheckId"
    >
    </el-tree>
    <!-- 树形结构 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    treeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    flag: {
      type: Boolean,
      default: false,
    },
    arrCheckId: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    // 隐藏模态框
    add() {
      // console.log(this.$refs.tree.getCheckedNodes());
      this.$emit("modify", this.$refs.tree.getCheckedKeys());
    },
    // 点击确定
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "authName",
      },
    };
  },
};
</script>

<style>
</style>
