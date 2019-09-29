// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入vuex
import store from '@/store/index.js'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// 引入全局样式
import '@/assets/css/global.css'
// Element-UI按需引入
import {
  Button,
  Select,
  Input,
  Icon,
  Message,
  Row,
  Col,
  Radio,
  RadioGroup,
  RadioButton,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  // 面包屑
  Breadcrumb,
  BreadcrumbItem,
  // 下拉菜单
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // loading加载
  Loading,
  // 滚动条
  Scrollbar,
  // 表格
  Table,
  TableColumn,
  // 分页
  Pagination,
  // tag标签
  Tag,
  // 表单
  Form,
  FormItem,
  // 模态框
  Dialog,
  // 级联选择器
  Cascader,
  // 图片上传
  Upload,
  // 选项
  Option,
  // 步长
  InputNumber,
  // 开关
  Switch,
  // 时间选择
  TimeSelect,
  TimePicker,
  // 弹框
  MessageBox,
  // 左侧slide菜单
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup } from 'element-ui'
// 安装
Vue.use(Button)
  .use(Select)
  // 开关
  .use(Switch)
  .use(TimePicker)
  .use(Input)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Footer)
  // 面包屑
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  // 下拉菜单
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  // 滚动条
  .use(Scrollbar)
  // loading加载
  .use(Loading)
  // 表格
  .use(Table)
  .use(TableColumn)
  // 分页
  .use(Pagination)
  // 标签
  .use(Tag)
  // 表单
  .use(Form)
  .use(FormItem)
  // 模态框
  .use(Dialog)
  // 级联选择器
  .use(Cascader)
  // 图片上传
  .use(Upload)
  // 选项
  .use(Option)
  // 步长
  .use(InputNumber)
  // 时间选择
  .use(TimeSelect)
  .use(TimePicker)
  // 单选
  .use(Radio)
Vue.component(CollapseTransition.name, CollapseTransition)
// 将elementui Message组件绑定到Vue实例。
Vue.prototype.$message = Message
// 弹框绑定到vue
Vue.prototype.$msgbox = MessageBox
// 询问框
Vue.prototype.$confirm = MessageBox.confirm
// 提交框
Vue.prototype.$prompt = MessageBox.prompt
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 此处将vuex注册到vue实例中
  store,
  components: { App },
  template: '<App/>'
})
