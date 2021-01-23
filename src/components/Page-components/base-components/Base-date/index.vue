<template>
  <el-date-picker v-bind="$attrs" v-model="createTime" @change="change"> </el-date-picker>
</template>

<script>
import { getIntervalTime } from "../../utils";
export default {
  name: "base-date",
  props: {
    interval: {
      type: [Number, String],
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      createTime: this.getInit() || [],
    };
  },
  methods: {
    getInit() {
      const { interval } = this;
      const datas = getIntervalTime(interval);
      this.change(datas);
      return datas;
    },
    change(v) {
      if (v && v.length) {
        const start = new Date(v[0]);
        const end = new Date(v[1]);
        v[0] = new Date(start.toLocaleDateString()).getTime();
        v[1] = new Date(end.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
      }
      this.$emit("input", v);
    },
  },
};
</script>
