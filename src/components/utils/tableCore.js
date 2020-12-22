// 格式化时间戳
export function formatTime(origin) {
  if (!origin) {
    return ' '
  }
  origin = Number(origin) || 0;
  origin = (origin + '').length === 13 ? origin : origin * 1000; //是否为毫秒
  origin = new Date(origin);
  var y = origin.getFullYear();
  var m = origin.getMonth() + 1 < 10 ? "0" + (origin.getMonth() + 1) : origin.getMonth() + 1;
  var d = origin.getDate() < 10 ? "0" + origin.getDate() : origin.getDate();
  var h = origin.getHours() < 10 ? "0" + origin.getHours() : origin.getHours();
  var mm = origin.getMinutes() < 10 ? "0" + origin.getMinutes() : origin.getMinutes();
  var ss = origin.getSeconds() < 10 ? "0" + origin.getSeconds() : origin.getSeconds();
  // return y + '年' + m + '月' + d + '日' + h + ':' + mm + ':' + ss;
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
}

// 返回数据
export function getTableList(options, data) {
  // 处理时间戳
  options.forEach(v => {
    if (v.format) {
      var key = v.key; // 获取当前的key
      data.forEach(item => {
        item[key] = formatTime(item[key]);
      })
    }
  });

  return data
}