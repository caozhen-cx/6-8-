<template>
  <div>
    <el-input
      clearable
      placeholder="请输入内容"
      v-model="text"
      class="input-with-select"
      @change="$emit('sosu', text)"
      @clear="clear"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="$emit('sosu', text)"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    clear() {
      this.$emit("clear");
    },
  },
};
</script>

<style>
</style>