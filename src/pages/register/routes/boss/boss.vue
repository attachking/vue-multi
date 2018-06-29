<template>
  <div>
    <div class="center">
      <div class="centerBox">
        <div class="top">
          <div class="topLeft">
            <p>招人</p> | <span>互联网人才都在这里</span>
          </div>
          <div class="topRight">
            <router-link to="/user">
              <a href="">我要找工作></a>
            </router-link>
          </div>
        </div>
        <div class="leftBox">
          <form action="">
            <div class="phoneNum">
              <input type="text" v-model.trim="phoneNumber" placeholder="请输入常用手机号">
            </div>
            <div class="imgCode">
              <input type="text" v-model.trim="imgCode" placeholder="请证明你不是机器人">
              <img :src="img" alt="" @click="getImgCode">
            </div>
            <div class="phoneCode">
              <input type="text" v-model="phoneCode" placeholder="请输入验证码">
              <el-button type="text" @click="getCode" class="get-code" :loadingCode="loadingCode">{{codeText}}</el-button>
            </div>
          </form>
          <el-button type="primary" class="submit" :loading="loading" @click="onSubmit">注册</el-button>
          <p class="agreed" style="margin-left: -40px;">注册代表你已同意
            <a href="javascript:;" @click="dialogVisible = true">[用户使用协议]</a>
          </p>
        </div>
        <div class="rightBox">
          <p>
            已有账号：
            <a href="javascript:;">直接登录
              <i class="xffont font-xiayibu"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
    <el-dialog
      title="用户协议"
      :visible.sync="dialogVisible"
      width="500px">
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>
import {renderTitle} from '../../../../common/js/utils'

export default {
  data() {
    return {
      dialogVisible: false,
      img: '',
      phoneNumber: '',
      imgCode: '',
      phoneCode: '',
      valiId: '',
      codeText: '获取验证码',
      sendable: true,
      loadingCode: false,
      loading: false
    }
  },
  methods: {
    // 获取图片验证码
    getImgCode() {
      this.$post('/service/business/login/verifyCode/getVerifyCode', {}).then(res => {
        this.img = 'data:image/png;base64,' + res.result.imageStr
        this.valiId = res.result.valiId
      })
    },
    getCode() {
      if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phoneNumber)) {
        this.$message({
          showClose: true,
          message: '格式不正确，请重新输入',
          type: 'warning'
        })
        return
      }
      if (this.sendable) {
        this.loadingCode = true
        this.$post('/service/business/login/account/verificationCode', {
          phone: this.phoneNumber,
          remark: 1,
          voliCode: this.imgCode,
          voliId: this.voliId
        }
        ).then(res => {
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
        aae005: this.phoneNumber,
        phoneCode: this.phoneCode,
        remark: 1
      }).then(res => {
        this.loading = false
        if (res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
        }
        if (res.error.result === 0) {
          this.loading = false
        }
      })
    }
  },
  created() {
    this.getImgCode()
    renderTitle('企业注册')
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .centerBox {
    width: 100%;
    height: 450px;
    padding: 50px 70px 40px;
    text-align: center;
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
        color:$--color-primary;
      }
    }
  }
  .leftBox{
    float:left;
    width:65%;
    text-align: center;
    border-right:1px dotted #ccc;
    div{
      padding: 20px 0 20px 10px;
      width:90%;
      border-bottom: 1px solid #e9e9e9;
      text-align: left;
      input{
        border:none;
        outline:none;
      }
      a{
        color:$--color-primary;
        font-size:14px;
        margin-left: 32%;
      }
    }
    .get-code{
      vertical-align: middle;
      color:$--color-primary;
      font-size:14px;
      display: inline-block;
      float: right;
      padding: 0 0;
    }
  }
  .rightBox{
    width:35%;
    text-align: center;
    float:right;
  }
  .agreed{
    font-size:14px;
    margin-left:-20px;
    margin-top:15px;
    a{
      color:$--color-primary;
    }
  }
  .rightBox{
    float:right;
    width:35%;
    margin-top:40px;
    p{
      margin:30px 0px;
    }
    a{
      color:$--color-primary;
    }
  }
  .submit{
    width:90%;
    margin-top:30px;
  }
  .imgCode{
    img{
      float:right;
    }
  }

</style>
