<template>
  <el-select v-model="currentValue" v-bind="$attrs">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'fd-select',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(v) {
        // 通过获取的值返回
        this.$emit('input', v);
      },
    },
  },
};
</script> 
