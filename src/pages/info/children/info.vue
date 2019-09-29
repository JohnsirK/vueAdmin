<template>
  <div class="homeRight">
    <index-header></index-header>
    <el-main class="infoPage">
      <p>私人项目 by胖虎</p>
      <p>感谢@bailicangdu 提供后端接口</p>
      <p>第一次登录的用户自动注册成为普通管理员</p>
      <p>普通管理员可以添加，修改信息</p>
      <p>超级管理员可以删除信息</p>
    </el-main>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
export default {
  data () {
    return {}
  },
  components: {
    indexHeader,
    indexFooter
  }
}
</script>

<style lang="scss">
  .infoPage {
    color: #999;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    p {
      line-height:28px;
      font-size: 14px;
    }
  }
</style>
