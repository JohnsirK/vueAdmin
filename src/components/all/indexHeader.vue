<template>
  <el-header>
    <button @click="changeState">
      <i :class='changeClass'></i>
    </button>
    <all-breadcrumb></all-breadcrumb>
    <div class="rightUser">
      <el-dropdown v-if="userinfo != undefined">
        <span>
          <img :src="baseUrl + userinfo.avatar" alt="">
        </span>
        <el-dropdown-menu slot='dropdown'>
          <div class="dropUser">
            <ul>
              <li>
                <font>用户名:</font>{{userinfo.user_name}}
              </li>
              <li>
                <font>注册日期:</font>{{userinfo.create_time}}
              </li>
              <li>
                <font>角色权限:</font>{{userinfo.admin}}
              </li>
              <p class="ppos">
                <span class="pos">
                  更换用户头像
                  <input type="file" class="imgUpload" @change = "imgUpload($event)" accept = "image/jpeg, image/png, image/jpg">
                </span>
                |
                <span @click='adminOut'>
                  退出
                </span>
              </p>
            </ul>
            <!-- {{userinfo}} -->
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
// 面包屑组件
import allBreadcrumb from '@/components/all/breadcrumb'
// api
import {singout, changeUserImg, adinfo} from '@/api/api'
// localSession
import localSession from '@/utils/localSession'
export default {
  data () {
    return {
      // 图片地址
      baseUrl: 'https://elm.cangdu.org/img/'
    }
  },
  computed: {
    ...mapState(['isCollapse', 'userinfo']),
    changeClass () {
      if (this.isCollapse) {
        return 'el-icon-d-arrow-right'
      } else {
        return 'el-icon-d-arrow-left'
      }
    }
  },
  methods: {
    ...mapMutations(['changeIsCollapse', 'saveUserInfo']),
    changeState () {
      this.changeIsCollapse(!this.isCollapse)
    },
    // 管理员退出
    async adminOut () {
      let res = await singout()
      console.log(res)
      if (res.status === 1) {
        this.$message({
          showClose: false,
          message: res.success,
          type: 'success'
        })
        this.saveUserInfo()
        localSession.removeSession('userinfo')
        this.$router.push('/login')
      } else {
        this.$message.error('退出失败！')
      }
    },
    isHaveUser () {
      if (!this.userinfo) {
        this.$message.error('请先登录！')
        this.$router.push('/login')
      }
    },
    async imgUpload (e) {
      const file = e.target.files[0]
      // 创建form对象
      const param = new FormData()
      // 通过append向form对象添加数据
      param.append('file', file, file.name)
      // FormData 私有类对象,可以get判断值是否传进去
      if (param.get('file').size >= 100000) {
        this.$message.error('图片过大，请重新选择')
      } else {
        const res = await changeUserImg(this.userinfo.id, param)
        console.log(res)
        if (res.status) {
          this.adminUser()
        }
      }
    },
    // 获取用户信息
    async adminUser () {
      let res = await adinfo()
      if (res.status) {
        this.saveUserInfo(res.data)
      } else {
        return false
      }
    }
  },
  components: {
    allBreadcrumb
  },
  mounted () {
    this.isHaveUser()
  }
}
</script>

<style lang = 'scss'>
  .el-header {
    display: flex;
    height:50px !important;
    line-height:50px;
    align-items: center;
    background: #eff2f7;
    box-shadow: 0 2px 10px rgba(195,195,195,.4);
    button {
      background: #eaeaea;
      border:none;
      color:#b1acac;
      font-size:24px;
      border-radius: 5px;
      i{
        transition: all .6s;
        -moz-transition: all .6s;
        -webkit-transition: all .6s;
        -o-transition: all .6s;
      }
    }
    .rightUser {
      margin-left: auto;
      margin-right:15px;
      margin-top:3px;
      width:45px;
      height:45px;
      overflow: hidden;
      background: #fff;
      border-radius:50px;
    }
    .el-breadcrumb {
      margin-left:20px;
    }
  }
  .dropUser {
    padding:0 10px;
    li {
      line-height: 28px;
      color: #666;
      font{
        width:70px;
        text-align: right;
        margin-right:5px;
        display: inline-block;
      }
    }
    p {
      text-align: center;
      color:#666;
      span {
        cursor: pointer;
      }
      span:hover {
        color:#409EFF
      }
    }
  }
  .ppos {
    display: flex;
    justify-content: center;
    .pos {
      position: relative;
      display:block;
      .imgUpload {
        position: absolute;
        overflow: hidden;
        border: none;
        opacity: 0;
        width:100px;
        top:0;
        left:0;
      }
    }
  }
</style>
