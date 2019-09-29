<template>
  <div class="homeRight">
    <index-header></index-header>
      <el-main>
        <el-table v-loading = 'loading' :data = 'shopData' style="width: 100%">
          <el-table-column type = "expand">
            <template slot-scope = 'props'>
              <el-form label-position = "left" inline class="demo-table-expand">
                <el-form-item label = "商品名称">
                  <span>{{props.row.name}}</span>
                </el-form-item>
                <el-form-item label = "店铺地址">
                  <span>{{props.row.address}}</span>
                </el-form-item>
                <el-form-item label = "店铺介绍">
                  <span>{{props.row.description}}</span>
                </el-form-item>
                <el-form-item label = "店铺 ID">
                  <span>{{props.row.id}}</span>
                </el-form-item>
                <el-form-item label = "联系电话">
                  <span>{{props.row.phone}}</span>
                </el-form-item>
                <el-form-item label = "评分">
                  <span>{{props.row.rating}}</span>
                </el-form-item>
                <el-form-item label = "销售量">
                  <span>{{props.row.recent_order_num}}</span>
                </el-form-item>
                <el-form-item label = "分类">
                  <span>{{props.row.category}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label = "店铺名称" prop="name"></el-table-column>
          <el-table-column label = "店铺地址" prop="address"></el-table-column>
          <el-table-column label = "店铺介绍" prop="description"></el-table-column>
          <el-table-column label="操作" >
            <template slot-scope = "scope">
              <el-button @click="editShop(scope.row, scope.$index)" type = "warning" size = "mini">
                编辑
              </el-button>
              <el-button @click="removeShop(scope.row, scope.$index)" type = "danger" size = "mini">
                删除
              </el-button>
              <el-button @click="replaceShop(scope.row, scope.$index)" type = "success" size = "mini">
                添加食品
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="m10">
          <el-pagination @size-change = "changeSize" @current-change = 'changeCurrent' :current-page = 'indexPagination' :page-sizes = "[50,100,200]" :page-size = "50" layout = "total, sizes, prev, pager, next, jumper" :total = "total">
          </el-pagination>
        </div>
      </el-main>
      <index-footer></index-footer>
      <el-dialog title="修改店铺信息" :visible.sync = "editDialog" width = "40%">
        <el-form :model="shopInfo" label-width="100px">
          <el-form-item label="店铺名称">
            <el-input v-model="shopInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="shopInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <el-input v-model="shopInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="shopInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader :options = "selectData" change-on-select = 'true' v-model = "selectCategory"></el-cascader>
          </el-form-item>
          <el-form-item label="商铺图片">
            <el-upload class="avatar-uploader" action = "//elm.cangdu.org/v1/addimg/shop" :show-file-list = "false" :on-success = "upImgSuccess" :before-upload = "uploadBefore">
              <img v-if="shopInfo.image_path" :src="imgUrl + shopInfo.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot = "footer" class="dialog-footer">
          <el-button :loading = "editing" type = "primary" @click = "upData(shopInfo)">
            {{editing ? '修改中' : '确定'}}
          </el-button>
          <el-button @click = "editDialog = false">取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {shopList, allShopCount, shopCategory, updateShop, deleteShop} from '@/api/api'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      // 图片地址
      imgUrl: '//elm.cangdu.org/img/',
      shopList: [],
      indexPagination: 1,
      // 当前页
      pageNum: 0,
      // 跳过多少个
      offset: 0,
      // 显示多少条数据
      limit: 50,
      // 餐馆数据
      shopData: [],
      // 总数据
      total: 0,
      // loading
      loading: true,
      // 编辑店铺弹窗
      editDialog: false,
      // 需要修改的店铺数据
      shopInfo: {},
      // 选中的餐馆原数据
      oldShopInfo: {},
      // 店铺分类默认值
      selectCategory: [],
      // 店铺分类数组数据
      selectData: [],
      // 修改中loading
      editing: false
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    // 编辑
    editShop (row, index) {
      this.editDialog = true
      this.oldShopInfo = {
        // 名称
        name: row.name,
        // 地址
        address: row.address,
        // 介绍
        description: row.description,
        // 电话
        phone: row.phone,
        // 店铺图片地址
        imagePath: row.image_path,
        // 店铺分类
        category: row.category
      }
      console.log(this.oldShopInfo)
      this.shopInfo = row
      this.selectCategory = row.category.split('/')
      console.log(this.selectCategory)
      console.log(row, index)
    },
    // 删除
    removeShop (row, index) {
      console.log(row, index)
      if (this.userinfo && this.userinfo.admin === '超级管理员') {
        this.delShop(row.id)
      } else {
        this.$message.error('对不起，您没有删除店铺的权限！')
      }
    },
    // 删除店铺
    async delShop (id) {
      let res = await deleteShop(id)
      console.log(res)
    },
    // 添加食品
    replaceShop (row, index) {
      console.log(row, index)
      this.$router.push({path: '/addData/addFood', query: {id: row.id}})
    },
    // 每页多少条
    changeSize (val) {
      this.limit = val
    },
    // 当前页
    changeCurrent (val) {
      this.pageNum = val - 1
    },
    // 获取餐馆列表
    async getShopData () {
      this.loading = true
      this.offset = this.limit * this.pageNum
      let res = await shopList(31.22967, 121.4762, this.offset, this.limit)
      if (res) {
        this.loading = false
        this.shopData = res
      }
    },
    // 获取餐馆总数
    async shopCount () {
      let res = await allShopCount()
      if (res.status === 1) {
        this.total = res.count
      }
    },
    // 获取餐馆种类数据
    async getShopCategory () {
      let res = await shopCategory(31.22967, 121.4762)
      console.log(res)
      res.forEach(item => {
        if (item.sub_categories.length) {
          const addNew = {
            value: item.name,
            label: item.name,
            children: []
          }
          item.sub_categories.forEach((i, index) => {
            if (index === 0) {
              return false
            }
            addNew.children.push({
              value: i.name,
              label: i.name
            })
          })
          this.selectData.push(addNew)
        }
      })
    },
    // 更新餐馆数据
    async upData (shopInfo) {
      this.editing = true
      const cg = this.selectCategory.join('/')
      // 首先检测用户有没有修改某项数据，如未修改则不保存和发送请求
      if (this.oldShopInfo.name === shopInfo.name && this.oldShopInfo.address === shopInfo.address && this.oldShopInfo.description === shopInfo.description && this.oldShopInfo.phone === shopInfo.phone && this.oldShopInfo.imagePath === this.shopInfo.image_path && this.oldShopInfo.category === cg) {
        this.editing = false
        this.editDialog = false
        this.$message.success('您未做任何修改')
        return false
      } else {
        // 更新餐馆需要的参数为
        // id 餐馆id， name 餐馆名称 ，address 餐馆地址 description餐馆介绍可选
        // phone 联系电话 image_path 店铺图片地址 category 店铺分类
        let res = await updateShop(shopInfo.id, shopInfo.name, shopInfo.address, shopInfo.description, parseInt(shopInfo.phone), this.shopInfo.image_path, cg)
        console.log(res)
        if (res.status) {
          this.editing = false
          this.getShopData()
          this.$message.success(res.success)
          this.editDialog = false
        } else {
          this.editing = false
          this.editDialog = false
          this.$message.error(res.message)
        }
      }
    },
    // 文件上传成功时钩子
    // res表示返回值，file表示上传对象
    upImgSuccess (res, file) {
      if (res.status === 1) {
        this.shopInfo.image_path = res.image_path
      } else {
        this.$message.error('上传图片失败')
      }
    },
    // 上传文件之前的钩子
    // 参数为上传的文件
    uploadBefore (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const is2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG格式')
      }
      if (!is2M) {
        this.$message.error('上传头像图片大小不能超过2MB')
      }
      return isJPG && is2M
    }
  },
  watch: {
    limit: function () {
      this.getShopData()
    },
    pageNum: function () {
      this.getShopData()
    }
  },
  created () {
    this.shopCount()
  },
  mounted () {
    this.getShopData()
    this.getShopCategory()
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
    .paginationDiv {
      margin:10px 0
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
