<template>
  <div class="reset">
    <xf-header ref="header"></xf-header>
    <div class="reset-con">
      <p class="top-title"><i class="el-icon-warning"></i>&nbsp;重置密码</p>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="第一步"></el-step>
        <el-step title="第二步"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <transition name="el-fade-in" mode="out-in">
        <el-form ref="form" :model="form" :rules="rules" class="reset-form" v-if="active === 1" key="form">
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="请输入注册的手机号"></el-input>
          </el-form-item>
          <el-form-item class="img-box" prop="valiCode">
            <el-input v-model="form.valiCode" placeholder="请输入右侧验证码"></el-input>
            <img class="imgCode" :src="img" @click="getImgCode" title="点击更换验证码">
          </el-form-item>
          <el-form-item class="img-box" prop="phoneCode">
            <el-input v-model="form.phoneCode" placeholder="请输入手机验证码"></el-input>
            <el-button type="text" @click="getCode" class="get-code" :loading="loadingCode">{{codeText}}</el-button>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" :loading="loading" @click="onSubmit">重置密码</el-button>
          </el-form-item>
        </el-form>
        <div class="progress" key="progress" v-if="active === 2">
          <i class="el-icon-loading"></i>&nbsp;正在重置......
        </div>
        <div class="tip" key="tip" v-if="active === 3">
          <p class="success"><i class="el-icon-circle-check-outline"></i></p>
          <p class="first">您的密码已重置为手机号后六位</p>
          <p class="second">
            请尽快
            <el-button type="text" @click="login">登录</el-button>
            到个人中心-账号管理-安全设置修改您的密码
          </p>
        </div>
      </transition>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import {reg} from '../../common/js/utils'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      active: 1,
      img: '',
      form: {
        phone: '',
        valiCode: '',
        phoneCode: '' // 手机验证码
      },
      rules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (reg.phone(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          },
          trigger: 'change'
        }],
        valiCode: [{
          required: true,
          message: '请输入右侧的图片验证码',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z\d]{3,5}$/.test(value)) {
              callback()
            } else {
              callback(new Error('验证码格式不正确'))
            }
          },
          trigger: 'change'
        }],
        phoneCode: [{
          required: true,
          message: '请输入手机验证码',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z\d]{3,8}$/.test(value)) {
              callback()
            } else {
              callback(new Error('验证码格式不正确'))
            }
          },
          trigger: 'change'
        }]
      },
      codeText: '获取验证码',
      loadingCode: false,
      valiId: '',
      loading: false,
      sendable: true
    }
  },
  methods: {
    getImgCode() {
      this.$post('/service/business/login/verifyCode/getVerifyCode', {}).then(res => {
        this.img = 'data:image/png;base64,' + res.result.imageStr
        this.valiId = res.result.valiId
      })
    },
    getCode() {
      this.$refs.form.validateField('phone', valid => {
        if (!valid) {
          this.$refs.form.validateField('valiCode', valid => {
            if (!valid) {
              if (this.sendable) {
                this.loadingCode = true
                this.$post('/service/business/login/account/verificationCode', {
                  phone: this.form.phone,
                  remark: 1, // 1：注册时发送  2：注册成功发送  0：认证时发送
                  valiCode: this.form.valiCode,
                  valiId: this.valiId
                }).then(res => {
                  this.loadingCode = false
                  if (res.error.result === 1) {
                    this.stop()
                    this.$message({
                      message: res.error.message,
                      type: 'success'
                    })
                  }
                  if (res.error.result === 0) {
                    this.getImgCode()
                  }
                }).catch(() => {
                  this.loadingCode = false
                })
              }
            }
          })
        }
      })
    },
    stop() {
      this.sendable = false
      let second = 60
      this.codeText = `${second}s`
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (second <= 0) {
          this.codeText = '获取验证码'
          this.sendable = true
          clearInterval(this.timer)
          return
        }
        second--
        this.codeText = `${second}s`
      }, 1000)
    },
    onSubmit() {
      this.loading = true
      this.$post('/service/business/login/account/findPassword', {
        phone: this.form.phone,
        phoneCode: this.form.phoneCode,
        remark: 2 // 单位1，用户2
      }).then(res => {
        this.loading = false
        if (res.error.result === 1) {
          this.active = 2
          setTimeout(() => {
            this.active = 3
          }, 1000)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    login() {
      this.$refs.header.login()
    }
  },
  created() {
    this.getImgCode()
  }
}
</script>
<!--这个页面不使用scoped-->
<style lang="scss">
  @import "../../common/style/variables";
  .reset{
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
    .progress{
      font-size: 14px;
      padding: 50px 0 0 0;
      text-align: center;
    }
    .tip{
      padding: 50px 0 0 0;
      .success{
        color: green;
        font-size: 50px;
        text-align: center;
      }
      .first{
        font-size: 20px;
        padding: 20px 0 0 0;
        text-align: center;
      }
      .second{
        font-size: 14px;
        padding: 10px 0 0 0;
      }
    }
  }
  .reset-con{
    width: 500px;
    min-height: 450px;
    border-radius: 5px;
    background: #fff;
    margin: 90px auto;
    padding: 20px 70px 50px 70px;
    .top-title{
      color: $--color-primary;
      font-size: 20px;
      text-align:center;
      padding: 20px 0;
    }
  }
  .reset-form{
    padding: 20px 0 0 0;
    .img-box{
      .el-input{
        width: 230px;
      }
    }
    .el-form-item{
      margin-bottom: 0;
      padding: 10px 0;
      border-bottom: 1px solid #ebebeb;
    }
    .el-input{
      input{
        outline: none;
        border: none;
      }
    }
    .el-form-item__error {
      top: 78%;
      left: 16px;
    }
    .imgCode{
      width: 90px;
      vertical-align: middle;
      &:hover{
        cursor: pointer;
      }
    }
    .get-code{
      float: right;
      margin-right: 10px;
    }
    .btn{
      padding: 10px 10px;
      border-bottom: none;
      .el-button{
        width: 100%;
      }
    }
  }
</style>
