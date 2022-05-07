/**
 * 通用js方法封装处理
 * Copyright (c) 2022 Yangsong
 */
import axios from 'axios'
const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}
// JSON格式转拼接
export function formatParams(data){
  var arr=[];
for(var item in data){
arr.push(item+"="+data[item])
}
return	arr.join("&")
}	
// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && '' != dateRange) {
    search.beginTime = this.dateRange[0];
    search.endTime = this.dateRange[1];
  }
  return search;
}


// 通用下载方法
export function download(fileName) {
  window.location.href = baseURL + "/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true;
}


// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == "undefined" || str == "null") {
    return "";
  }
  return str;
}
/**
 * 设置cookie值
 *
 * @param {String} name cookie名称
 * @param {String} value cookie值
 * @param {Number} expiredays 过期时间，天数
 */
export function setCookie(name, value, expiredays) {
  let exdate = new Date()
  //setDate获取N天后的日期
  exdate.setDate(exdate.getDate() + expiredays) //getDate() 获取当前月份的日  + 过期天数
  document.cookie = name + "=" + encodeURI(value) + ";path=/;expires=" + exdate.toLocaleString()
}
/**
 * 获取cookie值
 * @param {String} name cookie名称
 */
export function getCookie(name) {
  var arr = document.cookie.split(";") //转换数组
  //["_ga=GA1.1.1756734561.1561034020", " mobile=123" password=456"]
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('='); // ["_ga", "GA1.1.1756734561.1561034020"]
    if (arr2[0].trim() == name) {
      return arr2[1]
    }
  }
}
/**
 * 删除指定cookie值
 * @param {String} name cookie名称
 */
export function clearCookie(name) {
  setCookie(name, '', -1)
}
/**
 * 浏览器是否支持本地cookie
 */
export function isSupportLocalCookie() {
  let { name, value } = { name: 'name', value: 'mingze' }
  setCookie(name, value, 1) //设置cookie
  return getCookie(name).includes(value) //includes  判断数组name中是否含有当前value(返回true or false)
}
// 检查手机号
const checkPhone = (rule, value, callback) => {
  if (value) {
    const reg = /^1[0-9]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
// 校验手机号码
const isPhone = function (val) {
  var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
  if (!patrn.test(val) || val === '') {
    return false
  } else {
    return true
  }
}

export {
  checkPhone,
  isPhone,
}