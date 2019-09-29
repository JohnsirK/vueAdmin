<template>
  <div class="homeRight">
    <index-header></index-header>
    <el-main>
      <div class="border">
        <h4 class = "tc h4">
          选择食品种类
        </h4>
        <el-form :model = "categoryFood" ref = "categoryForm" label-width = "110px" class="w50 bor1">
          <el-form-item label = "食品种类" class="p10">
            <el-select v-model = "categoryFood.categorySelect" placeholder= "请选择" class="w100" @change = 'selected'>
              <el-option v-for = "(item, index) in categoryList" :key = "index" :label = "item.label" :value = "item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-collapse-transition>
            <div class="bg1 p10 transition-box" v-if = "isAdd">
              <el-form-item label = "食品种类">
                <el-input v-model = "categoryFood.newCategory" placeholder="请输入食品种类"></el-input>
              </el-form-item>
              <el-form-item label = "种类描述">
                <el-input v-model = "categoryFood.newInfo" placeholder="请输入种类描述"></el-input>
              </el-form-item>
              <el-form-item label = "" class="mb10">
                <el-button type = "primary" @click = "addNewCategory" :loading = "loading">{{loading ? '添加中' : '添加'}}</el-button>
              </el-form-item>
            </div>
          </el-collapse-transition>
          <div class="bot" @click = 'isAdd = !isAdd'>
            <i v-if = "isAdd" class="el-icon-arrow-up"></i>
            <i v-else  class="el-icon-arrow-down"></i>
            添加食品种类
          </div>
        </el-form>
      </div>
      <div class="border">
        <h4 class="tc h4">
          添加食品
        </h4>
        <el-form class="bor1 w50 p21" :model = "addFoodData" :rules="rules" label-width = '110px' ref = 'foodForm'>
          <el-form-item label = "食品名称" prop = "name">
            <el-input v-model = "addFoodData.name" placeholder="请输入食品名称"></el-input>
          </el-form-item>
          <el-form-item label = "食品活动">
            <el-input v-model = "addFoodData.huodong" placeholder="请输入食品活动"></el-input>
          </el-form-item>
          <el-form-item label = "食品详情">
            <el-input v-model = "addFoodData.description"></el-input>
          </el-form-item>
          <el-form-item label = "上传食品图片" prop = 'imageUrl'>
            <el-upload class="avatar-uploader" action = "//elm.cangdu.org/v1/addimg/food" :show-file-list = 'false' :on-success = "foodSuccess" :before-upload = "foodBefore">
              <img v-if = "addFoodData.imageUrl" :src="baseUrl + addFoodData.imageUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label = "食品特点">
            <el-select v-model = "addFoodData.tedian" placeholder="请选择食品特点" @change = 'tedianFunc'>
              <el-option v-for="(item, index) in tedianList" :key = "index" :label = "item.label" :value = "item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label = "食品规格">
            <el-radio v-model = "addFoodData.guige" label = "1">单规格</el-radio>
            <el-radio v-model = "addFoodData.guige" label = "2">多规格</el-radio>
          </el-form-item>
          <template v-if = "addFoodData.guige === '1'">
            <el-form-item label = "包装费">
              <el-input-number size = "small" v-model = "addFoodData.packing_fee" :min = '0'></el-input-number>
            </el-form-item>
            <el-form-item label = "价格">
              <el-input-number size = "small" v-model = "addFoodData.money" :min = "0"></el-input-number>
            </el-form-item>
          </template>
          <template v-else>
            <p class="tc">
              <el-button type = "primary" @click = 'addDialog = true'>
                添加规格
              </el-button>
            </p>
            <el-table :data = 'addTable' border stripe style="margin-top:10px;">
              <el-table-column label = "规格" prop = "name"></el-table-column>
              <el-table-column label = "包装费" prop = "m1"></el-table-column>
              <el-table-column label = "价格" prop = "m2"></el-table-column>
              <el-table-column label = "操作" width = "120">
                <template slot-scope = "scope">
                  <el-button size = "mini" type = "danger" @click = "del(scope.$index)">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <p class="tc mt10">
            <el-button type="primary" @click = "addNewFood('foodForm')" :loading = "loading">确定添加</el-button>
          </p>
        </el-form>
      </div>
    </el-main>
    <index-footer></index-footer>
    <!-- 添加规格 -->
    <el-dialog title = '添加规格' :visible.sync = "addDialog" width="500px">
      <el-form :model = "dialogData" label-width = "100px">
        <el-form-item label = "规格">
          <el-input v-model = "dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label = "包装费">
          <el-input-number size = "small" v-model = "dialogData.m1" :min = '0'></el-input-number>
        </el-form-item>
        <el-form-item label = "价格">
          <el-input-number size = "small" v-model = "dialogData.m2" :min = "0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot = "footer" class="dialog-footer">
        <el-button type = "primary" @click = "addData(dialogData)">添加</el-button>
        <el-button @click = "addDialog = false">取消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {nowCategory, addCategory, addFood} from '@/api/api'
export default {
  data () {
    return {
      // 按钮加载中
      loading: false,
      // 传参过来的餐馆id
      restaurant_id: this.$route.query.id || '',
      // 图片地址
      baseUrl: '//elm.cangdu.org/img/',
      // 食品种类
      categoryFood: {
        // 食品种类选中值
        categorySelect: '',
        // 新增种类
        newCategory: '',
        // 新增种类描述
        newInfo: ''
      },
      // 食品种类数据
      categoryList: [],
      // 是否添加食品种类
      isAdd: false,
      // 添加食品数据
      addFoodData: {
        // 食品名称
        name: '',
        // 食品活动
        huodong: '',
        // 食品详情
        description: '',
        // 上传食品图片
        imageUrl: null,
        // 食品特点
        tedian: '',
        // 规格
        guige: '1',
        // 包装费
        packing_fee: 0,
        // 价格
        money: 20
      },
      // 食品特点数据
      tedianList: [
        {
          label: '新品',
          value: '新品'
        },
        {
          label: '招牌',
          value: '招牌'
        }
      ],
      // 添加规格
      addTable: [
        {
          name: '默认',
          m1: 1,
          m2: 20
        }
      ],
      // 添加规格默认数据
      dialogData: {
        name: '',
        m1: 0,
        m2: 20
      },
      // 添加规格弹窗
      addDialog: false,
      // 分类id
      category_id: null,
      // 最终规格
      spec: null,
      // 特点
      tedianArr: [],
      rules: {
        name: [
          {required: true, message: '请输入食品名称', trigger: 'blur'}
        ],
        imageUrl: [
          {required: true, message: '请上传图片', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    // 上传成功
    foodSuccess (res, file) {
      if (res.status) {
        if (res.status === 1) {
          this.addFoodData.imageUrl = res.image_path
        } else {
          this.$message.error('上传失败')
        }
        console.log(file)
      }
    },
    // 上传之前
    foodBefore (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const is2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片格式只能是png或者jpg')
      }
      if (!is2M) {
        this.$message.error('图片大小超过2M')
      }
      return isJPG && is2M
    },
    // 删除规格
    del (index) {
      this.addTable.splice(index, 1)
    },
    // 添加规格
    addData (value) {
      if (this.dialogData.name === '' || !this.dialogData.name) {
        this.$message.error('规格不能为空')
      } else {
        console.log(this.dialogData)
        this.addTable.push({...this.dialogData})
        this.dialogData.name = ''
        this.dialogData.m1 = 0
        this.dialogData.m2 = 20
      }
      this.addDialog = false
    },
    // 餐馆id是否为空
    isShopId () {
      if (!this.restaurant_id) {
        this.$confirm('当前尚未选择商铺，是否先返回选择商铺?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/dataManage/shopList')
        }).catch(() => {
          this.restaurant_id = Math.ceil(Math.random() * 10)
        })
      }
    },
    // 获取食品种类
    async getCategoryData () {
      const res = await nowCategory(this.restaurant_id)
      console.log(res)
      if (res.status) {
        res.category_list.map((item, index) => {
          item.value = index
          item.label = item.name
        })
        this.categoryList = res.category_list
      }
    },
    // 添加新的食品种类
    async addNewCategory () {
      if (!this.categoryFood.newCategory) {
        this.$message.error('新增食品种类不能为空')
      } else if (!this.categoryFood.newInfo) {
        this.$message.error('新增食品详情不能为空')
      } else {
        this.loading = true
        const res = await addCategory(this.categoryFood.newCategory, this.categoryFood.newInfo, this.restaurant_id)
        if (res.status) {
          this.loading = false
          this.$message.success('添加新食品分类成功！')
          this.getCategoryData()
          this.categoryFood.newCategory = ''
          this.categoryFood.newInfo = ''
        } else {
          this.loading = false
          this.$message.error(res.message)
        }
      }
    },
    // 添加新食品
    addNewFood (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addFunc()
        } else {
          console.log('错误')
        }
      })
    },
    // 选择框
    selected (row) {
      this.category_id = this.categoryList[row].id
    },
    // 食品特点
    tedianFunc (row) {
      console.log(row)
      switch (row) {
        case '新品':
          this.tedianArr.push({
            value: '新',
            label: '新品'
          })
          break
        case '招牌':
          this.tedianArr.push({
            value: '招',
            label: '招牌'
          })
          break
      }
      console.log(this.tedianArr)
    },
    async addFunc () {
      if (this.addFoodData.guige === '1') {
        const arr = []
        arr.push({
          specs: '默认',
          packing_fee: this.addFoodData.packing_fee,
          price: this.addFoodData.money
        })
        this.spec = arr
      } else {
        const arr = []
        this.addTable.forEach((item, index) => {
          arr.push({
            specs: item.name,
            packing_fee: item.m1,
            price: item.m2
          })
        })
        this.spec = arr
      }
      this.loading = true
      const res = await addFood(
        // 餐馆id
        this.restaurant_id,
        // 分类id
        this.category_id,
        // 食品名称
        this.addFoodData.name,
        // 图片地址
        this.addFoodData.imageUrl,
        // 规格
        this.spec,
        // 描述
        this.addFoodData.description,
        // 活动
        this.addFoodData.huodong,
        // 特点
        this.tedianArr
      )
      if (res.status) {
        this.$message.success('添加食品成功')
        this.loading = false
        this.resetForm()
      } else {
        this.$message.error(res.message)
        this.loading = false
      }
    },
    // 重置表单
    resetForm () {
      this.$refs['foodForm'].resetFields()
    }
  },
  mounted () {
    this.isShopId()
    this.getCategoryData()
  }
}
</script>

<style lang="scss">
.bot {
  padding:10px;
  color:#666;
  font-size:16px;
  text-align: center;
  border-top: 1px solid #eaeefb;
  cursor:pointer;
  i {
    margin-right:5px;
  }
}
.bor1 {
  border: 1px solid #eaeefb;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(195, 195, 195, .6);
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.p21 {
  padding:20px 10px 10px 10px
}
</style>
