<template>
  <div class="corp">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="单位名称" prop="name">
        <el-input v-model="form.name" class="input" placeholder="请输入与证件上一致的企业名称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="name">
        <el-input v-model="form.name" class="input" placeholder="请输入邮箱以接收认证等消息"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="name">
        <el-input v-model="form.name" class="input" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="name">
        <el-input v-model="form.name" class="input" placeholder="支持数字、字母或下划线"></el-input>
        <span class="tip">注册成功后可作为登录账号</span>
      </el-form-item>
      <el-form-item label="密码" prop="name">
        <el-input v-model="form.name" class="input" placeholder="支持数字、字母或下划线"></el-input>
        <span class="tip">支持数字、字母、下划线，长度6-16位</span>
      </el-form-item>
      <el-form-item label="确认密码" prop="name">
        <el-input v-model="form.name" class="input" placeholder="请重新输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="我已阅读并同意" name="type" v-model="read"></el-checkbox>
        <a href="javascript:;" @click="dialogVisible = true">《就业服务网协议书》</a>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!read" class="input" @click="onSubmit">免费注册</el-button>
      </el-form-item>
      <el-form-item>
        <div class="input login">已有账号，立即<a href="javascript:;" @click="login">登录</a></div>
      </el-form-item>
    </el-form>
    <el-dialog
      title="就业服务网协议书"
      :visible.sync="dialogVisible"
      width="50%">
      <span>就业服务网协议书</span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {},
      dialogVisible: false,
      read: false
    }
  },
  methods: {
    login() {
      this.$emit('login')
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {}
      })
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .corp{
    width: 660px;
    padding: 60px 0;
    margin: 0 auto;
  }
  .input{
    width: 295px;
  }
  .tip{
    display: inline-block;
    padding: 0 0 0 10px;
    color: #666;
    font-size: 14px;
  }
  .login{
    text-align: center;
    a{
      color: $--color-primary;
    }
  }
</style>
