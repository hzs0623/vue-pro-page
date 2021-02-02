import { getElementItem, getForm, } from '../../src/components/Page-components/utils';

describe('formCore', () => {
   it('默认返回类型值', () => {
     const ob1 = getElementItem();
     expect(ob1).not.toBeUndefined();
     expect(ob1.type).toBe('Input');
     expect(typeof ob1.type === 'string').toBe(true);
     expect(ob1.props instanceof Object).toBe(true);
     expect(ob1.props.style instanceof Object).toBe(true);
  })

  it('配置项校验', () => {
    const input = getElementItem({
      title: '标题',
      key: '字段',
      type: 'input',
      defaultValue: 'input',
      props: {
        clearable: false,
      },
      contentWidth: 220,
      isRequired: true,
      rule: {
        required: true,
        message: '输入',
        trigger: 'blur'
      }
    });
    expect(input).not.toBeUndefined();
    expect(input.type).toBe('Input');
    expect(input.props.style.width).toBe('220px');
    expect(input.props.clearable).toBe(false);
    expect(input._rule.required).toBe(true);

    const select = getElementItem({
      title: '标题',
      key: '字段',
      type: 'select',
      defaultValue: 'select',
      props: {
        clearable: false,
      },
      options: {
        1: 'title'
      }
    });
    expect(select.type).toBe('base-select');
    expect(select.props.clearable).toBe(false);
    expect(select.options[0].value).toBe('1');
    expect(select.options[0].label).toBe('title');

    const date = getElementItem({
      title: '标题',
      key: '字段',
      type: 'daterange',
      interval: 3
    });
    expect(date.type).toBe('BaseDate');

  })

  it('返回值', () => {
    const date = getForm([
      {
        title: '日期',
        key: 'date',
        type: 'daterange',
        mapKey: ['before', 'end']
      }
    ], 
      {
        'date': [1, 2]
      })
   expect(date.before).toBe(1);
   expect(date.end).toBe(2);
  })
})