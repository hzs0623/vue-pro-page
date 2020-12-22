<template>
  <el-form  ref="form" :model="form" v-bind="$attrs">
    <el-form-item
      v-for="item in getItem"
      :label="item.title"
      :key="item.key"
      :rules="item._rule"
      :prop="item.key"
    >
      <component
        :is="item.type"
        v-model="form[item.key]"
        v-bind="item.props"
        :options="item.options"
      ></component>
    </el-form-item>
    <el-form-item v-if="hasControl">
      <el-button type="primary" @click="onSearch">{{ sumbitText }}</el-button>
      <el-button @click="onReset">{{ resetText }}</el-button>
    </el-form-item>
    <!-- 自定义按钮 -->
    <slot name="button" :form="form" />
  </el-form>
</template>

<script>
import { computeFormItem } from './core';
import FdSelect from '../base-components/select';
import BaseDate from '../base-components/base-date';

export default {
  name: 'fdForm',
  components: {
    FdSelect,
    BaseDate
  },
  props: {
    datas: {
      type: Array,
      default: () => []
    },
    hasControl: {
      type: Boolean,
      default: true
    },
    sumbitText: {
      type: String,
      default: () => `搜索`
    },
    resetText: {
      type: String,
      default: () => `重置`
    }
  },
  data() {
    return {
      form: this.initForm() || {}
    };
  },
  computed: {
    getItem() {
      return this.datas.map(item => computeFormItem(item));
    }
  },
  methods: {
    initForm() {
      const form = {}
      const map = {
        input: "",
        inputNumber: undefined,
      }
      this.datas.map(item => {
        if (item.defaultValue !== undefined) {
          // 如果传递了默认值
          form[item.key] = item.defaultValue
        } else {
          form[item.key] = map[item.type]
        }
      })
      return form
    },

    onSearch() {
      this.$refs.form.validate((valid) => {
        this.$emit('submit', this.form, valid)
      })
    },

    onReset() {
      this.$refs.form.resetFields()
    },

    clear() {
      this.$refs.form.clearValidate()
    },
  },
};
</script>

<style scoped>
</style>
