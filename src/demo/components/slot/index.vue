<template>
  <dynamic-page
    :form="formDatas"
    :tableData="list"
    :tableConfig="tableConfig"
    :total="tableList.length"
    :currentPage="currentPage"
    :pageSize="pageSize"
    @changePage="changePage"
    @submit="getList"
  >
    <!-- form插槽 -->
    <template v-slot:formData="form">
      <el-button @click="upload(form)" type="success" icon="el-icon-upload2"
        >上传</el-button
      >
    </template>

    <!-- form和table之间 -->
    <template v-slot:center>
      <el-card style="margin-top: 20px">
        <el-tag>form和table之间，插槽， ‘v-slot:center’</el-tag>
        <div>
          <el-divider></el-divider>
          <span>付出不在于多少，只要值得就好</span>
          <el-divider></el-divider>
          <span>青春只有一次，别让自己过得不精彩</span>
        </div>
      </el-card>
    </template>

    <!-- table相关插槽例子 -->
    <template v-slot:address="scope">
      <el-link type="success" v-if="scope.row.address == '中国'">{{
        scope.row.address
      }}</el-link>
      <el-link type="danger" v-else>{{ scope.row.address }}</el-link>
    </template>
    <template v-slot:option="scope">
      <el-button @click="remove(scope.row)" type="danger" size="small"
        >删除</el-button
      >
    </template>
  </dynamic-page>
</template>

<script>
import { tableList } from "../../mock";

export default {
  name: "slot-page",
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
        { key: "address", title: "地区", props: { align: "center" } },
        { key: "status", title: "员工状态", map: this.statusMap },
        {
          key: "date",
          title: "入职时间",
          props: { width: "180" },
          format: true,
        },
        { key: "option", title: "操作", props: { align: "center" } },
      ];
    },
  },
  methods: {
    // 获取值
    getList() {
      const res = this.skLists(tableList, this.pageSize);
      this.list = res[this.currentPage - 1];
    },
    // 分割数组
    skLists(arr, num) {
      const newArr = [];
      for (let i = 0; i < arr.length; ) {
        const current = arr.slice(i, (i += num));
        newArr.push(current);
      }
      return newArr;
    },
    // 当前页
    changePage(page, form) {
      this.currentPage = page;
      this.getList();
    },
    upload({ form }) {
      console.log(form);
    },
    remove(row) {
      const { name } = row;
      let index;
      this.tableList.forEach((item, i) => {
        if (item.name === name) {
          index = i;
          return true;
        }
      });
      this.tableList.splice(index, 1);
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
