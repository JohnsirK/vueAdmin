<template>
  <div class="homeRight">
    <index-header></index-header>
      <el-main>
        <el-table :data = 'orderData' style="width:100%" @expand-change = 'showMoreData' :row-key = 'row => row.index'>
          <el-table-column type = "expand">
            <template slot-scope = "props">
              <el-form label-position = "left" inline class="demo-table-expand">
                <el-form-item label = "用户名">
                  <span>
                    {{props.row.user_name}}
                  </span>
                </el-form-item>
                <el-form-item label = "店铺名称">
                  <span>
                    {{props.row.restaurant_name}}
                  </span>
                </el-form-item>
                <el-form-item label = "收货地址">
                  <span>
                    {{props.row.address}}
                  </span>
                </el-form-item>
                <el-form-item label = "店铺 ID">
                  <span>
                    {{props.row.restaurant_id}}
                  </span>
                </el-form-item>
                <el-form-item label = "店铺地址">
                  {{props.row.restaurant_address}}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单ID" prop = "id"></el-table-column>
          <el-table-column label="总价格" prop = "total_amount"></el-table-column>
          <el-table-column label="下单时间" prop = "formatted_created_at"></el-table-column>
          <el-table-column label="订单状态" prop = "status"></el-table-column>
        </el-table>
        <div class="m10">
          <el-pagination @size-change = "changeSize" @current-change = "changeCurrent" :current-page = "indexPage" :page-sizes = "[50, 100, 200]" :page-size = "50" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
      </el-main>
      <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {orderList, addressInfo, allOrderCount, userInfo, shopInfo} from '@/api/api'
export default {
  data () {
    return {
      // 订单数据
      orderData: [],
      // 跳过数据
      offset: 0,
      // 获取数据量
      limit: 50,
      // 默认页数
      indexPage: 1,
      // 总页数
      total: 0,
      // 页码
      page: 0,
      // 更多数据
      moreData: []
    }
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    async getOrderData () {
      if (!this.total) {
        const num = await allOrderCount()
        this.total = num.count
      }
      this.offset = this.page * this.limit
      const res = await orderList(this.limit, this.offset)
      this.orderData = []
      res.forEach((item, index) => {
        const addTable = {}
        // 订单id
        addTable.id = item.id
        // 订单总价
        addTable.total_amount = item.total_amount
        // 订单状态
        addTable.status = item.status_bar.title
        // 下单时间
        addTable.formatted_created_at = item.formatted_created_at
        // 用户id
        addTable.user_id = item.user_id
        // 店铺id
        addTable.restaurant_id = item.restaurant_id
        // 地址id
        addTable.address_id = item.address_id
        // index
        addTable.index = index
        this.orderData.push(addTable)
      })
    },
    // 每页多少条
    changeSize (val) {
      this.limit = val
      console.log(val)
    },
    // 当前页
    changeCurrent (val) {
      this.page = val - 1
      console.log(val)
    },
    // 展示更多信息
    async showMoreData (row, expandRows) {
      // 判断当前订单id数组里面有没有，有的话说明不是第一次请求，
      if (row.id !== this.moreData) {
        // 餐馆详情
        const shop = await shopInfo(row.restaurant_id)
        // 用户信息
        const user = await userInfo(row.user_id)
        // 地址详情
        const ars = await addressInfo(row.address_id)
        // 所有数据汇成一个新数组对象
        Promise.all([shop, user, ars]).then(value => {
          if (value) {
            this.orderData.splice(row.index, 1, {...row, restaurant_name: value[0].name, restaurant_address: value[0].address, address: value[2].address, user_name: value[1].username})
          }
        })
        this.moreData = row.id
      } else {
        console.log('已加载过')
      }
    }
  },
  // 将beforeMount编译好的html内容替换el属性指向dom对象，方法结束后dom结构完成，页面显示
  mounted () {
    this.getOrderData()
  },
  watch: {
    page: function () {
      this.getOrderData()
    },
    limit: function () {
      this.getOrderData()
    }
  }
}
</script>

<style lang = "scss">
  .homeRight {
    width:100%;
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
