<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user_list">
      <el-alert
        title="消息提示的文案"
        type="info"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :active="+index"
        finish-status="success"
        class="steps"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
      >
        <!-- 步骤条 -->

        <el-tabs tab-position="left" v-model="index" :before-leave="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="formLabelAlign.goods_name" />
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="formLabelAlign.goods_price" />
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="formLabelAlign.goods_weight" />
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="formLabelAlign.goods_number" />
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader
                v-model="formLabelAlign.goods_cat"
                :options="list"
                :props="props"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in cascaderData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  v-for="(val, i) in item.attr_vals"
                  :key="i"
                  :label="val"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="(item, index) in attributesData"
              :key="index"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- 上传图片缩略图 -->
            <el-upload
              class="upload-demo"
              action="https://www.liulongbin.top:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headers"
              :on-success="onSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <!-- 上传图片缩略图 -->
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
              v-model="formLabelAlign.goods_introduce"
            ></quill-editor>
            <el-button type="primary" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>

    <!-- 图片放大 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <span>
        <img :src="imgUrl" alt="" />
      </span>
    </el-dialog>
    <!-- 图片放大 -->
  </div>
</template>

<script>
import { getCategories, getAttributes, getAdd } from "@/http/commodity/api";
export default {
  data() {
    return {
      index: 0,
      formLabelAlign: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
        // 级联选择器选择id
        pics: [],
        // 上传的图片
        goods_introduce: "",
        // 富文本的内容
      },
      // 餐参数
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
      },
      // 表单的校验规则
      props: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择器选择配置
      list: [],
      // 级联选择器选择数据
      cascaderId: "",
      // 商品参数id
      cascaderData: [],
      // 商品参数数据
      headers: {
        Authorization: this.$store.state.token,
      },
      // 设置上传图片的请求头
      dialogVisible: false,
      imgUrl: "",
      attributesData: [],
      // 商品属性数据
    };
  },
  methods: {
    handleChange(val) {
      if (val.length !== 3) {
        this.formLabelAlign.goods_cat = [];
        return false;
      }
      this.cascaderId = val[2];
    },
    // 级联选择器选择触发
    getData() {
      getCategories().then((res) => {
        this.list = res.data;
      });
    },
    tabClick(to, from) {
      if (from == 0 && this.formLabelAlign.goods_cat.length != 3) {
        return false;
      } else if (to == 1) {
        getAttributes(this.cascaderId, "many").then((res) => {
          res.data.forEach((item) => {
            item.attr_vals = item.attr_vals.split(" ");
          });
          this.cascaderData = res.data;
        });
      } else if (to == 2) {
        getAttributes(this.cascaderId, "only").then((res) => {
          console.log(res.data);
          this.attributesData = res.data;
        });
      }
    },
    // 点击tabs切换触发
    handleRemove(val) {
      let url = val.response.data.tmp_path;
      let index = this.formLabelAlign.pics.findIndex((item) => {
        return item.pic === url;
      });
      this.formLabelAlign.pics.splice(index, 1);
    },
    // 点击图片删除
    handlePreview(val) {
      this.imgUrl = val.response.data.url;
      this.dialogVisible = true;
    },
    // 图片放大
    onSuccess(res) {
      this.formLabelAlign.pics.push({
        pic: res.data.tmp_path,
      });
    },
    // 图片上传成功
    add() {
      this.formLabelAlign.goods_cat = this.formLabelAlign.goods_cat.join(",");
      getAdd(this.formLabelAlign).then((res) => {
        console.log(res);
        this.index = "5";
      });
    },
    // 添加商品
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.steps {
  margin: 20px 0 0 0;
}
.ql-editor {
  height: 300px;
}
</style>