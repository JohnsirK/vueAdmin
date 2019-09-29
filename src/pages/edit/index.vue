<template>
  <div class="home">
    <transition name='slide' mode='out-in'>
      <router-view></router-view>
    </transition>
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
