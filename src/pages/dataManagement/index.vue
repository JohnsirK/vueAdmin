<template>
  <div class="home">
    <el-scrollbar class="page-component_scroll">
    <transition name='slide' mode='out-in'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name='slide' mode='out-in'>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 收起展开
    }
  },
  components: {}
}
</script>

<style lang="scss">
.home{
    background: #fff;
    width:100%;
    height:100%;
    z-index: 1;
    .page-component_scroll {
      width:100%;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-container {
      width:100%;
      height:100%;
    }
  .rightCon{
    .el-header{
      padding:0 5px;
    }
  }
}
</style>
