<template>
  <div>
    <FdMain
      :form="formDatas"
      :tableData="list"
      :tableConfig="tableConfig"
      @submit="onSubmit"
    >
      <!-- <template v-slot:name="scope">
        <div>
          {{ scope }}
        </div>
      </template> -->
    </FdMain>
  </div>
</template>

<script>
import FdMain from "@/components/index.vue";
// import install from "@/yifang";

export default {
  components: {
    FdMain,
  },
  data() {
    return {
      // form
      formDatas: [
        {
          title: "用户名",
          key: "username",
          type: "input",
          contentWidth: 100,
          isRequired: true,
        },
        {
          // select
          title: "选择器",
          key: "value",
          type: "select",
          isRequired: true,
          options: [
            {
              label: "haha2",
              value: "这是帝都",
            },
          ],
        },
        {
          title: "库区",
          key: "daate",
          type: "datepicker",
          defaultValue: "库区",
        },
        {
          title: "执行人",
          key: "code",
          type: "input",
          defaultValue: "执行人",
          rule: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            {
              min: 3,
              max: 5,
              message: "长度在 3 到 5 个字符",
              trigger: "blur",
            },
          ],
          // isRequired: true,
        },
      ],
      // table: [],
      list: [
        { date: 1607265511, name: "一方", address: "广州" },
        { date: 1607265510, name: "星宇", address: "广州" },
        { date: 1607265511856, name: "前端", address: "fordeal" },
      ],
      // 列表配置项
      tableConfig: [
        { key: "date", title: "时间", props: { width: "180" }, format: true },
        { key: "name", title: "姓名", slot: "name" },
        { key: "address", title: "地区" },
        {
          title: "操作",
          render: (h, { row }) => (
            <div>
              <el-button onClick={() => this.onUpdate(row)}>复制</el-button>
              <el-button type="primary" onClick={() => this.onUpdate(row)}>
                粘贴
              </el-button>
            </div>
          ),
        },
      ],
    };
  },
  methods: {
    onSubmit(data, valid) {
      console.log(data);
      console.log(valid);
    },
    onUpdate(row) {
      console.log(row);
    },
    handleChange(page) {
      console.log(page);
    },
  },
};
</script>
