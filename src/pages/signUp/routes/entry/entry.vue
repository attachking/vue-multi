<template>
  <div class="entry">
    <div class="center">
      <div class="centerBox">
        <div class="item">
          <h3>个人报名</h3>
          <p>栽下梧桐树，引得凤凰来</p>
          <div class="jobImg">
            <img src="./user.jpg" alt="">
          </div>
          <div class="jobInput">
            <router-link to="/personal">
              <input type="button" value="去报名">
            </router-link>
          </div>
        </div>
        <div class="item">
          <h3>用人单位报名</h3>
          <p>中原大舞台，助力您精彩</p>
          <div class="workerImg">
            <img src="./corp.jpg" alt="">
          </div>
          <div class="workerInput">
            <input type="button" value="去报名" @click="handleCorp">
          </div>
        </div>
        <div class="item">
          <h3>特邀专家报名</h3>
          <p>共商创新发展，支撑人才智力</p>
          <div class="workerImg">
            <img src="./expert.jpg" alt="">
          </div>
          <div class="workerInput">
            <router-link to="/expert-check">
              <input type="button" value="去报名">
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import event from '../../../../common/js/event'

export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    login() {
      event.$emit('login')
    },
    handleCorp() {
      this.$confirm('用人单位报名名额已满，享受更多服务，请直接注册！', '提示', {
        confirmButtonText: '去注册',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        location.href = 'register.html'
      }).catch(() => {
        // 取消
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .center{
    padding: 0 0 30px 0;
  }
  .centerBox {
    width: 100%;
    padding: 50px 20px 40px 20px;
    text-align: center;
    @include clearFixed;
    .item{
      width: 33.3%;
      float: left;
      &:not(:last-child){
        border-right: 1px dotted #e3e3e3;
      }
    }
    input {
      width: 178px;
      height: 38px;
      border: 1px solid $--color-primary;
      color: $--color-primary;
      background: #fff;
      font-size: 16px;
      border-radius: 3px;
      text-align: center;
      outline:none;
      margin: 20px 0;
      &:hover{
        cursor: pointer;
        background: $--color-primary;
        color: #fff;
      }
    }
    p {
      color: #666;
      margin: 20px 0;
      min-height: 22px;
    }
    img {
      width: 232px;
      height: 172px;
      img{
        margin: 30px 15px;
      }
    }
  }
  .goLogin {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    p {
      color: #777777;
      font-size: 14px;
      a {
        color: $--color-primary;
      }
    }
  }
</style>
