// 有一些组件依赖全局组件， 例如element，router  为了独立性
// 使用createLocalVue来存档 保存
import { createLocalVue } from '@vue/test-utils';
import ElementUi from 'element-ui';

const localVue = createLocalVue();

localVue.use(ElementUi);

// if (!process || process.env.NODE_ENV !== 'test') {
//   localVue.use(VueRouter)
// }

export default {
  localVue
}
