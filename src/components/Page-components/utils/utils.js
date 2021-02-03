/*
** 职责： 工具函数
**
*/

export const isObj = obj => Object.prototype.toString.call(obj) === "[object Object]";

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

// 时间间隔
export const getIntervalTime = (interval = 0) => {
  if (Number(interval) + '' === 'NaN') return console.error('The is interval error');

  const end = Number(new Date());
  const day = 24 * 3600 * 1000;
  return interval ? [end - day * Number(interval), end] : [];
}

// 深拷贝  缺点： 嵌套太深性能问题
export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  const newObj = Array.isArray(obj) ? [] : Object.create(null);
  for (let i in obj) {
    if (Array.isArray(obj)) {
      newObj[i] = obj[i];
    } else {
      newObj[i] = deepCopy(obj[i]);
    }
  }

  return newObj;
}
