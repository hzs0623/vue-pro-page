<template>
  <div class="fd-table">
    <el-table
      v-loading="loading"
      :data="list"
      v-bind="$attrs"
      element-loading-text="数据正在加载中"
      border
      style="width: 100%"
    >
      <template v-for="item in options">
        <!-- 有render -->
        <el-table-column
          v-if="item.render"
          :key="item.key"
          v-bind="item.props"
          :label="item.title"
        >
          <template slot-scope="scope">
            <MyRender :render="item.render" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 有插槽 -->
        <el-table-column
          :key="item.key"
          v-else
          v-bind="item.props"
          :label="item.title"
        >
          <template slot-scope="scope">
            <slot :name="item.key" v-bind:scope="scope">{{
              scope.row[item.key]
            }}</slot>
          </template>
        </el-table-column>
        <!-- 正常渲染 -->
        <!-- <el-table-column
          v-else
          v-bind="item.props"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
        >
        </el-table-column> -->
      </template>
    </el-table>

    <div v-if="hasPagination && total" class="my-table-footer">
      <el-pagination
        background
        :disabled="loading"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import MyRender from "@/components/fd-table/Render";
import { formatTime } from "@/utils";
import { getList } from "./core";

export default {
  name: "fdTable",
  components: { MyRender },
  props: {
    // 值
    tableData: {
      type: Array,
      default: () => [],
    },
    // 配置项
    options: {
      type: Array,
      default: () => [],
    },
    // 是否分页
    hasPagination: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 50, 100],
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    list() {
      return getList(this.options, this.tableData);
    },
  },
  methods: {
    onSizeChange(val) {
      this.$emit("changeSize", val);
      this.$emit("onSize", val);
    },

    onCurrentChange(page) {
      this.$emit("change", page);
      this.$emit("changePage", page);
    },

    formatTime(data) {
      return formatTime(data);
    },
  },
};
</script>

<style scoped>
.fd-table .my-table-footer {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

