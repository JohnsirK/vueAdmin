<template>
  <div class="pieDiv">
    <div id="pieCharts" style = "width:100%;height:450px;"></div>
  </div>
</template>

<script>
// 引入echarts组件
import echarts from 'echarts/lib/echarts'
// 引入饼图组件
import 'echarts/lib/chart/pie'
// 引入标题组件
import 'echarts/lib/component/title'
// 引入图例组件
import 'echarts/lib/component/legend'
export default {
  // 父传过的数据
  props: ['dataJson'],
  data () {
    return {}
  },
  // 将beforeMount编译好的html内容替换el绑定到dom上，方法结束后，结构生成，页面显示,
  // 需要在mounted声明周期函数实例化echarts对象，因为要确保dom元素已经挂载到页面中。
  mounted () {
    this.mychart = echarts.init(document.getElementById('pieCharts'))
    this.initData()
  },
  methods: {
    initData () {
      const option = {
        // 图表标题
        title: {
          // 主标题文本
          text: '用户分布',
          // 副标题
          subtext: '',
          // 位置
          left: 'center'
        },
        // 提示框组件
        tooltip: {
          // 触发类型，数据项图形触发
          trigger: 'item',
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种参数
          // a系列名称，b类目值，c数值，d无
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例组件
        legend: {
          // 图例列表的布局朝向
          // horizontal 横 vertical 纵
          orient: 'vertical',
          // 位置
          left: 'left',
          // 数据
          data: ['北京', '上海', '深圳', '杭州', '其他']
        },
        // 设置饼图主要数据来源
        series: [
          {
            // 系列名称
            name: '访问来源',
            // 图形
            type: 'pie',
            // 饼图的半径
            radius: '55%',
            // 饼图中心圆心坐标，数组第一项是横坐标，第二项是纵坐标
            center: ['50%', '60%'],
            // 系列中的数据内容数组，数组项可以为单个数值.
            data: [
              {
                // 数据项的名称
                name: '北京',
                // 数据项的值
                value: this.dataJson.beijing
              },
              {
                name: '上海',
                value: this.dataJson.shanghai
              },
              {
                name: '深圳',
                value: this.dataJson.hangzhou
              },
              {
                name: '其他',
                value: this.dataJson.qita
              }
            ],
            // 图形样式
            itemStyle: {
              // 高亮扇区和标签样式
              emphasis: {
                // 图形阴影的模糊大小
                shadowBlur: 10,
                // 阴影水平方向上的偏移距离
                shadowOffsetX: 0,
                // 阴影颜色
                shadowColor: 'rgba(0, 0, 0, .5)'
              }
            }
          }
        ]
      }
      // 设置项装载到图表中
      this.mychart.setOption(option)
    }
  },
  watch: {
    dataJson: function () {
      this.initData()
    }
  }
}
</script>

<style>
</style>
