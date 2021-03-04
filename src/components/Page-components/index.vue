<template>
  <div class="dynamic-page">
    <!-- form表单 -->
    <el-card v-if="form.length">
      <el-form
        ref="form"
        :inline="inline"
        :model="formData"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <el-form-item
          v-for="item in getItem"
          :key="item.key"
          :rules="item._rule"
          :prop="item.key"
          :label="item.title"
        >
          <component
            ref="comp"
            :is="item.type"
            v-model="formData[item.key]"
            v-bind="item.props"
            :options="item.options"
            :interval="item.interval"
            :form="getFormData()"
            :key-value="item.key"
            :label-value="defaultLabel(item.title)"
          ></component>
        </el-form-item>

        <el-form-item v-if="hasControl">
          <el-button type="primary" @click="onSearch" icon="el-icon-search">{{
            searchText
          }}</el-button>
          <el-button @click="onReset" icon="el-icon-refresh">{{
            clearText
          }}</el-button>
        </el-form-item>
        <slot name="formData" :form="getFormData()" />
      </el-form>
    </el-card>
    <!-- 插槽中间备用 -->
    <slot name="center"></slot>
    <!-- table列表 -->
    <el-card class="table-list" v-if="tableConfig.length">
      <Checkbox
        v-if="isTableCheckBox"
        :tableConfig="tableConfig"
        @check="handleCheckbox"
      />

      <el-table
        :data="tableData"
        v-loading="loading"
        :element-loading-text="lang('data_loading')"
        v-bind="$attrs"
        v-on="$listeners"
        border
        style="width: 100%"
      >
        <template v-for="item in tableConfigs">
          <!-- render -->
          <el-table-column
            v-if="item.render"
            :key="item.key"
            v-bind="item.props"
            :label="item.title"
            v-on="$listeners"
          >
            <template slot-scope="scope">
              <my-render :render="item.render" :scope="scope" />
            </template>
          </el-table-column>

          <!-- 映射数据 -->
          <el-table-column
            v-else-if="item.map"
            :key="item.key"
            v-bind="item.props"
            :label="item.title"
            v-on="$listeners"
          >
            <template slot-scope="scope">
              <div>{{ getManageMap(item.map, scope.row[item.key]) }}</div>
            </template>
          </el-table-column>

          <!-- 过滤时间 -->
          <el-table-column
            v-else-if="item.format"
            :key="item.key"
            v-bind="item.props"
            :label="item.title"
            v-on="$listeners"
          >
            <template slot-scope="scope">
              {{ getTime(item.format, scope.row[item.key]) }}
            </template>
          </el-table-column>

          <!-- 插槽渲染 -->
          <el-table-column
            v-else
            :key="item.key"
            v-bind="item.props"
            :label="item.title"
            v-on="$listeners"
            :prop="item.key"
          >
            <template v-if="getColumnConfig(item.props)">
              <template slot-scope="scope">
                <slot
                  :name="item.key"
                  :row="scope.row"
                  :column="scope.column"
                  :index="scope.$index"
                  >{{ scope.row[item.key] }}</slot
                >
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <Pagination v-bind="$attrs" v-on="$listeners" :formData="getFormData()" />
    </el-card>
  </div>
</template>

<script>
import {
  getElementItem,
  getForm,
  componentRefs,
  getManageMap,
  formatTime,
} from "./utils";

import BaseSelect from "./base-components/Base-select";
import BaseDate from "./base-components/Base-date";
import MyRender from "./base-components/Base-render/index.vue";
import Input from "./base-components/Input";
import Pagination from "./base-components/Pagination";
import Checkbox from "./base-components/Pro-checkbox";
import urlMixin from "./utils/urlMixin"; // url地址自绑定
import langMixin from "./utils/langMixin"; // 多语言

export default {
  name: "DynamicPage",
  mixins: [urlMixin, langMixin],
  watch: {
    tableConfig: {
      handler(newVal, od) {
        this.tableConfigs = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    getItem() {
      return this.form.map((v) => getElementItem(v, this));
    },

    // 重置默认值
    clearText() {
      return this.resetText ? this.resetText : this.lang("reset");
    },

    // 搜索默认值
    searchText() {
      return this.sumbitText ? this.sumbitText : this.lang("search");
    },
  },
  data() {
    return {
      formData: this.formInit() || {},
      tableConfigs: [],
      columnMap: ["index", "selection"], // table列map
    };
  },
  components: {
    Input,
    BaseSelect,
    BaseDate,
    MyRender,
    Pagination,
    Checkbox,
  },
  props: {
    form: {
      type: Array,
      default: () => [],
    },
    inline: {
      type: Boolean,
      default: true,
    },
    hasControl: {
      type: Boolean,
      default: true,
    },
    resetText: {
      type: String,
    },
    sumbitText: {
      type: String,
    },

    tableData: {
      type: Array,
      default: () => [],
    },
    // 配置项
    tableConfig: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isTableCheckBox: false,
  },
  methods: {
    // 初始化默认值
    formInit() {
      const form = {};
      const formTypeMap = {
        inputNumber: undefined, // inputNumber要为undefined
        input: null,
        select: null,
        "el-input": null,
        "el-select": null,
      };
      this.form.forEach((item) => {
        if (item.defaultValue !== undefined) {
          form[item.key] = item.defaultValue;
        } else {
          form[item.key] = formTypeMap[item.type] || "";
        }
      });
      return form;
    },

    onSearch() {
      this.$refs.form.validate((valid) => {
        const data = this.getFormData();
        this.$emit("submit", data, valid);
      });
    },

    // 获取form格式化后的值
    getFormData() {
      return getForm(this.form, this.formData);
    },

    // 重置
    onReset() {
      this.$refs.form.resetFields();
      this.$emit("reset", this.getFormData());
      componentRefs(this.$refs["comp"], this.form, this.formData);
    },

    bindUrl() {
      if (!this.$route) return; // !没有vue-router
      const formMap = {};
      for (let key in this.formData) {
        formMap[key] = `formData.${key}`;
      }
      this.bindUrlQuery(formMap);
    },

    // 列表选择
    handleCheckbox(list) {
      const newTableList = [];
      this.tableConfig.forEach((item) => {
        if (list.find((key) => item.title === key)) {
          newTableList.push(item);
        }
      });
      this.tableConfigs = newTableList;
    },
    // 多语言格式化
    defaultLabel(title) {
      return title ? `${this.lang("please_select")}${title}` : "";
    },

    getManageMap,
    // 过滤列表时间
    getTime(option, current) {
      return formatTime(current, option);
    },

    // 处理table列
    getColumnConfig(props = {}) {
      const { type } = props;
      return this.columnMap.indexOf(type) !== -1;
    },
  },
  mounted() {
    this.bindUrl();
  },
};
</script>
<style lang="less" scoped>
.dynamic-page .table-list {
  margin-top: 20px;
}
</style>
