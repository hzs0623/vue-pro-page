<template >
  <div class="pageination-wrap" v-if="total > 0">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'base-pagination',
  props: {
    currentPage: {
      type: [Number, String],
      default: 1,
    },
    pageSize: {
      type: [Number, String],
      default: 10,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    layout() {
      const layoutMap = ['total, prev, pager, next, jumper'];
      this.pageSizes.length && layoutMap.splice(1, 0, 'sizes');
      return layoutMap.join(',');
    },
  },
  methods: {
    // 页数
    handleSizeChange(size) {
      this.$emit('changeSize', size, this.formData);
    },
    // 页码
    handleCurrentChange(page) {
      this.$emit('changePage', page, this.formData);
    },
  },
};
</script> 

<style>
.pageination-wrap {
  margin-top: 30px;
  text-align: center;
}
</style>
