<template>
  <el-table
    :data="list"
    v-loading="loading"
    :element-loading-text="loadingContent"
    v-bind="$attrs"
    v-on="$listeners"
    border
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
</template>

<script>
import { getTableList } from "../../utils";
import MyRender from "./base-components/Fd-render/index.vue";

export default {
  name: "fd-table",
  props: {
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
    list() {
      return getTableList(this.tableConfig, this.tableData);
    },
  },
  components: {
    MyRender,
  },
  watch: {},
  methods: {},
  created() {},
};
</script> 
<style scoped>
</style>
