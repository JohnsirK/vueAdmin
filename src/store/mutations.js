// 引入localSession
import localSession from '@/utils/localSession'
// 定义mutations 同步方法
const mutations = {
  // 展开收起
  changeIsCollapse (state, data) {
    state.isCollapse = data
  },
  // 用户信息
  saveUserInfo (state, data) {
    localSession.setSession('userinfo', data)
    state.userinfo = data
  }
}
// 导出mutations
export default mutations
