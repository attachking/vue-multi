<template>
  <div class="fixed-header">
    <div class="xf-header">
      <div class="header-con">
        <div class="logo">
          <img src="../../common/img/logo-color.png" alt="">
        </div>
        <a class="item" :href="handleUrl(val.CANC04)" v-for="(val, key) in list" :key="key">
          <span>{{val.CANC03}}</span>
          <span class="menu-list">
            <a :href="handleUrl(item.canc04)" v-for="item in val.CR_LIST" :key="item.canc04" :target="item.cand05 === 2 ? '_blank' : '_self'" @click="handleClick(item)">{{item.canc03}}</a>
          </span>
        </a>
        <span class="login" v-if="!userInfo.status">
          <a href="javascript:;" @click="login('', 1)">个人登录</a>&nbsp;/&nbsp;<a href="javascript:;" @click="login('', 2)">单位登录</a>&nbsp;/&nbsp;<a href="register.html">注册</a>
        </span>
        <div class="user-info" v-if="userInfo.status === 1">
          <el-dropdown placement="bottom" @command="handleCommand">
            <a class="img" href="me.html">
              <img :src="userInfo.logo">
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="me.html">用户中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a class="user-info-name" href="me.html" :title="userInfo.name">{{userInfo.name}}</a>
        </div>
        <span class="lang">
          <a :href="en ? 'index.html' : 'javascript:;'" :class="{active: !en}">简体中文</a>&nbsp;/&nbsp;
          <a :href="en ? 'javascript:;' : 'theme.html?lang=en'" :class="{active: en}">English</a>
        </span>
      </div>
    </div>
    <el-dialog :title="loginTitle" :visible.sync="dialogTableVisible" width="380px">
      <el-form ref="form" :model="form" :rules="rules" class="form">
        <el-form-item prop="ccmu02">
          <el-input v-model.trim="form.ccmu02" placeholder="请输入用户名" clearable prefix-icon="xffont font-yonghu" @keydown.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item prop="ccmu03">
          <el-input v-model.trim="form.ccmu03" type="password" placeholder="请输入密码" clearable prefix-icon="xffont font-icon-test" @keydown.native.enter="onSubmit"></el-input>
        </el-form-item>
        <!--<el-form-item class="less-margin">
          <el-radio v-model="form.ccmu17" :label="1">个人登录</el-radio>
          <el-radio v-model="form.ccmu17" :label="2">单位登录</el-radio>
        </el-form-item>-->
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
          <a class="forget" href="reset.html">
            <el-button type="text" @click.stop="go('reset.html')">忘记密码?</el-button>
          </a>
        </el-form-item>
        <el-form-item class="less-margin">
          <el-button type="primary" @click="onSubmit" class="submit" :loading="loading">登录</el-button>
        </el-form-item>
        <el-form-item class="less-margin">
          <span class="forget">
            还没有账号？
            <a href="register.html">
              <el-button type="text" @click.stop="go('register.html')">注册</el-button>
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
import {storage, STORAGE_TYPE, getUserInfo, queryParse, handleLang} from '../../common/js/utils'
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
        ccmu17: 1,
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
      userInfo: this.$userInfo,
      loginTitle: '用户登录',
      en: queryParse(location.search).lang === 'en'
    }
  },
  methods: {
    getChannel() {
      this.$post('/service/business/sms/sms/channelInfo/getChannelList', {
        key: 'CHANNEL'
      }).then(res => {
        this.list = res.result
      })
    },
    handleClick(val) {
      if (val.canc04 === 'me.html#/resume' && this.$userInfo.ccmu17 !== 1) {
        this.$alert(`该功能需要登录个人账号`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.login(val.canc04)
          }
        })
        return
      }
      if (val.canc04 === 'me.html#/job' && this.$userInfo.ccmu17 !== 2) {
        this.$alert(`该功能需要登录单位账号`, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.login(val.canc04)
          }
        })
        return
      }
      location.href = val.canc04
    },
    handleUrl(url) {
      if (!url || /me\.html/.test(url)) {
        return 'javascript:;'
      } else {
        return url
      }
    },
    login(url, ccmu17) {
      if (this.dialogTableVisible) return
      this.dialogTableVisible = true
      this.loading = false
      this.validCode()
      this.redirect = url
      if (ccmu17 === 1) {
        this.loginTitle = '个人登录'
        this.form.ccmu17 = 1
      } else if (ccmu17 === 2) {
        this.loginTitle = '单位登录'
        this.form.ccmu17 = 2
      } else {
        this.loginTitle = '用户登录'
        this.form.ccmu17 = ''
      }
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
              if (this.redirect) {
                location.href = this.redirect
                return
              }
              // 如果是在注册页、重置密码页进行登录的，则自动跳转至个人中心
              if (/(register\.html)|(reset\.html)|(^(?!.*html))|(index\.html)/.test(location.href)) {
                location.href = 'me.html'
              } else {
                location.reload()
              }
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
      this.userInfo = getUserInfo()
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
    },
    go(str) {
      location.href = str
    },
    handleLang: handleLang
  },
  created() {
    this.getChannel()
    this.refreshLogin()
    event.$on('login', (url, ccmu17) => {
      this.login(url, ccmu17)
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
      width: 1340px;
      margin: 0 auto;
      .logo{
        display: inline-block;
        vertical-align: middle;
        padding: 3px 0 0 0;
      }
      .item{
        display: inline-block;
        height: 100px;
        line-height: 100px;
        vertical-align: middle;
        color: #666;
        width: 82px;
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
      background-size: 100% 100%;
      display: inline-block;
      vertical-align: middle;
      width: 230px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      a{
        color: #fff;
        &:hover{
          color: #d9d9d9;
        }
      }
    }
    .lang{
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      .active{
        color: $--color-primary;
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
    width: 200px;
    padding: 0 20px 0 0;
    .img{
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      vertical-align: middle;
      border: 1px solid #ebebeb;
      overflow: hidden;
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
