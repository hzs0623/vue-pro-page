import elementMap from './element-map';

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}


const inputMap = ['el-input', 'el-input-number'];
const getRule = (item) => {
  const { type, isRequired, rule, title } = item;
  if (typeof isRequired === 'boolean' && isRequired) {
    const isInput = inputMap.indexOf(type) > -1;
    return {
      required: true,
      message: `${isInput ? '请输入' : '请选择'}${title}`,
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (isObject(rule) || isArray(rule)) {
    return rule
  }
  return null
}

export const getElementItem = (val, form) => {
  const item = { ...val };
  const res = elementMap[item.type || 'input']; // 默认input
  item.type = res.component; // 获取当前的类型
  item.props = Object.assign({}, res.props, item.props);

  // 校验
  item._rule = getRule(item);

  if (item.contentWidth) {
    // 默认宽度200px  可以传递Number和String
    const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth;
    item.props.style = { width: temp }
  }

  return item
}

