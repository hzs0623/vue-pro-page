<template>
  <div class="fd-main">
    <el-card>
      <!-- form -->
      <el-form ref="form" :inline="inline" :model="formData" v-bind="$attrs">
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
    </el-card>

    <el-card class="fd-table">
      <el-table
        :data="list"
        v-loading="loading"
        :element-loading-text="loadingContent"
        v-bind="$attrs"
        border
        style="width: 100%"
      >
        <template v-for="item in tableConfig">
          <!-- render -->
          <el-table-column
            v-if="item.render"
            :key="item.key"
            v-bind="item.props"
            :label="item.title"
          >
            <template slot-scope="scope">
              <my-render :render="item.render" :scope="scope" />
            </template>
          </el-table-column>

          <!-- 插槽渲染 -->
          <el-table-column
            :key="item.key"
            v-else
            v-bind="item.props"
            :label="item.title"
          >
            <template slot-scope="scope">
              <slot
                :name="item.key"
                :row="scope.row"
                :column="scope.column"
                :index="scope.$index"
                >{{ scope.row[item.key] }}</slot
              >
            </template>
          </el-table-column>
        </template>
      </el-table>

      <Pagination v-bind="$attrs" v-on="$listeners" :formData="formData" />
    </el-card>
  </div>
</template>

<script>
import { getElementItem, getTableList } from "./utils";
import FdSelect from "./base-components/Fd-select";
import BaseDate from "./base-components/Base-date";
import MyRender from "./base-components/Fd-render/index.vue";
import Pagination from "./base-components/Pagination";
import urlMixin from "./utils/urlMixin";

export default {
  name: "fd-main",
  mixins: [urlMixin],
  data() {
    return {
      formData: this.formInit() || {},
    };
  },
  components: {
    FdSelect,
    BaseDate,
    MyRender,
    Pagination,
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
      default: "重置",
    },
    sumbitText: {
      type: String,
      default: "搜索",
    },

    // table配置
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

    loadingContent: {
      type: String,
      default() {
        return "数据正在加载中";
      },
    },
  },
  computed: {
    getItem() {
      return this.form.map((v) => getElementItem(v, this.formData));
    },

    list() {
      return getTableList(this.tableConfig, this.tableData);
    },
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

    bindUrl() {
      const formMap = {};
      for (let key in this.formData) {
        formMap[key] = `formData.${key}`;
      }
      this.bindUrlQuery(formMap);
    },
  },
  created() {
    this.$nextTick(() => {
      this.bindUrl();
    });
  },
};
</script> 

<style>
.fd-main .fd-table {
  margin-top: 20px;
}
</style>
