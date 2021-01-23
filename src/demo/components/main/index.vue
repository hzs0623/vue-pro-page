<template>
  <dynamic-page
    :form="formDatas"
    :tableData="list"
    :tableConfig="tableConfig"
    :total="tableList.length"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :isTableCheckBox="true"
    @changePage="changePage"
    @submit="getList"
  ></dynamic-page>
</template>

<script>
import { tableList } from "../../mock";

export default {
  name: "main-page",
  data() {
    return {
      statusMap: {
        1: "在职",
        2: "离职",
      },
      options: [
        {
          label: "前端",
          value: "1",
        },
        {
          label: "后端",
          value: "2",
        },
      ],
      currentPage: 1,
      pageSize: 10,
      // statusMap: [{ label: "在职", value: "1" }],
      // 后端返回数据: []
      tableList,
      list: [],
    };
  },
  computed: {
    formDatas() {
      return [
        {
          title: "用户名",
          key: "username",
          type: "input",
          contentWidth: 200,
          isRequired: true,
          // defaultValue: "一方", // 默认值
        },
        {
          // select
          title: "岗位",
          key: "value",
          type: "select",
          options: this.options,
        },
        {
          title: "入职时间",
          key: "code",
          type: "daterange",
          mapKey: ["before", "end"],
          interval: 7,
        },
      ];
    },
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
