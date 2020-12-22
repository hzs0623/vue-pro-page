<template>
  <el-form ref="form" :model="formData" v-bind="$attrs">
    <el-form-item
      v-for="item in getItem"
      :key="item.key"
      :rules="item._rule"
      :prop="item.key"
      :label="item.title"
    >
      <component
        :is="item.type"
        v-model="formData[item.key]"
        v-bind="item.props"
        :options="item.options"
      ></component>
    </el-form-item>

    <el-form-item v-if="hasControl">
      <el-button type="primary" @click="onSearch" icon="el-icon-search">{{
        sumbitText
      }}</el-button>
      <el-button @click="onReset" icon="el-icon-refresh">{{
        resetText
      }}</el-button>
    </el-form-item>
    <slot name="form" :form="formData" />
  </el-form>
</template>

<script>
import { getElementItem } from "../../utils";
import FdSelect from "@/components/base-components/Fd-select";
import BaseDate from "@/components/base-components/Base-date";

export default {
  name: "fd-form",
  components: {
    FdSelect,
    BaseDate,
  },
  props: {
    form: {
      type: Array,
      default: () => [],
    },
    // inline: {
    //   type: Boolean,
    //   default: true,
    // },
    hasControl: {
      type: Boolean,
      default: true,
    },
    resetText: {
      type: String,
      default: "重置",
    },
    sumbitText: {
      type: String,
      default: "搜索",
    },
  },
  computed: {
    getItem() {
      return this.form.map((v) => getElementItem(v, this.formData));
    },
  },
  data() {
    return {
      formData: this.formInit() || {},
    };
  },
  methods: {
    // 初始化默认值
    formInit() {
      const form = {};
      const formMap = {
        input: null,
        inputNumber: undefined, // inputNumber要为undefined
        select: null,
      };
      this.form.forEach((item) => {
        if (item.defaultValue !== undefined) {
          form[item.key] = item.defaultValue;
        } else {
          form[item.key] = formMap[item.type];
        }
      });
      return form;
    },

    onSearch() {
      this.$refs.form.validate((valid) => {
        this.$emit("submit", this.formData, valid);
      });
    },

    // 重置
    onReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script> 
