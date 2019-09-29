<template>
  <div class="homeRight">
    <index-header></index-header>
      <el-main>
        <el-table v-loading = 'loading' :data = "tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" stripe border>
          <el-table-column lable="#" type="index" width="100"></el-table-column>
          <el-table-column prop = "create_time" label="注册日期" sortable width="180"></el-table-column>
          <el-table-column prop = "user_name" label="用户姓名" width = "180"></el-table-column>
          <el-table-column prop = "city" label="注册地址"></el-table-column>
          <el-table-column prop = "admin" label = "角色权限" width = '180' :filters = "[{ text: '管理员', value: '管理员'}, { text: '超级管理员', value: '超级管理员'}]" :filter-method = 'filterTag' filter-placement = 'bottom-end'>
           <template slot-scope = "scope">
             <el-tag :type = "scope.row.admin === '管理员' ? 'primary' : 'success'" close-transition> {{scope.row.admin}}</el-tag>
           </template>
          </el-table-column>
        </el-table>
        <div class="paginationDiv">
          <el-pagination @size-change = 'changeSize' @current-change = 'changeCurrent' :current-page = "paginationIndex" :page-sizes = "[50,100,200]" :page-size = "50" layout = "total, sizes, prev, pager, next, jumper" :total = "total"></el-pagination>
        </div>
      </el-main>
      <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {allAdmin, allAdminCount} from '@/api/api'
export default {
  data () {
    return {
      tableData: [],
      paginationIndex: 1,
      // 页数
      pageNum: 0,
      // 跳过数据
      offset: 0,
      // 获取数据量
      limit: 50,
      // 加载
      loading: true,
      // 用户数量
      total: 0
    }
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    // 每页多少条
    changeSize (val) {
      console.log('每页' + val + '条')
      this.limit = val
    },
    // 当前页
    changeCurrent (val) {
      console.log('当前页:' + val)
      this.pageNum = val - 1
      console.log(this.pageNum)
    },
    async getUserData () {
      const res = await allAdminCount()
      console.log(res)
      if (res.status) {
        this.total = res.count
      }
    },
    // 获取数据
    async getData () {
      this.loading = true
      this.offset = this.pageNum * this.limit
      const res = await allAdmin(this.limit, this.offset)
      if (res.status) {
        this.loading = false
        this.tableData = res.data
      } else {
        this.loading = false
        console.log(res)
      }
    },
    // 筛选
    filterTag (value, row) {
      return row.admin === value
    }
  },
  created () {
    this.getUserData()
  },
  mounted () {
    this.getData()
  },
  watch: {
    pageNum: function (val) {
      console.log('新值' + val)
      this.getData()
    },
    limit: function (val) {
      this.getData()
    }
  }
}
</script>

<style lang="scss">
  .homeRight {
    width:100%;
    .paginationDiv {
      margin: 10px 0;
    }
  }
</style>
