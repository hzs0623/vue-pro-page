<template>
  <el-menu default-active="1" @select="onSelect">
    <el-menu-item index="1">
      <i class="el-icon-location"></i>
      <span slot="title">Form表单</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">Table列表</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">基本配置</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">插槽使用</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "aside-comp",
  data() {
    return {};
  },
  methods: {
    onSelect(index) {
      const map = {
        1: "Form",
        2: "Table",
        3: "Main", // 基本配置
        4: "SlotPage", // 插槽使用
      };
      this.$emit("select", map[index]);
    },
  },
};
</script>
