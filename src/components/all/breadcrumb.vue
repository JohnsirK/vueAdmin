<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in list" :key = "index">
      {{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      list: null
    }
  },
  methods: {
    isHome (route) {
      return route.name === 'home'
    },
    getList () {
      let matched = this.$route.matched
      this.list = matched
    }
  },
  created () {
    this.getList()
  },
  watch: {
    $route () {
      this.getList()
    }
  }
}
</script>

<style>
</style>
