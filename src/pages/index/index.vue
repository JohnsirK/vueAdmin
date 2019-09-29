<template>
  <div class="home">
    <el-container>
      <left-slide></left-slide>
      <el-container class="rightCon">
        <el-scrollbar class="page-component_scroll">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import leftSlide from '@/components/all/leftSlide'
import indexHeader from '@/components/all/indexHeader'
export default {
  data () {
    return {
      // 收起展开
    }
  },
  components: {
    leftSlide,
    indexHeader
  }
}
</script>

<style lang="scss">
.home{
    background: #fff;
    width:100%;
    height:100%;
    z-index: 1;
    .el-container {
      width:100%;
      height:100%;
    }
  .rightCon{
    .el-header{
      padding:0 5px;
    }
    .page-component_scroll {
      width:100%;
      height: 100%;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
