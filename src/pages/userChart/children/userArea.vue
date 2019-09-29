<template>
  <div class="homeRight">
    <index-header></index-header>
    <el-main>
      <pie-chart :dataJson = "userCityData"></pie-chart>
    </el-main>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {cityCount} from '@/api/api'
import pieChart from '@/components/charts/pieCharts'
export default {
  data () {
    return {
      // 用户分布
      userCityData: []
    }
  },
  components: {
    indexHeader,
    indexFooter,
    pieChart
  },
  methods: {
    // 请求用户分布数据
    async getData () {
      const res = await cityCount()
      if (res.status) {
        this.userCityData = res.user_city
      } else {
        this.$message.error('数据获取失败，请稍后重试')
      }
    }
  },
  // 将beforeMount编译好的html内容替换el指向dom。方法结束后dom结构生成，页面展示出来
  mounted () {
    this.getData()
  }
}
</script>

<style>
</style>
