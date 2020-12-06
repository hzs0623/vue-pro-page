<template>
  <div id="app">
    <Main :list="list"></Main>
  </div>
</template>

<script>

import Main from './views/main';
export default {
  components: {
    Main,
  },
  data() {
    return {
      // 传递给孙组件
      list: [{
        a: 13
      }]
    }
  }
}
</script>

<style lang="less">
</style>
