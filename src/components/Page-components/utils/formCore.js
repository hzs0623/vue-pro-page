import elementMap from './element-map';
import { isObj, isArray, getIntervalTime,  } from './utils';
import lang from '../../../i18n';

const inputMap = ['el-input', 'el-input-number', 'Input'];
const getRule = (item) => {
  const { type, isRequired, rule, title } = item;
  if (typeof isRequired === 'boolean' && isRequired) {
    const isInput = inputMap.indexOf(type) > -1;
    return {
      required: true,
      message: `${isInput ? lang('please_input') : lang('please_select')}${title}`,
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (isObj(rule) || isArray(rule)) {
    return rule
  }
  return null
}

export const getElementItem = (val, vm) => {
  const item = { ...val };
  const componentType = getComponentType(item.type);

  const res = elementMap[componentType || 'input']; // 默认input
  const { component, props } = res || {}; // 获取自定义配置
  item.type = component || item.type; // 当自定义配置没有,直接拿传递的组件类型

  item.props = props ? Object.assign({}, props, item.props) : item.props || {}; // 如果传递了props 直接覆盖自定义props
  const { options } = item;

  if (options) {
    item.options = formatOptions(options);
  }

  // 校验
  item._rule = getRule(item, vm);

  if (item.contentWidth) {
    // 默认宽度200px  可以传递Number和String
    const temp = typeof item.contentWidth === 'number' ? `${item.contentWidth}px` : item.contentWidth;
    item.props.style = { width: temp }
  }

  return item
}

// 校验组件类型
function getComponentType(type) {
  // 为el开头就去掉el
  const reg = /^el/;
  return reg.test(type) ? type.substring(2, type.length - 2) : type;
}

// 获取日期 传递了mapkey的 key值。
const getKeyMaps = (data) => {
  if (!isArray(data)) return [];

  const saveMap = new Set();
  data.forEach(item => {
    const { mapKey, key } = item || {};
    if (mapKey && mapKey.length) {
      const params = { key, mapKey };
      saveMap.add(params);
    }
  })
  return saveMap;
}
/*
** 格式化form
** origin: 配置原始值
** data: 当前form值
*/
export const getForm = (origins, data) => {
  const currentData = { ...data };
  const saveMap = getKeyMaps(origins); // 映射 keys

  if (!saveMap || saveMap.size < 1) return data;  //没有 keyMap 直接返回

  // mapKey => ['start', 'end']
  saveMap.forEach(item => {
    const { key, mapKey } = item;
    const times = data[key]; // 当前时间 [Array]
    delete currentData[key]; //删除原有 key
    if (times && times.length) {
      currentData[mapKey[0]] = times[0];
      currentData[mapKey[1]] = times[1];
    } else {
      currentData[mapKey[0]] = "";
      currentData[mapKey[1]] = "";
    }
  })

  return currentData;
}

/*
 格式化options值
 对象：  key 过滤为label， value值 为value
 数组： 不过滤
*/
function formatOptions(origin) {
  if (typeof origin !== 'object') {
    //防止用户传递的格式问题
    console.warn('Please enter the object format.')
    return {};
  }
  if (!isObj(origin)) return origin;  //为对象时进行格式化

  const optionsMap = new Set();
  for (let key in origin) {
    optionsMap.add({
      label: origin[key],
      value: key
    })
  }
  return Array.from(optionsMap); //转为数组
}


/**
 * 遍历有的组件
 * comps： Array  refs
 * data: Array   form配置值
 * formData: Object   form值
 * */
export const componentRefs = (comps, data, formData) => {
  if (!isArray(comps) || !isArray(data) || !isObj(formData)) return;

  const KeyMaps = getKeyMaps(data); // 获取日期时间 keymap
  // 重置日期
  if (KeyMaps.size < 1) {
    return;
  }

  const compoentMap = {
    "BaseDate": 'daterange'  // 日期选择器
  };

  comps.forEach((item) => {
    const { $options: options = {}, interval } = item;
    const { _componentTag: name = "" } = options;
    if (compoentMap[name] === 'daterange') {
      // 为日期的时候进行重置
      item.createTime = interval ? getIntervalTime(interval) : [];
    }
  });
}
