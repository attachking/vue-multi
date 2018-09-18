<template>
  <div class="password">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="password">
        <template slot="title">
          <div class="tit">
            <i class="xffont font-suo"></i>修改密码
          </div>
        </template>
        <div class="form">
          <el-form ref="password" :model="form1" :rules="rules1" class="form" label-width="100px">
            <el-form-item prop="oldPassword" label="原密码">
              <el-input v-model.trim="form1.oldPassword" type="password" placeholder="请输入原密码" clearable @keydown.native.enter="onSubmit1"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
              <el-input v-model.trim="form1.password" type="password" placeholder="请输入新密码" clearable @keydown.native.enter="onSubmit1"></el-input>
            </el-form-item>
            <el-form-item prop="password2" label="确认密码">
              <el-input v-model.trim="form1.password2" type="password" placeholder="请重复输入新密码" clearable @keydown.native.enter="onSubmit1"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit1" :loading="loading1" size="mini">确定</el-button>
              <el-button type="default" @click="cancel('password')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="email">
        <template slot="title">
          <div class="tit">
            <i class="xffont font-youjian"></i>邮箱认证 <span :class="info.ccmu12 === 1 ? 'green' : 'red'">（{{info.ccmu12 === 1 ? '已认证' : '未认证'}}）</span>
            <span>（认证的邮箱用于接收系统信息）</span>
          </div>
        </template>
        <div class="form">
          <el-form ref="email" :model="form2" :rules="rules2" class="form" label-width="100px">
            <el-form-item prop="email" label="邮箱">
              <el-input v-model.trim="form2.email" placeholder="请输入邮箱" clearable @keydown.native.enter="onSubmit2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit2" :loading="loading2" size="mini">确定</el-button>
              <el-button type="default" @click="cancel('email')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="phone" v-if="false">
        <template slot="title">
          <div class="tit">
            <i class="xffont font-shouji-copy"></i>手机认证
          </div>
        </template>
        <div class="form">
          <el-form ref="phone" :model="form3" :rules="rules3" class="form" label-width="100px">
            <el-form-item prop="phone" label="手机号">
              <el-input placeholder="请输入手机号" v-model.trim="form3.phone" clearable @keydown.native.enter="senCode">
                <el-button slot="append" type="primary" @click="senCode">{{codeText}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="phone" label="验证码">
              <el-input placeholder="请输入短信验证码" v-model.trim="form3.phone" clearable @keydown.native.enter="onSubmit3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit3" :loading="loading3" size="mini">确定</el-button>
              <el-button type="default" @click="cancel('phone')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
      <el-collapse-item name="question">
        <template slot="title">
          <div class="tit">
            <i class="xffont font-shouji-copy"></i>密保问题 <span :class="info.ccmu04 ? 'green' : 'red'">（{{info.ccmu04 ? '已设置' : '未设置'}}）</span>
          </div>
        </template>
        <div class="form">
          <el-form ref="question" :model="form4" :rules="rules4" class="form" label-width="100px">
            <el-form-item label="原密保问题" v-if="info.ccmu04">
              <span>{{info.ccmu04}}</span>
            </el-form-item>
            <el-form-item prop="oldccmu05" label="原密保答案" v-if="info.ccmu04">
              <el-input placeholder="请输入原密保答案" v-model.trim="form4.oldccmu05" clearable @keydown.native.enter="onSubmit4"></el-input>
            </el-form-item>
            <el-form-item prop="ccmu04" label="密保问题">
              <el-select placeholder="请选择密保问题" v-model="form4.ccmu04">
                <el-option :label="val.name" :value="val.name" :key="val.code" v-for="val in dictionaries.TAB_SECURITY"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="ccmu05" label="密保答案">
              <el-input placeholder="请输入密保答案" v-model.trim="form4.ccmu05" clearable @keydown.native.enter="onSubmit4"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit4" :loading="loading4" size="mini">确定</el-button>
              <el-button type="default" @click="cancel('question')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      title="邮箱验证"
      :visible.sync="emailDialog"
      :close-on-click-modal="false"
      width="450px">
      <el-form ref="formEmailCode" inline :model="formEmailCode" :rules="emailCodeRules" class="emailForm">
        <el-form-item prop="emailCode" label="邮箱">
          <el-input v-model.trim="formEmailCode.emailCode" style="width: 220px;" placeholder="请输入邮箱收到的验证码" clearable @keydown.native.enter="emailCodeSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="emailCodeSubmit" :loading="emailCodeLoading" size="mini">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {reg} from '../../../../../common/js/utils'

export default {
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  data() {
    let _this = this
    return {
      info: {},
      activeNames: [],
      lastNames: ['password'],
      emailDialog: false,
      // 修改密码表单
      form1: {
        ccmu17: this.$userInfo.ccmu17,
        ccmu01: this.$userInfo.ccmu01,
        aac001: this.$userInfo.aac001,
        aab001: this.$userInfo.aab001,
        oldPassword: '',
        password: '',
        password2: ''
      },
      rules1: {
        oldPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
        }, {
          max: 25,
          message: '长度不能超过25位',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          min: 6,
          message: '长度不能低于6位',
          trigger: 'blur'
        }, {
          max: 25,
          message: '长度不能超过25位',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z0-9_]*$/.test(value)) {
              if (value === _this.form1.oldPassword) {
                callback(new Error('新密码不能与旧密码相同'))
              } else {
                callback()
              }
            } else {
              callback(new Error('只能输入数字、字母或下划线'))
            }
          },
          trigger: 'blur'
        }],
        password2: [{
          required: true,
          message: '请重复输入新密码',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (_this.form1.password === value) {
              callback()
            } else {
              callback(new Error('新密码和确认密码不一致'))
            }
          },
          trigger: 'blur'
        }]
      },
      // 绑定邮箱表单
      form2: {
        email: '',
        ccmu01: this.$userInfo.ccmu01,
        ccmu17: this.$userInfo.ccmu17,
        flag: 0
      },
      rules2: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (value === _this.info.ccmu08 && _this.info.ccmu12 === 1) {
              callback(new Error('该邮箱已认证，无需重复认证'))
              return
            }
            if (reg.email(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱'))
            }
          },
          trigger: 'blur'
        }]
      },
      // 邮箱验证码表单
      formEmailCode: {
        emailCode: ''
      },
      emailCodeRules: {
        emailCode: [{
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z\d]{3,10}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的验证码'))
            }
          },
          trigger: 'blur'
        }]
      },
      // 绑定手机表单
      form3: {
        phone: ''
      },
      rules3: {
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
        }]
      },
      form4: {
        oldccmu05: '', // 原密保答案
        ccmu04: '', // 密保问题
        ccmu05: '', // 新密保答案
        ccmu17: this.$userInfo.ccmu17,
        ccmu01: this.$userInfo.ccmu01
      },
      rules4: {
        oldccmu05: [{
          required: true,
          message: '请输入原密保答案',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'change'
        }],
        ccmu04: [{
          required: true,
          message: '请选择密保问题',
          trigger: 'change'
        }],
        ccmu05: [{
          required: true,
          message: '请输入密保答案',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'change'
        }]
      },
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      codeText: '发送验证码',
      loadingCode: false,
      emailCodeLoading: false
    }
  },
  methods: {
    getInfo() {
      this.$post('/service/business/login/account/getAccountMsg', {
        ccmu01: this.$userInfo.ccmu01
      }).then(res => {
        /*
        * ccmu12:邮箱是否认证（0：否，1：是）
        * ccmu13:手机是否认证（0：否，1：是）
        * ccmu05state(0：未设置，1：已设置）
        * ccmu08:邮箱
        * ccmu09:手机
        * ccmu04:密保问题
        * */
        this.info = res.result
        this.form2.email = res.result.ccmu08 || ''
      })
    },
    handleChange(e) {
      if (e.length > this.lastNames.length) {
        for (let i = 0; i < e.length; i++) {
          let index = this.lastNames.findIndex(item => item === e[i])
          if (index === -1) {
            this.resetFields(e[i])
            break
          }
        }
      }
      this.lastNames = Array.prototype.slice.call(e)
    },
    resetFields(name) {
      this.$refs[name].clearValidate()
      if (name === 'email') return
      this.$refs[name].resetFields()
    },
    onSubmit1() {
      this.$refs.password.validate(valid => {
        if (valid) {
          this.loading1 = true
          this.$post('/service/business/login/account/savePwd', this.form1).then(res => {
            this.loading1 = false
            if (res.error && res.error.result === 1) {
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.cancel('password')
            }
          }).catch(() => {
            this.loading1 = false
          })
        }
      })
    },
    onSubmit2() {
      this.$refs.email.validate(valid => {
        if (valid) {
          this.loading2 = true
          this.$post('/service/business/login/account/emailSend', this.form2).then(res => {
            this.loading2 = false
            if (res.error && res.error.result === 1) {
              this.emailDialog = true
              this.formEmailCode.emailCode = ''
            }
          }).catch(() => {
            this.loading2 = false
          })
        }
      })
    },
    onSubmit3() {
      this.$refs.phone.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit4() {
      this.$refs.question.validate(valid => {
        if (valid) {
          this.loading4 = true
          this.$post('/service/business/login/account/accountSave', this.form4).then(res => {
            this.loading4 = false
            if (res.error && res.error.result === 1) {
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.cancel('question')
              this.getInfo()
            }
          }).catch(() => {
            this.loading4 = false
          })
        }
      })
    },
    senCode() {
      this.$refs.phone.validateField('phone', err => {
        if (!err) {
          if (this.loadingCode) return
          let seconds = 60
          this.loadingCode = true
          this.codeText = `${seconds}s`
          const inter = setInterval(() => {
            seconds--
            if (seconds < 0) {
              this.codeText = '发送验证码'
              this.loadingCode = false
              clearInterval(inter)
              return
            }
            this.codeText = `${seconds}s`
          }, 1000)
        }
      })
    },
    emailCodeSubmit() {
      this.$refs.formEmailCode.validate(valid => {
        if (valid) {
          this.$post('/service/business/login/account/updateEM', {
            ccmu01: this.$userInfo.ccmu01,
            valiCode: this.formEmailCode.emailCode,
            email: this.form2.email
          }).then(res => {
            if (res.error && res.error.result === 1) {
              this.$alert(res.error.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.emailDialog = false
                  this.cancel('email')
                  this.getInfo()
                }
              })
            }
          })
        }
      })
    },
    cancel(name) {
      this.resetFields(name)
      let index = this.activeNames.findIndex(item => item === name)
      if (index !== -1) {
        this.activeNames.splice(index, 1)
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .password{
    padding: 20px 0 0 0;
  }
  .tit{
    .xffont{
      font-size: 16px;
      color: #666;
      margin: 0 5px 0 0;
    }
  }
  .form{
    padding: 15px 0 0 0;
    width: 400px;
    .el-select{
      width: 100%;
    }
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
</style>
