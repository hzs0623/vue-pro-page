// 格式化时间戳
export function formatTime(origin) {
  origin = Number(origin) || 0;
  origin = (origin + '').length === 13 ? origin : origin * 1000; //是否为毫秒
  origin = new Date(origin);
  var y = origin.getFullYear();
  var m = origin.getMonth() + 1;
  var d = origin.getDate();
  var h = origin.getHours();
  var mm = origin.getMinutes();
  var ss = origin.getSeconds();
  return y + '年' + m + '月' + d + '日' + h + ':' + mm + ':' + ss;
}
