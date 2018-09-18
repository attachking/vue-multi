<template>
  <div class="expert">
    <div class="title">特邀专家报名</div>
    <div class="form-con">
      <el-form ref="form" :rules="rules" :model="form" label-width="170px" class="form">
        <el-form-item label="姓名" prop="guestName">
          <el-input v-model.trim="form.guestName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="guestTel">
          <el-input v-model.trim="form.guestTel" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邀请码" prop="invitationNo">
          <el-input v-model.trim="form.invitationNo" placeholder="请输入邀请码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="submit" :loading="loading">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {reg} from '../../../../common/js/utils'

export default {
  data() {
    return {
      loading: false,
      rules: {
        guestName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'change'
        }, {
          max: 25,
          message: '最多25个字符',
          trigger: 'change'
        }],
        guestTel: [{
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
        invitationNo: [{
          required: true,
          message: '请输入邀请码',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (reg.code(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邀请码'))
            }
          },
          trigger: 'change'
        }]
      },
      form: {
        guestName: '', // name
        guestTel: '', // 电话
        invitationNo: '' // 邀请码
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({}, this.form)
          form.guestName = encodeURIComponent(form.guestName)
          this.loading = true
          this.$post('/service/business/college/registration/guestRegist/checkGuest.xf', form, false).then(res => {
            this.loading = false
            if (res.error && res.error.result === 0) {
              this.$alert(res.error.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {}
              })
            }
            if (res.error && res.error.result === 1) {
              window.expertTemp = res.result
              this.$router.push({name: 'expert'})
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  },
  created() {
    // 1
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .expert{
    background: url("../corp/bg.jpg") no-repeat center 100%;
    background-size: 100%;
    .title{
      font-size: 26px;
      color: $--color-primary;
      font-weight: bold;
      padding: 20px 20px;
      border-bottom: 1px solid #d9d9d9;
      text-align: center;
    }
  }
  .form-con{
    width: 570px;
    padding: 80px 0 80px 100px;
    .el-select,.el-cascader{
      width: 100%;
    }
    .submit{
      width: 100%;
    }
  }
  .datetime{
    width: 100%;
  }
</style>
