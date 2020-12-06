<template>
  <div>
    <el-card>
      <Fd-from :datas="formDatas" @submit="onSubmit">
        <!-- <template v-slot:button="prop">
        <el-button> {{ prop.form }} 哈哈哈 </el-button>
      </template> -->
      </Fd-from>
    </el-card>

    <el-card style="margin-top: 20px">
      <Table :tableData="tables" :options="config" :total="12">
        <template v-slot:name="{ scope }">{{ scope.row.name }}</template>
      </Table>
    </el-card>
  </div>
</template>

<script>
import FdFrom from '../components/fd-form';
import Table from '../components/fd-table';
export default {
  components: {
    FdFrom,
    Table,
  },
  data() {
    return {
      // form
      formDatas: [{
        title: '表单名称',
        key: 'username',
        type: 'input',
        defaultValue: '123',
        contentWidth: 100,
        isRequired: true,
      },
      {
        // select 
        title: '选择器',
        key: "value",
        type: 'select',
        isRequired: true,
        options: [
          {
            label: 'haha2',
            value: '这是帝都',
          },
        ]
      },
      {
        title: '库区',
        key: 'daate',
        type: 'datepicker',
        defaultValue: '库区'
      },
      {
        title: '执行人',
        key: 'code',
        type: 'input',
        defaultValue: '执行人',
        rule: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // isRequired: true,
      }
      ],
      // table: [],
      tables: [
        { date: '2019', name: '一方', address: '广州' },
        { date: '2020', name: '星宇', address: '广州' },
        { date: '2021', name: '前端', address: 'fordeal' },
      ],
      // 列表配置项
      config: [
        { key: 'date', title: '时间', props: { width: '100' } },
        { key: 'name', title: '姓名', slot: 'name' },
        { key: 'address', title: '地区', },
        {
          title: '操作', render: (_, { row }) =>
            <div>
              <el-button onClick={() => this.onUpdate(row)}>复制</el-button>
            </div>
        },
      ],

    }
  },
  methods: {
    onSubmit(data, valid) {
      console.log(data);
      console.log(valid);
    },
    onUpdate(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less">
</style>
