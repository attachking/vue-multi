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
              <el-input v-model.trim="form1.password2" type="password" placeholder="请重复新密码" clearable @keydown.native.enter="onSubmit1"></el-input>
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
            <i class="xffont font-youjian"></i>邮箱认证
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
      <el-collapse-item name="phone">
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
            <i class="xffont font-shouji-copy"></i>密保问题
          </div>
        </template>
        <div class="form">
          <el-form ref="question" :model="form4" :rules="rules4" class="form" label-width="100px">
            <el-form-item prop="oldCcmu05" label="原密保答案">
              <el-input placeholder="请输入原密保答案" v-model.trim="form4.oldCcmu05" clearable @keydown.native.enter="onSubmit4"></el-input>
            </el-form-item>
            <el-form-item prop="ccmu04" label="密保问题">
              <el-select placeholder="请选择密保问题" v-model="form4.ccmu04">
                <el-option label="val.label" value="val.value"></el-option>
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
      width="400px">
      <el-form ref="formEmailCode" inline :model="formEmailCode" :rules="emailCodeRules" class="form">
        <el-form-item prop="emailCode" label="邮箱">
          <el-input v-model.trim="formEmailCode.emailCode" placeholder="请输入邮箱收到的验证码" clearable @keydown.native.enter="emailCodeSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="emailCodeSubmit" :loading="emailCodeLoading" size="mini">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let _this = this
    return {
      activeNames: ['password'],
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
          trigger: 'change'
        }, {
          max: 25,
          message: '长度不能超过25位',
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '请输入新密码',
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
        password2: [{
          required: true,
          message: '请重复新密码',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (_this.form1.password === value) {
              callback()
            } else {
              callback(new Error('两次输入不一致'))
            }
          }
        }]
      },
      // 绑定邮箱表单
      form2: {
        email: ''
      },
      rules2: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱'))
            }
          }
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
          trigger: 'change'
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
            if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          }
        }]
      },
      form4: {
        oldCcmu05: '', // 原密保答案
        ccmu04: '', // 密保问题
        ccmu05: '' // 新密保答案
      },
      rules4: {
        oldCcmu05: [{
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
          message: '请输入原密保答案',
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
    handleChange(e) {
      if (e.length > this.lastNames.length) {
        for (let i = 0; i < e.length; i++) {
          let index = this.lastNames.findIndex(item => item === e[i])
          if (index === -1) {
            this.$refs[e[i]].resetFields()
            break
          }
        }
      }
      this.lastNames = Array.prototype.slice.call(e)
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
          this.emailDialog = true
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
        if (valid) {}
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
        if (valid) {}
      })
    },
    cancel(name) {
      let index = this.activeNames.findIndex(item => item === name)
      if (index !== -1) {
        this.activeNames.splice(index, 1)
      }
    }
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
    width: 400px;
    .el-select{
      width: 100%;
    }
  }
</style>
