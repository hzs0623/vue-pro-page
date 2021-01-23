<template>
  <div class="dynamic-page-demo">
    <header>
      中后台页面级组件
      <a target="_blank" href="https://github.com/hzs0623/vue-dynamic-page.git"
        >github</a
      >
    </header>
    <div class="container">
      <div class="aside">
        <Aside @select="onSelect" />
      </div>
      <div class="main">
        <component :is="comIs"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "./Aside";
import Form from "./components/form";
import Table from "./components/table";
import Main from "./components/main";
import SlotPage from "./components/slot";

export default {
  name: "dynamic-page-demo",
  components: {
    Aside,
    Form,
    Table,
    Main,
    SlotPage,
  },
  data() {
    return {
      comIs: "Form",
    };
  },
  methods: {
    onSelect(name) {
      this.comIs = name;
    },
  },
};
</script>
<style lang="less">
@import url("./index");
</style>
