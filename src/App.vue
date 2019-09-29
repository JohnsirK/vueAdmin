<template>
  <div id="app" :style='bgStyle'>
    <router-view/>
  </div>
</template>

<script>
// 背景图
import bgImg from '@/assets/images/4.jpg'
export default {
  name: 'App',
  data () {
    return {
      bgStyle: {
        background: `rgba(0,0,0,.8) url(${bgImg}) center center no-repeat`
      }
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/main.scss';
</style>
