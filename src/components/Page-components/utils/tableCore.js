import { isArray, isObj } from './utils';

// 时间戳格式化
export function formatTime(origin, option) {
  if (!origin || isObj(option)) {
    return origin === 0 ? '' : origin
  }

  const timeMap = {
    "YYYY-MM-DD": "day",  // 2021-01-08
    "YYYY-MM-DD HH:mm": "time",  // 2021-01-08 19:30
  };

  const formatZero = v => v < 10 ? `0${v}` : v;  //当前值小于10 加上0
  origin = Number(origin) || 0;
  origin = (origin + '').length === 13 ? origin : origin * 1000; //是否为毫秒
  origin = new Date(origin);
  const y = origin.getFullYear();
  const m = formatZero(origin.getMonth() + 1);
  const d = formatZero(origin.getDate());
  const h = formatZero(origin.getHours());
  const mm = formatZero(origin.getMinutes());
  const ss = formatZero(origin.getSeconds());

  if (timeMap[option] === 'day') {
    return y + '-' + m + '-' + d;
  }
  if (timeMap[option] === 'time') {
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm;
  }

  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
}

// 映射Map
export const getManageMap = (map, key) => {
  if (isObj(key) || null) return key;
  if (isArray(map)) {
    let current = '';
    map.some(item => {
      if (item.value == key) {
        current = item.label;
        return true;
      }
    });
    return current ? current : key;
  } else {
    return map[key] ? map[key] : key;
  }
}

/*
  处理列表数据
    config: 配置项
    dataList: 列表数据
*/
export function getTableList(config, dataList) {
  try {
    const list = JSON.parse(JSON.stringify(dataList));

    config.forEach(v => {
      const {  key = "", map } = v || {};

      if (map && isObj(map) || isArray(map)) { //映射字段数据 兼容数组
        list.forEach(item => {
          if (isArray(map)) {
            const current = map.filter(currentObj => `${Number(currentObj.value)}` === `${Number(item[key])}`);

            if (current && current[0]) {
              item[key] = current[0].label
            }
          } else {
            item[key] = map[item[key]];
          }
        })
      }
    });

    return list
  } catch (e) {
    new Error(e, 'list error');
  }
}