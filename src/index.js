import myComponent from './components/Page-components/index.vue';

const install = function (Vue) { Vue.component(myComponent.name, myComponent) }
export default install; // Vue.use() 引入
export const DynamicPage = myComponent; // 局部引入

