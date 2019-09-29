<template>
  <div class="login">
    <div class="login-div">
      <h3>
        管理中心
      </h3>
      <h5>
        System Management Center
      </h5>
      <div class="mt20 mb20">
        <el-input placeholder='请输入用户名' prefix-icon='iconfont icon-xingmingyonghumingnicheng' v-model='username'></el-input>
      </div>
      <div class="mt20 mb20">
        <el-input type="password" placeholder='请输入密码' prefix-icon='iconfont icon-Group-' v-model='password'></el-input>
      </div>
      <div class="mt20">
        <el-button @click="getAdmin" :loading="isLogin">{{isLogin ? '登录中...' : '登录'}}</el-button>
      </div>
      <dl>
        <dt>
          温馨提示：
        </dt>
        <dd>
          1：未登录过的新用户，自动注册
        </dd>
        <dd>
          2：注册过的用户可凭账号密码登录
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
// 接口
import {adminLogin, adinfo} from '@/api/api'
// vuex
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: '',
      isLogin: false
    }
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    async getAdmin () {
      if (!this.username) {
        this.$message({
          showClose: true,
          message: '请输入用户名!',
          type: 'error'
        })
      } else if (!this.password) {
        this.$message({
          showClose: true,
          message: '请输入密码!',
          type: 'error'
        })
      } else {
        this.isLogin = true
        let res = await adminLogin(this.username, this.password)
        if (res.status) {
          this.$message({
            showClose: true,
            message: '恭喜你,登录成功,页面即将跳转!',
            type: 'success'
          })
          this.adminUser()
        } else {
          this.isLogin = false
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      }
    },
    // 获取用户信息
    async adminUser () {
      let res = await adinfo()
      console.log(res)
      if (res) {
        if (res.status) {
          this.saveUserInfo(res.data)
          this.$router.push('/')
        } else {
          let date = new Date()
          let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
          const user = {
            admin: '管理员',
            avatar: 'default.jpg',
            city: '',
            create_time: time,
            id: Math.ceil(Math.random() * 100000),
            status: 1,
            user_name: this.username
          }
          this.saveUserInfo(user)
          this.$router.push('/')
        }
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['userinfo'])
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/main.scss';
  .login{
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,.4);
    .login-div {
      width:400px;
      height:365px;
      position: absolute;
      text-align: center;
      padding:20px 30px;
      box-sizing: border-box;
      left:0;
      top:0;
      right:0;
      bottom:0;
      margin:auto;
      background: rgba(38,43,54,.9);
      border-radius: 10px;
      h3,h5{
        color:#259dab
      }
      h3{
        font-size: 32px;
      }
      h5{
        font-size:16px
      }
      .iconfont {
        font-size:20px;
      }
      .el-button {
        background: #08897e;
        color:#fff;
        border:1px solid #08897e;
        width:100%;
      }
      dl{
        margin-top:10px;
        text-align: left;
        color:#807e7e;
      }
      .el-input__prefix {
        left: 10px;
      }
      .el-input__inner {
        padding-left:35px;
      }
    }
  }
</style>
