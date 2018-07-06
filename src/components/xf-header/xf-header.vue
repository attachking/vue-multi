<template>
  <div class="fixed-header">
    <div class="xf-header">
      <div class="header-con">
        <div class="item">
          <img src="../../common/img/logo-color.png" alt="">
        </div>
        <a class="item" :href="handleUrl(val.CANC04)" v-for="(val, key) in list" :key="key">
          <span>{{val.CANC03}}</span>
          <span class="menu-list">
            <a :href="handleUrl(item.canc04)" v-for="item in val.CR_LIST" :key="item.canc04">{{item.canc03}}</a>
          </span>
        </a>
        <span class="login" v-if="!userInfo.status">
          <a href="javascript:;" @click="login">登录</a>/<a href="register.html">注册</a>
        </span>
        <div class="user-info" v-if="userInfo.status === 1">
          <el-dropdown placement="bottom" @command="handleCommand">
            <a class="img" href="me.html">
              <img :src="userInfo.logo">
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="me.html">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a class="user-info-name" href="me.html" :title="userInfo.name">{{userInfo.name}}</a>
        </div>
      </div>
    </div>
    <el-dialog title="用户登录" :visible.sync="dialogTableVisible" width="380px">
      <el-form ref="form" :model="form" :rules="rules" class="form">
        <el-form-item prop="ccmu02">
          <el-input v-model.trim="form.ccmu02" placeholder="请输入用户名" clearable prefix-icon="xffont font-yonghu" @keydown.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="ccmu03">
          <el-input v-model.trim="form.ccmu03" type="password" placeholder="请输入密码" clearable prefix-icon="xffont font-icon-test" @keydown.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="valiCode" class="less-margin code-item">
          <el-input v-model="form.valiCode" placeholder="请输入验证码" clearable @keydown.native.enter="onSubmit">
            <template slot="append">
              <img :src="img" class="login-code" title="点击更换验证码" @click="validCode">
            </template>
          </el-input>
          <el-button type="text" @click="validCode">换一张</el-button>
        </el-form-item>
        <el-form-item class="less-margin">
          <el-checkbox label="自动登录" v-model="autoLogin"></el-checkbox>
          <span class="forget">
            <el-button type="text">忘记密码?</el-button>
          </span>
        </el-form-item>
        <el-form-item class="less-margin">
          <el-button type="primary" @click="onSubmit" class="submit" :loading="loading">登录</el-button>
        </el-form-item>
        <el-form-item class="less-margin">
          <span class="forget">
            还没有账号？
            <a href="register.html">
              <el-button type="text">注册</el-button>
            </a>
            新账号
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import md5 from 'blueimp-md5'
import {storage, STORAGE_TYPE} from '../../common/js/utils'
import event from '../../common/js/event'

export default {
  name: 'xf-header',
  data() {
    return {
      loading: false,
      list: [],
      keywords: '',
      time: '',
      dialogTableVisible: false,
      autoLogin: false,
      img: '',
      form: {
        ccmu02: '',
        ccmu03: '',
        valiId: '',
        valiCode: '',
        loginStatus: ''
      },
      rules: {
        ccmu02: [{
          required: true,
          message: '请输入用户名',
          trigger: 'change'
        }, {
          max: 25,
          message: '长度不能超过25位',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z0-9]*$/.test(value)) {
              callback()
            } else {
              callback(new Error('只能输入数字或字母'))
            }
          }
        }],
        ccmu03: [{
          required: true,
          message: '请输入密码',
          trigger: 'change'
        }, {
          max: 25,
          message: '长度不能超过25位',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z0-9_]*$/.test(value)) {
              callback()
            } else {
              callback(new Error('只能输入数字、字母或下划线'))
            }
          }
        }],
        valiCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (value.length === 4) {
              callback()
            } else {
              callback(new Error('验证码格式错误'))
            }
          },
          trigger: 'blur'
        }]
      },
      userInfo: this.$userInfo
    }
  },
  methods: {
    getChannel() {
      this.$post('/service/business/sms/sms/channelInfo/getChannelList', {}).then(res => {
        this.list = res.result
      })
    },
    handleUrl(url) {
      if (url) {
        return url
      } else {
        return 'javascript:;'
      }
    },
    login() {
      if (this.dialogTableVisible) return
      this.dialogTableVisible = true
      this.loading = false
      this.validCode()
      setTimeout(() => {
        this.$refs.form.resetFields()
      }, 20)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.loginStatus = this.autoLogin ? 1 : 0
          const form = Object.assign({}, this.form)
          form.ccmu03 = md5(form.ccmu03)
          if (this.loading) return
          this.loading = true
          this.$post('/service/business/login/account/userLogin', form).then(res => {
            this.loading = false
            if (res.result === 4) {
              this.validCode()
            }
            if (res.error.result === 1) { // 登陆成功
              this.saveStorage(res)
              location.reload()
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    // 刷新登录状态
    refreshLogin() {
      if (this.$userInfo.status !== 1) return
      this.$post('/service/business/login/account/userLogin', {}, false).then(res => {
        this.saveStorage(res)
      })
    },
    saveStorage(res) {
      if (!res.result) {
        storage.out()
        this.userInfo = {}
        return
      }
      storage.set(STORAGE_TYPE.ccmu17, res.result.ccmu17)
      storage.set(STORAGE_TYPE.aac001, res.result.aac001)
      if (res.result.token) storage.set(STORAGE_TYPE.token, res.result.token)
      storage.set(STORAGE_TYPE.name, res.result.userName)
      storage.set(STORAGE_TYPE.status, 1)
      storage.set(STORAGE_TYPE.aab001, res.result.aab001)
      storage.set(STORAGE_TYPE.ccmu01, res.result.userid)
      storage.set(STORAGE_TYPE.logo, res.result.logo)
    },
    validCode() {
      this.$post('/service/business/login/verifyCode/getVerifyCode').then(res => {
        this.form.valiId = res.result.valiId
        this.img = 'data:image/png;base64,' + res.result.imageStr
      })
    },
    logout() {
      storage.out()
      if (/me\.html/.test(location.href)) {
        location.href = 'index.html'
      } else {
        location.reload()
      }
    },
    handleCommand(cmd) {
      if (cmd === 'logout') {
        this.logout()
      } else {
        window.location.href = cmd
      }
    }
  },
  created() {
    this.getChannel()
    this.refreshLogin()
    event.$on('login', () => {
      this.login()
    })
    event.$on('refresh', () => {
      this.refreshLogin()
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  @keyframes topMenu {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .fixed-header{
    padding: 100px 0 0 0;
    width: 100%;
  }
  .xf-search{
    width: 1200px;
    margin: 5px auto;
    @include clearFixed;
    .time{
      display: inline-block;
      float: left;
      margin: 9px 0 0 0;
      font-size: 14px;
    }
    .search-input{
      width: 200px;
      float: right;
      margin: 0 20px 0 0;
    }
  }
  .xf-header{
    height: 100px;
    width: 100%;
    position: fixed;
    transform: translateZ(0);
    left: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid #d9d9d9;
    .header-con{
      width: 1200px;
      margin: 0 auto;
      div.item{
        &:hover{
          cursor: default;
          background: #fff;
        }
      }
      .item{
        display: inline-block;
        height: 100px;
        line-height: 100px;
        vertical-align: middle;
        color: #666;
        width: 100px;
        text-align: center;
        position: relative;
        &:hover{
          cursor: pointer;
          background: #f3f3f3;
          .menu-list{
            display: inline-block;
            animation: topMenu .3s;
          }
        }
        .menu-list{
          position: absolute;
          top: 100px;
          left: 0;
          width: 100%;
          overflow: hidden;
          z-index: 5;
          line-height: normal;
          display: none;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          a{
            display: inline-block;
            width: 100%;
            padding: 10px 5px;
            text-align: center;
            background: #f3f3f3;
            color: #333;
            &:hover{
              background: #f1f1f1;
              color: $--color-primary;
            }
          }
        }
        &:first-child{
          width: 100px;
          overflow: hidden;
          text-align: center;
          img{
            width: 93px;
            height: 93px;
            margin-top: 3px;
          }
        }
      }
    }
    .login{
      background: url("./login.png") no-repeat;
      display: inline-block;
      vertical-align: middle;
      width: 131px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #fff;
      a{
        color: #fff;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
  .submit{
    width: 100%;
  }
  .login-code{
    width: 120px;
    &:hover{
      cursor: pointer;
      opacity: .9;
    }
  }
  .form{
    padding: 0 15px;
  }
  .less-margin{
    margin-bottom: 10px;
  }
  .code-item{
    .el-input{
      width: 255px;
    }
  }
  .user-info{
    display: inline-block;
    vertical-align: middle;
    text-align: right;
    width: 180px;
    .img{
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid #ebebeb;
      &:hover{
        cursor: pointer;
      }
      img{
        width: 100%;
      }
    }
    .user-info-name{
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      max-width: 120px;
      @include ellipsis;
    }
  }
  .forget{
    display: inline-block;
    float: right;
  }
</style>
