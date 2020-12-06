<template>
  <div class="fd-table">
    <el-table
      v-loading="loading"
      :data="tableData"
      v-bind="$attrs"
      element-loading-text="数据正在加载中"
      border
      style="width: 100%"
    >
      <template v-for="item in options">
        <!-- 有插槽 -->
        <el-table-column
          :key="item.key"
          v-if="item.slot"
          v-bind="item.props"
          :label="item.title"
        >
          <template slot-scope="scope">
            <slot :name="item.key" v-bind:scope="scope">{{
              scope.row[item.key]
            }}</slot>
          </template>
        </el-table-column>
        <!-- 有render -->
        <el-table-column
          v-else-if="item.render"
          :key="item.key"
          v-bind="item.props"
          :label="item.title"
        >
          <template slot-scope="scope">
            <MyRender :render="item.render" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 正常渲染 -->
        <el-table-column
          v-else
          v-bind="item.props"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
        >
        </el-table-column>
      </template>
    </el-table>

    <div v-if="hasPagination && total" class="table-footer">
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
  </div>
</template>

<script>
import MyRender from './Render';
export default {
  name: 'fdTable',
  components: { MyRender },
  props: {
    // 值
    tableData: {
      type: Array,
      default: () => []
    },
    // 配置项
    options: {
      type: Array,
      default: () => []
    },
    // 是否分页
    hasPagination: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 50, 100]
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onSizeChange(val) {
      this.$emit('changeSize', val);
      this.$emit('onSize', val);
    },

    onCurrentChange(val) {
      this.$emit('change', val);
      this.$emit('changePage', val);
    },
  }
};
</script>

<style lang="less">
.fd-table {
  .table-footer {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

