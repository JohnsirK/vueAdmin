import Vue from 'vue'
import Router from 'vue-router'
// Vue组件按需加载。es6方式导入
// 登录页
const login = () => import('@/pages/login/login.vue')
// home主页
const index = () => import('@/pages/index/index.vue')
// index右侧
const home = () => import('@/pages/index/children/home')
// 数据中心
const dataManage = () => import('@/pages/dataManagement/index')
// 用户列表
const userList = () => import('@/pages/dataManagement/children/userList')
// 商家列表
const shopList = () => import('@/pages/dataManagement/children/shopList')
// 食品列表
const foodList = () => import('@/pages/dataManagement/children/foodList')
// 订单列表
const orderList = () => import('@/pages/dataManagement/children/orderList')
// 管理员列表
const adminList = () => import('@/pages/dataManagement/children/adminList')
// 添加数据
const addData = () => import('@/pages/addData/index')
// 添加商铺
const addShop = () => import('@/pages/addData/children/addShop')
// 添加商品
const addFood = () => import('@/pages/addData/children/addFood')
// 图表
const userChart = () => import('@/pages/userChart/index')
// 用户分布
const userArea = () => import('@/pages/userChart/children/userArea')
// 编辑
const edit = () => import('@/pages/edit/index')
// 文本编辑
const textEdit = () => import('@/pages/edit/children/textEdit')
// 设置
// const setup = () => import('@/pages/setup/index')
// 管理员设置
// const adminSetup = () => import('@/pages/setup/children/adminSetup')
// 说明
const info = () => import('@/pages/info/index')
// 说明明细
const infoCon = () => import('@/pages/info/children/info')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      meta: {title: '首页', keepAlive: true},
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
          meta: {keepAlive: true}
        },
        // 数据管理
        {
          path: 'dataManage',
          name: 'dataManage',
          component: dataManage,
          redirect: '/dataManage/userList',
          meta: {title: '数据管理', keepAlive: false},
          children: [
            {
              path: 'userList',
              name: 'userList',
              component: userList,
              meta: {title: '用户列表', keepAlive: false}
            }, {
              path: 'shopList',
              name: 'shopList',
              component: shopList,
              meta: {title: '商家列表', keepAlive: false}
            }, {
              path: 'foodList',
              name: 'foodList',
              component: foodList,
              meta: {title: '食品列表', keepAlive: false}
            }, {
              path: 'orderList',
              name: 'orderList',
              component: orderList,
              meta: {title: '订单列表', keepAlive: false}
            }, {
              path: 'adminList',
              name: 'adminList',
              component: adminList,
              meta: {title: '管理员列表', keepAlive: false}
            }
          ]
        },
        // 添加数据
        {
          path: 'addData',
          name: 'addData',
          component: addData,
          redirect: '/addData/addShop',
          meta: {title: '添加数据'},
          children: [
            {
              path: 'addShop',
              name: 'addShop',
              component: addShop,
              meta: {title: '添加商铺'}
            },
            {
              path: 'addFood',
              name: 'addFood',
              component: addFood,
              meta: {title: '添加商品'}
            }
          ]
        },
        // 图表
        {
          path: 'userChart',
          name: 'userChart',
          component: userChart,
          redirect: '/userChart/userArea',
          meta: {title: '图表'},
          children: [
            {
              path: 'userArea',
              name: 'userArea',
              component: userArea,
              meta: {title: '用户分布'}
            }
          ]
        },
        // 编辑
        {
          path: 'edit',
          name: 'edit',
          component: edit,
          redirect: '/edit/textEdit',
          meta: {title: '编辑'},
          children: [
            {
              path: 'textEdit',
              name: 'textEdit',
              component: textEdit,
              meta: {title: '文本编辑'}
            }
          ]
        },
        // 设置
        // {
        //   path: 'setup',
        //   name: 'setup',
        //   component: setup,
        //   redirect: '/setup/adminSetup',
        //   meta: {title: '设置'},
        //   children: [
        //     {
        //       path: 'adminSetup',
        //       name: 'adminSetup',
        //       component: adminSetup,
        //       meta: {title: '管理员设置'}
        //     }
        //   ]
        // },
        // 说明
        {
          path: 'info',
          name: 'info',
          component: info,
          redirect: '/info/infoCon',
          meta: {title: '说明'},
          children: [
            {
              path: 'infoCon',
              name: 'infoCon',
              component: infoCon,
              meta: {title: '说明'}
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
