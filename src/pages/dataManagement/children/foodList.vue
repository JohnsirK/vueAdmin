<template>
  <div class="homeRight">
    <index-header></index-header>
      <el-main>
        <el-table v-loading = 'loading' :data = 'foodData' style = "width: 100%" @expand-change = 'expand' :row-key = 'row => row.index' :expand-row-keys = 'expands' ref = "tableList">
          <el-table-column type = "expand">
            <template slot-scope = 'props'>
              <el-form label-position = 'left' inline class="demo-table-expand">
                <el-form-item label = "食品名称">
                  <span>
                    {{props.row.name}}
                  </span>
                </el-form-item>
                <el-form-item label = "餐馆名称">
                  <span>
                    {{props.row.restaurant_name}}
                  </span>
                </el-form-item>
                <el-form-item label = '食品ID'>
                  <span>
                    {{props.row.item_id}}
                  </span>
                </el-form-item>
                <el-form-item label = '餐馆ID'>
                  <span>
                    {{props.row.restaurant_id}}
                  </span>
                </el-form-item>
                <el-form-item label = '食品介绍'>
                  <span>
                    {{props.row.description}}
                  </span>
                </el-form-item>
                <el-form-item label = '餐馆地址'>
                  <span>
                    {{props.row.restaurant_address}}
                  </span>
                </el-form-item>
                <el-form-item label = '食品评分'>
                  <span>
                    {{props.row.rating}}
                  </span>
                </el-form-item>
                <el-form-item label = '食品分类'>
                  <span>
                    {{props.row.category_name}}
                  </span>
                </el-form-item>
                <el-form-item label = '月销量'>
                  <span>
                    {{props.row.month_sales}}
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label = '食品名称' prop = 'name'></el-table-column>
          <el-table-column label = '食品介绍' prop = 'description'></el-table-column>
          <el-table-column label = '评分' prop = 'rating'></el-table-column>
          <el-table-column label = '操作'>
            <template slot-scope = 'scope'>
              <el-button @click = 'editFood(scope.row, scope.$index)' type = 'warning' size = 'mini'>
                编辑
              </el-button>
              <el-button @click = 'removeFood(scope.row, scope.$index)' type = 'danger' size = 'mini'>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="m10">
          <el-pagination @size-change = 'changeSize' @current-change = 'changeCurrent' :current-page = 'initNum' :page-sizes = '[50,100,200]' :page-size = "50" layout = 'total, sizes, prev, pager, next, jumper' :total = 'foodNum'></el-pagination>
        </div>
      </el-main>
      <index-footer></index-footer>
      <!-- 编辑数据 -->
      <el-dialog title = "修改食品信息" :visible.sync = 'editFoodShow' width = "40%">
        <el-form :model="editNow" label-width="100px">
          <el-form-item label = '食品名称'>
            <el-input v-model = 'editNow.name' auto-complete = off></el-input>
          </el-form-item>
          <el-form-item label = '食品介绍'>
            <el-input v-model = 'editNow.description' auto-complete = off></el-input>
          </el-form-item>
          <el-form-item label = '食品分类'>
            <el-select v-model = 'selectIndex' :placeholder="selectMenu.label" @change = "editSelect">
              <el-option v-for="(item, index) in menu" :label = 'item.label' :value = 'item.index' :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label = '食品图片'>
            <el-upload class="avatar-uploader" action = '//elm.cangdu.org/v1/addimg/food' :show-file-list = 'false' :on-success = 'upImgSuccess' :before-upload = 'uploadBefore'>
              <img v-if="editNow.image_path" :src="imgUrl + editNow.image_path" class="avatar">
              <i v-else class = "el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-table class="editTable" size = 'mini' stripe border :data = 'editNow.specfoods' style="width:100%" :header-cell-style = '{background: "#eef1f6", color: "#606266", textAlign: "center"}' :cell-style = '{textAlign: "center"}'>
          <el-table-column prop = "specs_name" label = "规格"></el-table-column>
          <el-table-column prop = "packing_fee" label = '包装费'></el-table-column>
          <el-table-column prop = 'price' label = '价格'></el-table-column>
          <el-table-column label = '操作'>
            <template slot-scope = 'scope'>
              <el-button type = 'danger' size = 'mini' @click = 'delRow(scope.$index, scope.row)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p class="m10 tc">
          <el-button type = 'warning' @click = 'addSpec = true'>
            添加规格
          </el-button>
        </p>
        <!-- 添加规格 嵌套-->
        <el-dialog title = '添加规格' :visible.sync = 'addSpec' width = "400px" append-to-body>
          <el-form :model = 'specData' label-width="100px" size = "small" :rules="rules" ref="specForm">
            <el-form-item label = '规格名称' prop="specs_name">
              <el-input v-model = 'specData.specs_name' auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label = '配送费'>
              <el-input-number size="small" v-model = 'specData.packing_fee' :min = '0'></el-input-number>
            </el-form-item>
            <el-form-item label = '价格'>
              <el-input-number size="small" v-model = 'specData.price' :min = "10"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot = "footer" class = "dialog-footer">
            <el-button @click = 'addSpecClick("specForm", specData)' type = 'primary'>添加</el-button>
            <el-button @click = 'addSpec = false'>取消</el-button>
          </div>
        </el-dialog>
        <!-- 修改食品底部 -->
        <div slot = 'footer' class = "dialog-footer">
          <el-button type="primary" @click = "editFoodBtn" :loading="isEdit">
             {{isEdit ? '修改中' : '确认修改'}}
          </el-button>
          <el-button @click = "editFoodShow = false">
            取消
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {delFood, foodCount, foodList, shopInfo, foodInfo, getMenu, upFood} from '@/api/api'
export default {
  data () {
    return {
      // 图片地址
      imgUrl: '//elm.cangdu.org/img/',
      // 食品数据
      foodData: [],
      // 当前行的数据
      nowData: [],
      // 初始页面位置
      initNum: 1,
      // 食品数量
      foodNum: 0,
      // 页面
      pageNum: 0,
      // 一页多少数据
      limit: 50,
      // 跳过多少数据
      offset: 0,
      // loading
      loading: true,
      //
      id: undefined,
      // 展开关闭
      num: 1,
      // 种类详情
      cateRes: null,
      // 要展开的行，数组的元素是row的key值
      expands: [],
      // 修改食品信息弹出框
      editFoodShow: false,
      // 选中编辑当前行
      editNow: {},
      // 食品分类
      selectIndex: null,
      // 食品菜单
      selectMenu: '',
      // 规格弹出框
      addSpec: false,
      // 规格数据
      specData: {
        // 规格名称
        specs_name: '',
        // 包装费
        packing_fee: 0,
        // 价格
        price: 10
      },
      rules: {
        specs_name: [
          {required: true, message: '请输入规格名称', trigger: 'blur'}
        ]
      },
      // 产品分类数组
      menu: [],
      // 上传成功之后的图片地址
      successImageUrl: '',
      // 是否修改中
      isEdit: false
    }
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    // 编辑
    editFood (row, index) {
      this.editFoodShow = true
      this.editNow = row
      // 需要用到加载数据
      this.changeData(row)
      // 需要用到menu数据
      this.getMenuData()
      console.log(this.editNow)
    },
    // 删除
    async removeFood (row, index) {
      const res = await delFood(row.item_id)
      console.log(row, index)
      if (res.status === 0) {
        this.$message.error('对不起，您的权限不足！')
      } else {
        this.$message.success('删除成功！')
        this.foodData.splice(index, 1)
      }
    },
    // 初始化
    async initData () {
      const res = await foodCount()
      if (res.status === 1) {
        this.foodNum = res.count
      } else {
        console.log('获取数据失败')
      }
      this.getFoods()
    },
    // 获取食品数据
    async getFoods () {
      this.loading = true
      this.offset = this.limit * this.pageNum
      const res = await foodList(this.limit, this.offset, this.$route.query.id)
      if (res) {
        this.loading = false
        this.foodData = []
        res.forEach((item, index) => {
          const obj = {}
          // 标题
          obj.name = item.name
          // 食品id
          obj.item_id = item.item_id
          // 食品详情
          obj.description = item.description
          // 评分
          obj.rating = item.rating
          // 月销量
          obj.month_sales = item.month_sales
          // 餐馆id
          obj.restaurant_id = item.restaurant_id
          // 食品种类id
          obj.category_id = item.category_id
          // 图片地址
          obj.image_path = item.image_path
          // 规格
          obj.specfoods = item.specfoods
          // 下标
          obj.index = index
          this.foodData.push(obj)
        })
      }
    },
    // 展开行
    expand (row, status) {
      let that = this
      if (status.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.index)
        }
      } else {
        that.expands = []
      }
      if (status) {
        this.changeData(row)
      } else {
        const index = this.expands.indexOf(row.index)
        this.expands.splice(index, 1)
      }
    },
    // 加载添加数据
    async changeData (row, type) {
      // 餐馆详情
      const res = await shopInfo(row.restaurant_id)
      // 获取食品种类详情
      const res2 = await foodInfo(row.category_id)
      Promise.all([res, res2]).then(value => {
        // 当前行数据
        // 为当前行数据添加新的属性
        this.nowData = {
          ...row, ...{restaurant_name: value[0].name, restaurant_address: value[0].address, category_name: value[1].name}
        }
        this.selectMenu = {label: res2.name, value: row.category_id}
        // 添加新属性之后将原数据里面的该行数据替换
        this.foodData.splice(row.index, 1, {...this.nowData})
        // 修改当前显示的index。之所以用nextTick是因为防止数据修改页面没修改
      }).catch(err => {
        console.log(err)
      })
    },
    // 每页多少条
    changeSize (val) {
      this.limit = val
    },
    // 当前页
    changeCurrent (val) {
      this.pageNum = val - 1
    },
    // 上传图片 :on-success对应上传成功钩子，before-upload 对应上传之前钩子
    // 上传文件之前， 用于判断文件大小和格式，参数为上传的文件
    uploadBefore (file) {
      // 判断类型
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      // 判断是否2M以上
      const is2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传菜品图片只能是JPG或者PNG格式')
      }
      if (!is2M) {
        this.$message.error('上传菜品图片大小不能超过2MB')
      }
      return isJPG && is2M
    },
    // 上传成功
    // res表示返回值，file表示上传的文件
    upImgSuccess (res, file) {
      if (res.status === 1) {
        this.editNow.image_path = res.image_path
      } else {
        this.$message.error('上传图片失败')
      }
    },
    // 修改食品中删除规格
    delRow (index, row) {
      this.editNow.specfoods.splice(index, 1)
    },
    // 添加规格
    addSpecClick (name, value) {
      console.log(value)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.editNow.specfoods.push({...this.specData})
          this.specData.specs_name = ''
          this.specData.packing_fee = 0
          this.specData.price = 10
          this.addSpec = false
        } else {
          return false
        }
      })
    },
    // 产品分类获取
    async getMenuData () {
      this.menu = []
      console.log(this.editNow.restaurant_id)
      const res = await getMenu(this.editNow.restaurant_id)
      console.log(res)
      res.forEach((item, index) => {
        this.menu.push({
          label: item.name,
          value: item.id,
          index
        })
      })
    },
    // 食品分类select框修改值
    editSelect (index) {
      this.selectIndex = index
      this.selectMenu = this.menu[index]
    },
    // 确认修改
    async editFoodBtn () {
      this.isEdit = true
      // 由于后端需要的规格参数有错误，所以在此修改
      // 原规格数组
      let obj = this.editNow.specfoods
      // 临时数组
      let arr = []
      obj.map(item => {
        // 规格中的每一项都循环push进临时数组
        arr.push({
          specs: item.specs_name,
          packing_fee: item.packing_fee,
          price: item.price
        })
      })
      const res = await upFood(this.editNow.item_id, this.editNow.name, this.editNow.image_path, this.editNow.restaurant_id, this.editNow.category_id, arr)
      if (res) {
        this.isEdit = false
        this.$message.success('修改成功！')
      }
      this.editFoodShow = false
    }
  },
  mounted () {
    this.initData()
  },
  watch: {
    limit: function () {
      this.getFoods()
    },
    pageNum: function () {
      this.getFoods()
    }
  }
}
</script>

<style lang = "scss">
  .homeRight {
    width:100%;
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 45%;
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
