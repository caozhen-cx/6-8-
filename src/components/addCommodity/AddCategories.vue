<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加分类</el-button
    >
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <!-- 表单 -->
        <el-form
          :model="paramse"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="年龄"
            prop="cat_name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input
              type="name"
              v-model="paramse.cat_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              v-model="value"
              :options="list"
              :props="props"
              @change="change"
              size="medium"
              class="cascader"
              clearable
              change-on-select
            ></el-cascader>
          </el-form-item>
        </el-form>
        <!-- 表单 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddList, getCategories } from "@/http/commodity/api";

export default {
  data() {
    return {
      dialogFormVisible: false,
      list: [],
      value: [],
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联菜单的配置属性
      paramse: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
      },
    };
  },
  methods: {
    getData() {
      getCategories({ type: 2 }).then((res) => {
        this.list = res.data;
        console.log(this.list);
      });
    },
    // 获取数据
    add() {
      this.dialogFormVisible = false;
      getAddList(this.paramse).then((res) => {
        this.paramse = {
          cat_pid: 0,
          cat_name: "",
          cat_level: 0,
        };
        this.$emit("add");
      });
    },
    // 点击添加
    change(id) {
      if (id.length > 0) {
        console.log(id);
        this.paramse.cat_pid = id[id.length - 1];
        this.paramse.cat_level = id.length;
      } else {
        this.cat_pid = 0;
        this.cat_level = 0;
      }
    },
    // 下拉菜单change事件
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.cascader {
  float: left;
}
</style>