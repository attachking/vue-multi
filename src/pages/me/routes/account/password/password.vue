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
              <el-button type="primary" @click="onSubmit1" v-loading="loading1" size="mini">确定</el-button>
              <el-button type="default" @click="cancel('password')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    let _this = this
    return {
      activeNames: ['password'],
      form1: {
        ccmu17: this.$userInfo.ccmu17,
        ccmu01: this.$userInfo.ccmu01,
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
      loading1: false
    }
  },
  methods: {
    handleChange() {},
    onSubmit1() {
      this.$refs.password.validate(valid => {
        if (valid) {}
      })
    },
    cancel() {}
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
  }
</style>
