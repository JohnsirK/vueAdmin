// axios封装
import axios from 'axios'

// 允许axios请求携带cookie等凭证

// 创建axios实例
const server = axios.create({
  // 接口地址
  // baseURL: '/api',
  baseURL: process.env.API_ROOT,
  // 响应时长
  timeout: 30000,
  // 响应头
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// 定义axios拦截器
// request 请求数据之前的操作，例如让遮罩显示
server.interceptors.request.use(config => {
  // 请求数据之前遮罩显示
  // 例如 store.commit('functionName')
  // commit用于分发同步函数，dispatch用于分发异步方法
  return config
}, err => {
  // 如果失败
  console.log('数据请求发生错误，请重试')
  // 返回Promise的reject错误对象
  return Promise.reject(err)
})

// 定义axios拦截器
// 响应数据之后的操作
// 例如让遮罩消失
server.interceptors.response.use(res => {
  // 数据响应之后的操作，例如关闭遮罩
  // store.commit('functionName')
  return res.data
}, err => {
  // 响应数据出错之后
  // 关闭遮罩
  console.log('数据请求发生错误，请重试！')
  // 返回promise的reject错误对象
  return Promise.reject(err)
})

// 导出server,方便其他页面使用
export default server
