<template>
  <el-select
    v-model="currentValue"
    v-bind="$attrs"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @visible-change="visibleChange"
    @clear="clear"
    @remove-tag="removeTag"
    :placeholder="defaultLabel"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "base-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: null,
    },
    blur: {
      type: Function,
      default: () => {},
    },
    change: {
      type: Function,
      default: () => {},
    },
    focus: {
      type: Function,
      default: () => {},
    },
    removeTag: {
      type: Function,
      default: () => {},
    },
    visibleChange: {
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
    labelValue: {
      type: [String, Number],
      default: () => "",
    },
    placeholder: {
      type: [String, Number],
      default: () => "",
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(v) {
        v = v === "" ? null : v;
        this.$emit("input", v);
      },
    },
    defaultLabel() {
      return this.placeholder ? this.placeholder : this.labelValue;
    },
  },
  methods: {
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
