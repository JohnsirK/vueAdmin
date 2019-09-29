import localSession from '@/utils/localSession'
// 定义vuex变量
const state = {
  // 用户信息
  userinfo: localSession.getSession('userinfo') ? localSession.getSession('userinfo') : null,
  // 侧边栏展开收缩
  isCollapse: false
}

export default state
