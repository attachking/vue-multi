<template>
  <div class="entry">
    <div class="center">
      <div class="centerBox">
        <div class="findJob">
          <h3>找工作</h3>
          <p>海量工作岗位一网全知</p>
          <div class="jobImg">
            <img src="./job.jpg" alt="" onload="handleBeauty(event)">
          </div>
          <div class="jobInput">
            <router-link to="/user">
              <input type="button" value="去找工作">
            </router-link>
          </div>
        </div>
        <div class="findWorker">
          <h3>找人才</h3>
          <p>优秀人才信息一览无余</p>
          <div class="jobImg">
            <img src="./worker.jpg" alt="" onload="handleBeauty(event)">
          </div>
          <div class="workerInput">
            <router-link to="/boss">
              <input type="button" value="去发布岗位">
            </router-link>
          </div>
        </div>
      </div>
      <div class="goLogin">
        <p>
          已有账号，请
          <a href="javascript:;" @click="login(1)">个人登录</a>&nbsp;/&nbsp;<a href="javascript:;" @click="login(2)">单位登录</a>
        </p>
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
    login(type) {
      event.$emit('login', '', type)
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
    .jobImg {
      width: 232px;
      height: 172px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
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
