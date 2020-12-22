<template>
  <el-date-picker v-bind="$attrs" v-model="createTime"> </el-date-picker>
</template>

<script>
export default {
  name: 'base-date',
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: null,
    },
  },
  computed: {
    createTime: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  data() {
    return {
      pickerMinDate: null,
      day30: 30 * 24 * 3600 * 1000,
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime();
          if (maxDate) {
            this.pickerMinDate = '';
          }
        },
        disabledDate: (time) => {
          if (!this.pickerMinDate) {
            return false;
          }
          return time.getTime() > this.pickerMinDate + this.day30 || time.getTime() < this.pickerMinDate - this.day30;
        },
      },
    };
  },
};
</script> 
