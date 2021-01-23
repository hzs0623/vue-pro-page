<template>
  <div class="pro-checkbox-comp">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <div style="margin: 15px 0"></div>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox v-for="item in lists" :key="item" :label="item">{{
        item
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "pro-checkbox",
  props: {
    // 配置项
    tableConfig: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    lists() {
      const arr = this.tableConfig.map((item) => item.title);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.checkedCities = arr;
      return arr;
    },
  },
  data() {
    return {
      checkAll: true,
      checkedCities: [],
      isIndeterminate: false,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.lists : [];
      this.$emit("check", this.checkedCities);
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(val) {
      const len = val.length;
      this.checkAll = len === this.lists.length;
      this.isIndeterminate = len > 0 && len < this.lists.length;
      this.$emit("check", val);
    },
  },
};
</script> 
<style lang='less' scoped>
.pro-checkbox-comp {
  padding-bottom: 30px;
}
</style>
