<template>
  <div>
    <div class="center">
      <div class="centerBox">
        <div class="top">
          <div class="topLeft">
            <p>找工作</p> | <span>海量工作岗位一网全知</span>
          </div>
          <div class="topRight">
            <router-link to="/boss">我要找人才&gt;</router-link>
          </div>
        </div>
        <div class="leftBox">
          <el-form ref="form" :model="form" :rules="rules" class="register-form">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" placeholder="请输入常用手机号"></el-input>
            </el-form-item>
            <el-form-item class="img-box" prop="valiCode">
              <el-input v-model="form.valiCode" placeholder="请证明你不是机器人"></el-input>
              <img class="imgCode" :src="img" @click="getImgCode" title="点击更换验证码">
            </el-form-item>
            <el-form-item class="img-box" prop="phoneCode">
              <el-input v-model="form.phoneCode" placeholder="请输入验证码"></el-input>
              <el-button type="text" @click="getCode" class="get-code" :loading="loadingCode">{{codeText}}</el-button>
            </el-form-item>
            <el-form-item class="agreed">
              <el-checkbox v-model="checked">同意<a href="javascript:;" @click="dialogVisible = true">用户使用协议</a></el-checkbox>
            </el-form-item>
          </el-form>
          <div class="text-center">
            <el-button type="primary" @click="onSubmit" class="submit" :loading="loading" :disabled="!checked">注册</el-button>
          </div>
        </div>
        <div class="middleBox"></div>
        <div class="rightBox">
          <p>
            已有账号：
            <a href="javascript:;" @click="login">直接登录
              <i class="xffont font-xiayibu"></i>
            </a>
          </p>
          <p class="pass-tip"><i class="el-icon-info"></i>注册成功后，用户名为注册手机号，密码默认会以短信方式发送到手机，首次登录请修改密码</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="用户协议"
      :visible.sync="dialogVisible"
      width="700px">
      <agreement></agreement>
    </el-dialog>
  </div>
</template>

<script>
import {renderTitle, reg} from '../../../../common/js/utils'
import event from '../../../../common/js/event'
import Agreement from '../agreement/agreement.vue'

export default {
  components: {Agreement},
  data() {
    let _this = this
    return {
      checked: false,
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
        }, {
          validator(rule, value, callback) {
            _this.$post('/service/business/login/account/verificationPhone', {
              phone: value
            }, false).then(res => {
              if (res.error.result === 1) {
                callback()
              } else {
                callback(new Error(res.error.message))
              }
            })
          },
          trigger: 'blur'
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
      img: '',
      dialogVisible: false,
      phoneNumber: '',
      valiId: '',
      codeText: '获取验证码',
      sendable: true,
      loading: false,
      loadingCode: false,
      phoneValidCode: ''
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
                    this.phoneValidCode = res.result.valiCode
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
      this.$post('/service/business/login/account/userRegister', {
        aae005: this.form.phone,
        phoneCode: this.form.phoneCode,
        valiCode: this.phoneValidCode,
        cczy06: 1, // (数据来源）：(1：官网注:3：微官网注册，4：app注册)
        remark: 2 // 单位1，用户2
      }).then(res => {
        this.loading = false
        if (res.error.result === 1) {
          this.$alert(`${res.error.message}`, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.login()
            }
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    login() {
      event.$emit('login', '', 1)
    }
  },
  created() {
    this.getImgCode()
    renderTitle('个人注册')
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .centerBox {
    width: 100%;
    padding: 50px 70px 40px 70px;
    @include clearFixed;
  }
  /*找工作*/
  .top{
    width:100%;
    height:40px;
    line-height: 40px;
    margin-bottom:20px;
    .topLeft{
      float:left;
      p{
        display: inline-block;
        font-size: 20px;
        color: #333;
      }
      span{
        color:#585858;
      }
    }
    .topRight{
      float:right;
      a{
        color: $--color-primary;
      }
    }
  }
  .leftBox{
    width: 50%;
    float: left;
  }
  .rightBox{
    width:35%;
    text-align: center;
    float:right;
  }
  .agreed{
    padding: 10px 10px;
    font-size:14px;
    a{
      color:$--color-primary;
    }
  }
  .text-center{
    text-align: center;
  }
  .rightBox{
    float:right;
    width:35%;
    margin-top:40px;
    p{
      margin:30px 0;
    }
    a{
      color:$--color-primary;
    }
  }
  .submit{
    width: 90%;
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
  .middleBox{
    float: left;
    height: 310px;
    margin: 0 44px;
    border-left: 1px solid #ebebeb;
    position: relative;
    &:after{
      height: 22px;
      width: 22px;
      content: '';
      display: block;
      position: absolute;
      left: -11px;
      top: 50%;
      z-index: 5;
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
  .pass-tip{
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 25px;
    i{
      margin: 0 5px 0 0;
    }
  }
</style>
