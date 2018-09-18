<template>
  <div class="right-menu">
    <div class="right-menu-item">
      <div class="sign-up-con">
        <div class="sign-up">
          <a href="signUp.html">大会报名</a>
          <a href="signUp.html">点击报名</a>
        </div>
      </div>
    </div>
    <div class="right-menu-item">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c two">
          <img src="./static/weixin.png">
          <span>微信</span>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <div class="qrcode-box">
          <img src="../../../static/assets/qrcode/weixin-service.jpg" v-img="'./static/assets/qrcode/weixin-service.jpg'">
          <p>微信服务号</p>
          <img src="../../../static/assets/qrcode/weixin.jpg" v-img="'./static/assets/qrcode/weixin.jpg'">
          <p>微信订阅号</p>
          <img src="../../../static/assets/qrcode/mp.jpg" v-img="'./static/assets/qrcode/mp.jpg'">
          <p>微信小程序</p>
        </div>
      </div>
    </div>
    <div class="right-menu-item">
      <div class="sign-up-con">
        <div class="sign-up">
          <a href="javascript:;">移动APP</a>
          <a href="javascript:;">扫描下载</a>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <div class="qrcode-box">
          <img :src="test ? './static/assets/qrcode/app-test.png' : './static/assets/qrcode/app.png'" v-img="test ? './static/assets/qrcode/app-test.png' : './static/assets/qrcode/app.png'">
        </div>
      </div>
    </div>
    <div class="right-menu-item">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c">
          <img src="./static/phone.png">
          <span>手机微官网</span>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <div class="qrcode-box">
          <img :src="test ? './static/assets/qrcode/mobile-test.png' : './static/assets/qrcode/mobile.png'" v-img="test ? './static/assets/qrcode/mobile-test.png' : './static/assets/qrcode/mobile.png'">
        </div>
      </div>
    </div>
    <div class="right-menu-item">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c two">
          <img src="./static/weibo.png">
          <span>微博</span>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <div class="qrcode-box">
          <img src="../../../static/assets/qrcode/weibo.png" v-img="'./static/assets/qrcode/weibo.png'">
        </div>
      </div>
    </div>
    <div class="right-menu-item" v-if="showTop" @click="scrollTop">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c">
          <img src="./static/top.png">
          <span>回到顶部</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'

// 是否为质保环境
const test = !!process.env.TEST

export default {
  name: 'right-menu',
  data() {
    return {
      showTop: false,
      test: test
    }
  },
  methods: {
    scrollTop() {
      this.$emit('onscroll')
      this.stop()
      this.timer = setInterval(() => {
        let current = $(window).scrollTop()
        if (current <= 0) {
          this.stop()
        }
        $(window).scrollTop(Math.floor(current - (current - 0) / 20))
      }, 20)
    },
    stop() {
      clearInterval(this.timer)
    }
  },
  created() {
    $(document).on('scroll', e => {
      this.showTop = $(window).scrollTop() > 0
    })
    $(document).on('mousewheel DOMMouseScroll', () => {
      clearInterval(this.timer)
    })
  }
}
</script>
<style scoped lang="scss">
  @keyframes rightMenu {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  .right-menu{
    position: fixed;
    right: 10px;
    top: 50%;
    z-index: 5;
    transform: translate3d(0,-50%,0);
    *{
      transition: all .3s ease;
    }
  }
  .right-menu-item{
    width: 50px;
    height: 50px;
    background: url("./static/bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .sign-up-con{
      overflow: hidden;
      height: 100%;
      width: 100%;
      padding: 2px 0 0 0;
    }
    .sign-up{
      overflow: hidden;
      a{
        color: #fff;
        font-size: 14px;
        width: 30px;
        display: inline-block;
        margin: 5px 0 0 11px;
      }
    }
    .right-menu-qrcode{
      .qrcode-box{
        background: #fff;
        padding: 5px;
      }
      position: absolute;
      right: 50px;
      top: 50%;
      display: none;
      padding: 0 5px 0 0;
      transform: translate(0, -50%);
      img{
        width: 100px;
        display: block;
      }
      p{
        padding: 0 0 5px 0;
        text-align: center;
        font-size: 14px;
      }
    }
    &:not(:last-child){
      margin: 0 0 4px 0;
    }
    &:hover{
      cursor: pointer;
      .right-menu-icon-c{
        transform: translate(0,-48px);
      }
      .sign-up{
        transform: translate(0,-43px);
      }
      .two{
        transform: translate(0,-40px);
      }
      .app{
        transform: translate(0,-54px);
      }
      .right-menu-qrcode{
        display: block;
        opacity: 1;
        animation: rightMenu .5s;
      }
    }
    &:nth-child(4){
      .right-menu-icon{
        padding: 12px 0 0 0;
      }
    }
  }
  .right-menu-icon{
    overflow: hidden;
    padding: 15px 0 0 0;
    height: 100%;
    width: 100%;
    img{
      display: block;
      margin: 0 auto;
    }
    span{
      color: #fff;
      display: inline-block;
      width: 100%;
      padding: 20px 0 0 0;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
