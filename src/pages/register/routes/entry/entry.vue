<template>
  <div class="entry">
    <div class="center">
      <div class="centerBox">
        <div class="findJob">
          <h3>找工作</h3>
          <p>专注互联网职业机会</p>
          <div class="jobImg">
            <img src="./job.png" alt="">
          </div>
          <div class="jobInput">
            <!--相当于a标签-->
            <router-link to="/user">
              <input type="button" value="去找工作">
            </router-link>
          </div>
        </div>
        <div class="findWorker">
          <h3>招人</h3>
          <p>互联网人都在这里</p>
          <div class="workerImg">
            <img src="./worker.png" alt="">
          </div>
          <div class="workerInput">
            <router-link to="/boss">
              <input type="button" value="去发布职位">
            </router-link>
          </div>
        </div>
      </div>
      <div class="goLogin">
        <p>
          已有账号，请
          <a href="">登录</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    getCode() {}
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
    }
    p {
      color: #585858;
      margin: 5px 0px;
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
      a {
        color: $--color-primary;
      }
    }
  }
</style>
