<template>
  <el-input
    v-bind="$attrs"
    :placeholder="defaultLabel"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @clear="clear"
  >
  </el-input>
</template>

<script>
export default {
  name: "my-input",
  props: {
    blur: {
      type: Function,
      default: () => {},
    },
    focus: {
      type: Function,
      default: () => {},
    },
    change: {
      type: Function,
      default: () => {},
    },
    input: {
      type: Function,
      default: () => {},
    },
    clear: {
      type: Function,
      default: () => {},
    },
    form: {
      type: Object,
      default: () => {},
    },
    keyValue: {
      type: [String, Number],
      default: () => "",
    },
    placeholder: {
      type: [String, Number],
      default: () => "",
    },
    labelValue: {
      type: [String, Number],
      default: () => "",
    },
  },
  computed: {
    defaultLabel() {
      return this.placeholder ? this.placeholder : this.labelValue;
    },
  },
  methods: {
    handleInput(val) {
      val = val === "" ? null : val;
      this.$emit("input", val);
      this.input(val);
    },
    handleBlur(e) {
      this.blur(e, this.form, this.keyValue);
    },
    handleFocus(e) {
      this.focus(e, this.form, this.keyValue);
    },
    handleChange(val) {
      this.change(val, this.form, this.keyValue);
    },
  },
};
</script>
<style lang="less" scoped></style>
