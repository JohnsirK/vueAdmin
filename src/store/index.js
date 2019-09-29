// 引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入state,getters,mutations,actions
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

// 将vuex挂载到vue中
Vue.use(Vuex)

// 导出vuex，方便其他页面使用。导出之后再main.js里面统一注册
// 此处Vuex.Store大写
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
