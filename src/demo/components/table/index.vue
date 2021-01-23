<template>
  <dynamic-page
    :tableData="list"
    :tableConfig="tableConfig"
    :total="tableList.length"
    :currentPage="currentPage"
    :pageSize="pageSize"
    @changePage="changePage"
    @submit="getList"
  ></dynamic-page>
</template>

<script>
import { tableList } from "../../mock";

export default {
  name: "table-page",
  data() {
    return {
      // statusMap: [{ label: "在职", value: "1" }],
      statusMap: {
        1: "在职",
        2: "离职",
      },
      currentPage: 1,
      pageSize: 10,
      tableList,
      list: [],
    };
  },
  computed: {
    tableConfig() {
      return [
        { key: "name", title: "姓名" },
        { key: "address", title: "地区" },
        { key: "status", title: "员工状态", map: this.statusMap },
        {
          key: "date",
          title: "入职时间",
          props: { width: "180" },
          format: true,
        },
      ];
    },
  },
  methods: {
    getList() {
      const res = this.skLists(tableList, this.pageSize);
      this.list = res[this.currentPage - 1];
    },
    skLists(arr, num) {
      const newArr = [];
      for (let i = 0; i < arr.length; ) {
        const current = arr.slice(i, (i += num));
        newArr.push(current);
      }
      return newArr;
    },
    // eslint-disable-next-line no-unused-vars
    changePage(page, form) {
      this.currentPage = page;
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
