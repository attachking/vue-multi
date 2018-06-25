<template>
  <div class="right-menu">
    <div class="right-menu-item">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c">
          <img src="./static/weixin.png">
          <span>微信公众号</span>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <img src="../../../static/assets/qrcode/weixin.png">
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
        <img src="../../../static/assets/qrcode/weixin.png">
      </div>
    </div>
    <div class="right-menu-item">
      <div class="right-menu-icon">
        <div class="right-menu-icon-c">
          <img src="./static/weibo.png">
          <span>新浪微博</span>
        </div>
      </div>
      <div class="right-menu-qrcode">
        <img src="../../../static/assets/qrcode/weibo.png">
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

export default {
  name: 'right-menu',
  data() {
    return {
      showTop: false
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
    right: 20px;
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
    .right-menu-qrcode{
      position: absolute;
      right: 60px;
      top: 10px;
      display: none;
      padding: 5px;
      background: #fff;
      img{
        width: 100px;
      }
    }
    &:not(:last-child){
      margin: 0 0 4px 0;
    }
    &:hover{
      cursor: pointer;
      opacity: .9;
      .right-menu-icon-c{
        transform: translate(0,-46px);
      }
      .right-menu-qrcode{
        display: block;
        opacity: 1;
        animation: rightMenu .5s;
      }
    }
    &:nth-child(2){
      .right-menu-icon{
        padding: 11px 0 0 0;
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
