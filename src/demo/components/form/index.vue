<template>
  <dynamic-page :form="formConfig" @submit="search"></dynamic-page>
</template>

<script>
export default {
  name: "form-page",
  computed: {
    formConfig() {
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
  },
  data() {
    return {
      // 岗位map
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
    };
  },
  methods: {
    search(form, valid) {
      console.log(form, valid);
    },
  },
};
</script>
<style lang="less" scoped></style>
