<template>
  <el-date-picker
    :picker-options="pickerOptions"
    v-model="currentValue"
    v-bind="$attrs"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'baseDate',
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        // 转为时间戳
        const beforeTime = Number(val[0]);
        const endTime = Number(val[1]);
        this.$emit('input', [beforeTime, endTime]);
      }
    }
  },
  data() {
    return {
      pickerMinDate: null,
      day30: 30 * 24 * 3600 * 1000,
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime();
          if (maxDate) {
            this.pickerMinDate = "";
          }
        },
        disabledDate: (time) => {
          if (!this.pickerMinDate) {
            return false;
          }
          return (
            time.getTime() > this.pickerMinDate + this.day30 ||
            time.getTime() < this.pickerMinDate - this.day30
          );
        }
      },
    }
  }
};
</script>

<style scoped>
</style>
