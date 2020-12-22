<template>
  <div>
    <el-card>
      <Fd-from v-bind="$attrs" v-on="$listeners">
        <!-- <template v-slot:button="prop">
        <el-button> {{ prop.form }} 哈哈哈 </el-button>
      </template> -->
      </Fd-from>
    </el-card>

    <el-card style="margin-top: 20px">
      <Table v-bind="$attrs" v-on="$listeners" ref="fdTable"> </Table>
    </el-card>
  </div>
</template>

<script>
import FdFrom from "@/components/fd-form";
import Table from "@/components/fd-table";
export default {
  name: "fdMain",
  components: {
    FdFrom,
    Table,
  },
  computed: {
    listMap() {
      return this.list;
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = this.$refs.fdTable;
  },
};
</script>
