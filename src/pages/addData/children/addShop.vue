<template>
  <div class="homeRight">
    <index-header></index-header>
    <el-main>
      <el-form :model = "shopData"  label-width = "140px" class="demo-ruleForm" :rules="rules" ref = "shopForm">
        <el-form-item label = "店铺名称" prop = "name">
          <el-input v-model = "shopData.name"></el-input>
        </el-form-item>
        <el-form-item label = "店铺地址" prop = "address">
          <el-input v-model = "shopData.address"></el-input>
        </el-form-item>
        <el-form-item label = "联系电话" prop = "phone">
          <el-input v-model = "shopData.phone" ></el-input>
        </el-form-item>
        <el-form-item label = "店铺简介">
          <el-input v-model = "shopData.description"></el-input>
        </el-form-item>
        <el-form-item label = "店铺标语">
          <el-input v-model = "shopData.twoTitle"></el-input>
        </el-form-item>
        <el-form-item label = "店铺分类" prop = "category">
          <el-cascader :options = "categoryData" v-model = "shopData.category" change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label = "店铺特点">
          <el-col :span = "8">
            品牌保证 <el-switch v-model = "shopData.tedian.switch1"></el-switch>
          </el-col>
          <el-col :span = "8">
            蜂鸟专送 <el-switch v-model = "shopData.tedian.switch2"></el-switch>
          </el-col>
          <el-col :span = "8">
            新开店铺 <el-switch v-model = "shopData.tedian.switch3"></el-switch>
          </el-col>
          <el-col :span = "8">
            外卖保 <el-switch v-model = "shopData.tedian.switch4"></el-switch>
          </el-col>
          <el-col :span = "8">
             准时达 <el-switch v-model = "shopData.tedian.switch5"></el-switch>
          </el-col>
          <el-col :span = "8">
            开发票 <el-switch v-model = "shopData.tedian.switch6"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label = "配送费" prop = "moneyps">
          <el-input-number :min = "1" v-model = "shopData.moneyps"></el-input-number>
        </el-form-item>
        <el-form-item label = "起送价" prop = "moneyqs">
          <el-input-number :min = "20" v-model = "shopData.moneyqs"></el-input-number>
        </el-form-item>
        <el-form-item label = "营业时间">
          <el-time-select placeholder = "起始时间" v-model = "shopData.startTime" :pick-options = "{start: '08:30', step: '00:15', end: '18:30'}"></el-time-select>
          <el-time-select placeholder = "结束时间" v-model = "shopData.endTime" :picker-options = "{start: '08:30', step: '00:15', end: '18:30', minTime: shopData.startTime}"></el-time-select>
        </el-form-item>
        <el-form-item label = "上传店铺头像" prop = "shopImgUrl">
          <el-upload class="avatar-uploader" action = '//elm.cangdu.org/v1/addimg/shop' :show-file-list = 'true' :on-success = "shopImgSuccess" :before-upload = "shopImgBefore">
            <img v-if="shopData.shopImgUrl" :src="baseUrl + shopData.shopImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label = "上传营业执照">
          <el-upload class="avatar-uploader" action = '//elm.cangdu.org/v1/addimg/shop' :show-file-list = 'false' :on-success = "shopzzSuccess" :before-upload = "shopImgBefore">
            <img v-if="shopData.shopzz" :src="baseUrl + shopData.shopzz" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label = "上传餐饮服务许可证">
          <el-upload class="avatar-uploader" action = '//elm.cangdu.org/v1/addimg/shop' :show-file-list = 'false' :on-success = "shopServerSuccess" :before-upload = "shopImgBefore">
            <img v-if="shopData.shopServer" :src="baseUrl + shopData.shopServer" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label = "优惠活动">
          <el-select @change = "changeSelected" v-model = "shopData.huodong" placeholder="请选择优惠活动">
            <el-option v-for = "(item, index) in options" :key = "index" :label = "item.label" :value = "item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-table :data = 'activities' border stripe>
          <el-table-column label = "活动标题" prop = "icon_name"></el-table-column>
          <el-table-column label = "活动名称" prop = "title"></el-table-column>
          <el-table-column label = "活动详情" prop = "description"></el-table-column>
          <el-table-column label = "操作" width = "120">
            <template slot-scope = "scope">
              <el-button size = "mini" type = "danger" @click = "del(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <p class="tc">
        <el-button type = "primary" @click = "add('shopForm')" :loading = 'loading'>
          {{loading ? '添加中' : '立即添加'}}
        </el-button>
      </p>
    </el-main>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from '@/components/all/indexHeader'
import indexFooter from '@/components/all/indexFooter'
import {addShop, shopCategory} from '@/api/api'
export default {
  data () {
    return {
      // 添加中
      loading: false,
      // 图片地址
      baseUrl: '//elm.cangdu.org/img/',
      // 添加店铺数据
      shopData: {
        // 店铺名称
        name: '',
        // 店铺地址
        address: '',
        // 联系电话
        phone: null,
        // 店铺简介
        description: '',
        // 店铺标语
        twoTitle: '',
        // 店铺分类
        category: '',
        // 店铺特点
        tedian: {
          // 品牌保证
          switch1: true,
          // 蜂鸟专送
          switch2: true,
          // 新开店铺
          switch3: true,
          // 外卖保
          switch4: true,
          // 准时达
          switch5: true,
          // 开发票
          switch6: true
        },
        // 配送费
        moneyps: 1,
        // 起送价
        moneyqs: 20,
        // 起始时间
        startTime: '',
        // 结束时间
        endTime: '',
        // 上传店铺头像
        shopImgUrl: null,
        // 上传营业执照
        shopzz: '',
        // 上传餐饮服务许可证
        shopServer: '',
        // 优惠活动
        huodong: '满减优惠'
      },
      // 分类数据
      categoryData: [],
      // 优惠活动
      options: [
        {
          value: '满减优惠',
          label: '满减优惠'
        },
        {
          value: '优惠大酬宾',
          label: '优惠大酬宾'
        },
        {
          value: '新用户立减',
          label: '新用户立减'
        },
        {
          value: '进店领券',
          label: '进店领券'
        }
      ],
      // 活动默认数据
      activities: [
        {
          icon_name: '减',
          title: '活动满减',
          description: '满30减5，满60减8'
        }
      ],
      // 规则
      rules: {
        // 店铺名称
        name: [
          {
            required: true, message: '请输入店铺名称', trigger: 'blur'
          }
        ],
        // 详细地址
        address: [
          {
            required: true, message: '请选择地址', trigger: 'blur'
          }
        ],
        // 联系电话
        phone: [
          {
            required: true, message: '请输入电话号码', trigger: 'blur'
          }
        ],
        // 食品分类
        category: [
          {
            required: true, message: '请选择商铺分类', trigger: 'blur'
          }
        ],
        // 店铺图片地址
        shopImgUrl: [
          {
            required: true, message: '请上传店铺图片', trigger: 'blur'
          }
        ],
        // 运费
        moneyps: [
          {
            required: true, message: '请输入配送费', trigger: 'blur'
          }
        ],
        // 起送价
        moneyqs: [
          {
            required: true, message: '请输入起送价', trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    indexHeader,
    indexFooter
  },
  methods: {
    // 获取食品种类
    async getShopCategory () {
      const res = await shopCategory(31.22967, 121.4762)
      res.forEach(item => {
        if (item.sub_categories.length) {
          const addnew = {
            value: item.name,
            label: item.name,
            children: []
          }
          item.sub_categories.forEach((i, index) => {
            if (index === 0) {
              return false
            }
            addnew.children.push({
              value: i.name,
              label: i.name
            })
          })
          this.categoryData.push(addnew)
        }
      })
      console.log(this.categoryData)
    },
    // 文件上传成功执行钩子
    // res 表示执行结果返回值，file表示上传对象
    shopImgSuccess (res, file) {
      console.log(res, file)
      if (res.status === 1) {
        this.shopData.shopImgUrl = res.image_path
      } else {
        this.$message.error('上传失败')
      }
    },
    // 文件上传成功执行钩子
    // res 表示执行结果返回值，file表示上传对象
    shopzzSuccess (res, file) {
      console.log(res, file)
      if (res.status === 1) {
        this.shopData.shopzz = res.image_path
      } else {
        this.$message.error('上传失败')
      }
    },
    // 文件上传成功执行钩子
    // res 表示执行结果返回值，file表示上传对象
    shopServerSuccess (res, file) {
      console.log(res, file)
      if (res.status === 1) {
        this.shopData.shopServer = res.image_path
      } else {
        this.$message.error('上传失败')
      }
    },
    // 上传文件之前的钩子
    // 参数为上传的文件
    shopImgBefore (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const is2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片格式只能是png或者jpg格式')
      }
      if (!is2M) {
        this.$message.error('上传图片大小不能超过2M')
      }
      return isJPG && is2M
    },
    // 选择框文本修改
    changeSelected () {
      this.$prompt('请输入活动详情', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        if (value == null) {
          this.$message.error('输入不能为空!')
          return false
        }
        let newObj = {}
        switch (this.shopData.huodong) {
          case '满减优惠':
            newObj = {
              icon_name: '减',
              title: '满减优惠',
              description: value
            }
            break
          case '优惠大酬宾':
            newObj = {
              icon_name: '特',
              title: '优惠大酬宾',
              description: value
            }
            break
          case '新用户立减':
            newObj = {
              icon_name: '新',
              title: '新用户立减',
              description: value
            }
            break
          case '进店领券':
            newObj = {
              icon_name: '领',
              title: '进店领券',
              description: value
            }
            break
        }
        this.activities.push(newObj)
        console.log(this.activities)
      }).catch(() => {
        this.$message.error('取消输入')
      })
    },
    // 删除活动
    del (index) {
      this.activities.splice(index, 1)
    },
    // 添加商铺
    add (form) {
      // const res = await addShop()
      // console.log(res)
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addData()
        } else {
          console.log('错误')
          return false
        }
      })
    },
    // 重置表单
    resetForm () {
      this.$refs['shopForm'].resetFields()
    },
    // 添加
    async addData () {
      this.loading = true
      const res = await addShop(
        // 店铺名称
        this.shopData.name,
        // 店铺地址
        this.shopData.address,
        // 联系电话
        this.shopData.phone,
        // 纬度
        31.23037,
        // 经度
        121.473701,
        // 食品分类
        this.shopData.category,
        // 店铺图片地址
        this.shopData.shopImgUrl,
        // 配送费
        this.shopData.moneyps,
        // 起送价
        this.shopData.moneyqs,
        // 餐馆简介
        this.shopData.description,
        // 餐馆标语
        this.shopData.towTitle,
        // 品牌商铺
        this.shopData.tedian.switch1,
        // 支持蜂鸟专送
        this.shopData.tedian.switch2,
        // 新开店铺
        this.shopData.tedian.switch3,
        // 支持保险
        this.shopData.tedian.switch4,
        // 准时达
        this.shopData.tedian.switch5,
        // 开发票
        this.shopData.tedian.switch6,
        // 开始营业时间
        this.shopData.startTime,
        // 结束营业时间
        this.shopData.endTime,
        // 上传营业执照地址
        this.shopData.shopzz,
        // 餐饮服务许可证图片地址
        this.shopData.shopServer,
        // 优惠活动
        this.activities
      )
      console.log(res)
      if (res.status) {
        this.$message.success('恭喜您，店铺添加成功')
        this.resetForm()
        this.loading = false
      } else {
        this.loading = false
        this.$message.error(res.message)
      }
    }
  },
  mounted () {
    this.getShopCategory()
  }
}
</script>
<style lang="scss">
.homeRight {
  width:100%;
  .demo-ruleForm {
    width:600px;
    margin: 30px auto;
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
}
</style>
