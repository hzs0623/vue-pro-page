import config from '../config';
import { mount} from '@vue/test-utils';
import proPage from '../../src/components/Page-components/index.vue';

const { localVue }  = config;

// eslint-disable-next-line no-undef
describe('pro-page', () => {

  const propsData = {
    form: [
      {key: 'input', title: '输入框', type: 'input',},
      {key: 'select', title: '选择器', type: 'select',},
      {key: 'daterange', title: '日期选择器', type: 'daterange',},
    ]
  }

  const wrapper = mount(proPage, {
    localVue,
    propsData,
  });

  // eslint-disable-next-line no-undef
  test('Render page-level components normally', () => {
    const input = wrapper.findComponent({name: 'my-input'});
    const select = wrapper.findComponent({name: 'base-select'});
    const date = wrapper.findComponent({name: 'base-date'});
    // eslint-disable-next-line no-undef
    expect(input.exists()).toBe(true)
    // eslint-disable-next-line no-undef
    expect(select.exists()).toBe(true)
    // eslint-disable-next-line no-undef
    expect(date.exists()).toBe(true)
  })
})

