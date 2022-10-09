import moment from 'moment'

moment.locale('zh-cn');  // 设置时区为中国


export function formatTime(time) {
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
}
