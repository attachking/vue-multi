<template>
  <div class="entry">
    <div class="center">
      <div class="centerBox">
        <div class="findJob">
          <h3>个人报名</h3>
          <p>栽下梧桐树，引得凤凰来</p>
          <div class="jobImg">
            <img src="./worker.png" alt="">
          </div>
          <div class="jobInput">
            <router-link to="/personal">
              <input type="button" value="去报名">
            </router-link>
          </div>
        </div>
        <div class="findWorker">
          <h3>用人单位报名</h3>
          <p>中原大舞台，助力您精彩</p>
          <div class="workerImg">
            <img src="./corp.png" alt="">
          </div>
          <div class="workerInput">
            <router-link to="/corp">
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
    padding: 50px 70px 40px 70px;
    text-align: center;
    @include clearFixed;
    .findJob {
      width: 50%;
      float: left;
      border-right: 1px dotted #e3e3e3;
    }
    .findWorker {
      float: left;
      width: 50%;
      text-align: center;
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
