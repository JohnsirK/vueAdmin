<template>
  <div class="lineCharts">
    <div id="line1" style="width: 100%;height: 450px;"></div>
  </div>
</template>

<script>
// 引入Echarts
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入标题组件
import 'echarts/lib/component/title'
// 引入图例组件
import 'echarts/lib/component/legend'
// 引入工具栏组件
import 'echarts/lib/component/toolbox'
// 引入图标标注组件
import 'echarts/lib/component/markPoint'
// 引入提示框组件
import 'echarts/lib/component/tooltip'
export default {
  props: ['chartsData', 'sevenDay', 'isLoading'],
  methods: {
    initData () {
      // 初始化3条折线颜色
      const colors = ['#5793f3', '#675bba', '#d14a61']
      // 图表选项配置
      const option = {
        // 折线颜色
        color: colors,
        // 图表标题
        title: {
          // 主标题
          text: '走势图',
          // 副标题
          subtext: ''
        },
        // 提示框
        tooltip: {
          // 触发类型
          // axis 坐标轴触发
          trigger: 'axis'
        },
        // 图例组件
        legend: {
          data: ['新注册用户', '新增订单', '新增管理员']
        },
        // 工具栏
        toolbox: {
          // 是否显示工具栏
          show: true,
          // 各工具栏配置项
          feature: {
            // 区域缩放
            dataZoom: {
              yAxisIndex: 'none'
            },
            // 数据视图工具， 可以展示当前图表所用的数据，编辑后可以动态更新
            dataView: {
              // 是否不可编辑，false为不可编辑
              readOnly: false
            },
            // 动态类型切换
            magicType: {
              // type启动的动态类型,包括bar，line
              type: ['bar', 'line']
            },
            restore: {}
          }
        },
        // 直角坐标系grid中的x轴，一般情况下单个grid组件最多只能放上下两个x轴。
        // 多个x轴需要通过配置offset属性防止同个位置多个x轴的重叠
        xAxis: {
          // 坐标轴类型   类目轴，为该类型必须通过data设置类目数据
          type: 'category',
          // 坐标轴两边留白策略
          boundaryGap: false,
          // 类目数据
          data: this.sevenDay
        },
        // 直角坐标系grid中的y轴，同上x
        // 采用数组形式，是因为有多个需要配置
        yAxis: [
          // 左侧y轴配置
          {
            // type 坐标轴类型，value 数值轴
            type: 'value',
            // name 坐标轴名称
            name: '用户',
            // min,max分别为坐标轴刻度最小值和最大值
            min: 0,
            max: 200,
            // y 轴的位置 left。第一个y轴在左侧，另一个y轴在右侧
            position: 'left',
            // 坐标轴轴线相关设置
            axisLine: {
              // 坐标轴轴线样式
              lineStyle: {
                // color颜色
                color: '#999'
              }
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              // 刻度标签的内容格式器，支持字符串模板和回调函数两种格式
              formatter: '{value}'
            }
          },
          // 另一侧y轴配置,配置参数同上
          {
            type: 'value',
            name: '订单',
            min: 0,
            max: 200,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        // 系列列表，每个系列通过type决定自己的图表类型
        series: [
          // 因为有3个，所以需要配置3个对象
          {
            // 系列名称，用于tooltip展示
            name: '新注册用户',
            // 类型
            type: 'line',
            // 系列中的数据内容数组。数组项通常为具体的数据项
            data: this.chartsData[0],
            // 使用y轴的index，在单个图表实例中存在多个y轴时候有用。
            yAxisIndex: 1,
            // 图表标注
            markPoint: {
              // 标注的数据数组，每个数组项都是一个对象，
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          },
          {
            name: '新增订单',
            type: 'line',
            data: this.chartsData[1],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          },
          {
            name: '新增管理员',
            type: 'line',
            data: this.chartsData[2],
            yAxisIndex: 1,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          }
        ]
      }
      // 判断图表loading
      if (this.isLoading) {
        this.myChart.showLoading()
      } else {
        this.myChart.hideLoading()
        // 使用刚指定的配置项和数据显示图表
        this.myChart.setOption(option)
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('line1'))
    this.initData()
  },
  watch: {
    chartsData: function () {
      this.initData()
    },
    sevenDay: function () {
      this.initData()
    }
  }
}
</script>

<style>
</style>
