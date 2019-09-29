<template>
  <el-aside :width="isWidth">
    <el-menu class="el-menu--dark el-menu-vertical-demo" @open="divOpen" @click="divClose" :collapse = 'isCollapse' router>
      <el-menu-item index = "/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index = '2'>
        <template slot='title'>
          <i class="el-icon-location"></i>
          <span slot='title'>数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/dataManage/userList">用户列表</el-menu-item>
          <el-menu-item index="/dataManage/shopList">商家列表</el-menu-item>
          <el-menu-item index="/dataManage/foodList">食品列表</el-menu-item>
          <el-menu-item index="/dataManage/orderList">订单列表</el-menu-item>
          <el-menu-item index="/dataManage/adminList">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index = '3'>
        <template slot='title'>
          <i class="el-icon-location"></i>
          <span slot='title'>添加数据</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addData/addShop">
            添加商铺
          </el-menu-item>
          <el-menu-item index="/addData/addFood">
            添加商品
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot='title'>图表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userChart/userArea">
            用户分布
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot='title'>编辑</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/edit/textEdit">
            文本编辑
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot='title'>说明</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/info/infoCon">
            说明
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      // 收起展开
    }
  },
  methods: {
    divOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    divClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    ...mapState(['isCollapse']),
    isWidth () {
      if (this.isCollapse) {
        return '65px'
      } else {
        return '240px'
      }
    }
  }
}
</script>

<style lang = "scss">
.el-aside{
  transition: width .6s;
  -moz-transition: width .6s;
  -webkit-transition: width .6s;
  -o-transition: width .6s;
  position: relative;
  background: #324157;
  overflow:hidden;
  .el-menu--collapse{
    width:100%;
  }
  .el-menu-item-group .el-menu-item-group__title{
    padding:0;
  }
  .el-radio-group{
    position: absolute;
    top:0;
    left:100%;
  }
  .el-menu{
    border-right:0;
  }
  .el-menu-item-group__title{
    padding:0
  }
  .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover {
      outline: 0;
      background-color: #365c88;
  }
  .el-menu--dark{
    background-color: #324157;
  }
  .el-menu--dark .el-submenu__title,.el-menu-item{
    color:#d2d2d2
  }
  .el-menu-item.is-active{
    color: #409EFF !important;
  }
  .el-menu--dark .el-submenu .el-menu {
      background-color: #1f2d3d;
  }
  .el-menu-item-group__title{
    padding:0;
  }
  .el-submenu .el-menu-item{
    padding:0 65px;
  }
}
</style>
