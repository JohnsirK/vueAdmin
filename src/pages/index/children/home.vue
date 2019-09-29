<template>
  <div class="homeRight">
    <index-header></index-header>
      <el-main class="homeCon" v-loading = 'loading' element-loading-text = '正在加载中,请稍后...' element-loading-spinner = 'el-icon-loading' element-loading-background="rgba(0, 0, 0, 0.8)">
        <h3>
          数据统计
        </h3>
        <el-row class="homeData" :gutter="10">
          <el-col :span = "4">
            <div class="bgColor1 topdiv">
              <b>{{userNum}}</b>
              <p>今日新增用户</p>
            </div>
          </el-col>
          <el-col :span = "4">
            <div class="bgColor2 topdiv">
              <b>{{orderNum}}</b>
              <p>今日新增订单</p>
            </div>
          </el-col>
          <el-col :span = "4">
            <div class="bgColor3 topdiv">
              <b>{{adminNum}}</b>
              <p>今日新增管理员</p>
            </div>
          </el-col>
          <el-col :span = "4">
            <div class="bgColor4 topdiv">
              <b>{{allUserNum}}</b>
              <p>总注册用户</p>
            </div>
          </el-col>
          <el-col :span = "4">
            <div class="bgColor5 topdiv">
              <b>{{allOrderCount}}</b>
              <p>总历史订单</p>
            </div>
          </el-col>
          <el-col :span = "4">
            <div class="bgColor6 topdiv">
              <b>{{allAdminNum}}</b>
              <p>总管理员</p>
            </div>
          </el-col>
        </el-row>
        <h3>
          走势图
        </h3>
        <lineEcharts :chartsData = 'arrData' :sevenDay = 'sevenDay'></lineEcharts>
      </el-main>
      <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {userCount, allUserCount, orderCount, allOrderCount, adminCount, allAdminCount} from '@/api/api'
// 图表
import lineEcharts from '@/components/charts/lineCharts'
export default {
  data () {
    return {
      // 某日API请求量
      apiNum: null,
      // 所有API请求量
      allApiNum: null,
      // 某日用户注册量
      userNum: null,
      // 所有用户注册量
      allUserNum: null,
      // 某天订单数量
      orderNum: null,
      // 所有订单数量
      allOrderCount: null,
      // 某天管理员注册量
      adminNum: null,
      // 所有管理员注册量
      allAdminNum: null,
      // 遮罩
      loading: true,
      // 传递给图表的数据
      arrData: [[], [], []],
      // 往前七天
      sevenDay: [],
      // 图表loading
      isLoading: true
    }
  },
  computed: {
    getDateFunc () {
      const date = new Date()
      return date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  methods: {
    // 请求量所有请求
    // 依次为 某日api请求量 -> 某日用户新增量 -> 某日订单量 -> 新增管理员量 -> 所有api请求量 -> 所有用户新增量 -> 所有订单量 ->所有管理员量
    async allPromise () {
      Promise.all([userCount(this.getDateFunc), orderCount(this.getDateFunc), adminCount(this.getDateFunc), allUserCount(), allOrderCount(), allAdminCount()])
        .then(res => {
          console.log(res)
          this.loading = false
          // 某日用户注册量
          this.userNum = res[0].count
          // 某天订单数量
          this.orderNum = res[1].count
          // 某天管理员注册量
          this.adminNum = res[2].count
          // 所有用户注册量
          this.allUserNum = res[3].count
          // 所有订单数量
          this.allOrderCount = res[4].count
          // 所有管理员注册量
          this.allAdminNum = res[5].count
        }).catch(err => {
          console.log(err)
          this.$message.error('发生错误，请刷新页面或稍后再试！')
        })
    },
    // 往前七天
    getSevenDay () {
      let newDate = new Date()
      newDate.setDate(newDate.getDate() - 6)
      let now
      let flag = 1
      for (let i = 0; i < 7; i++) {
        now = newDate.getFullYear() + '-0' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
        this.sevenDay.push(now)
        newDate.setDate(newDate.getDate() + flag)
      }
      console.log(this.sevenDay)
    },
    async getSevenDate () {
      const arr = [[], [], []]
      this.sevenDay.forEach(item => {
        arr[0].push(userCount(item))
        arr[1].push(orderCount(item))
        arr[2].push(adminCount(item))
      })
      const promiseArr = [...arr[0], ...arr[1], ...arr[2]]
      Promise.all(promiseArr).then(res => {
        const resArr = [[], [], []]
        res.forEach((item, index) => {
          if (item.status === 1) {
            resArr[Math.floor(index / 7)].push(item.count)
          }
        })
        this.arrData = resArr
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    indexHeader,
    indexFooter,
    lineEcharts
  },
  mounted () {
    this.allPromise()
    this.getSevenDay()
    this.getSevenDate()
  }
}
</script>

<style lang = "scss">
  .homeRight {
    width:100%;
    .homeCon {
      h3 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
      }
      .homeData {
        margin:20px 0;
        .topdiv {
          display: flex;
          padding:10px 0;
          flex-direction: column;
          align-items: center;
          color:#fff;
          b{
            font-size:24px;
            font-weight: normal;
          }
        }
        .bgColor1{
          background: #F64747;
        }
        .bgColor2{
          background: #ff9704;
        }
        .bgColor3{
          background: #00B16A;
        }
        .bgColor4{
          background: #22A7F0;
        }
        .bgColor5{
          background: #7f8cd0;
        }
        .bgColor6{
          background: #ca75de;
        }
      }
    }
  }
</style>
