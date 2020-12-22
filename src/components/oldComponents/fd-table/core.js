import { formatTime } from '@/utils';

export function getList(options, data) {
  // 处理时间戳
  var key;
  options.map(item => {
    if (item.format) {
      key = item.key; // 获取当前的key
    }
  });
  data.map(item => {
    item[key] = formatTime(item[key]);
  })
  return data
}