<template>
  <div class="xf-footer">
    <!--英文版-->
    <div class="xf-footer-con xf-footer-con-en" v-if="en">
      <div class="xf-footer-left">
        <img src="../../common/img/logo.png" alt="">
      </div>
      <div class="xf-footer-middle">
        <p>Address: No. 11 Zhengguang Rd, Zhengzhou, Henan, China (Office of the Organizing Committee of Talent Recruitment Conference for Innovation and Development, Henan, China)</p>
        <p>Hotline Service: 12333</p>
        <p>Website Technical Services: 0371-67919501&nbsp;&nbsp;0371-67919503 (9:00 a.m. – 5:00 p.m. Monday to Friday)</p>
        <p>Organizing Committee Office: 0371-69690404 (9:00 a.m. – 5:00 p.m. Monday to Friday)</p>
        <p>Fax: 0371-69690431&nbsp;&nbsp;E-mail: hnzcyz@126.com&nbsp;&nbsp;Postcode: 450000</p>
        <p class="police">
          <a href="http://www.miibeian.gov.cn/" target="_blank">ICP Number: 14002359</a>&nbsp;
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010702002490">
            <img style="vertical-align: middle" src="../../../static/assets/icon-police.png" />&nbsp;<span>豫公网安备 41010702002490号</span>
          </a>
        </p>
        <p>Copyright © 2018 All Rights Reserved by Talent Recruitment Conference for Innovation and Development, Henan, China</p>
        <p>Technical support:<a href="http://www.xfxxgs.com/" target="_blank">Henan Xunfeng Information Technology Co., Ltd.</a>
          <span style="margin-left: 15px;" :title="'总访问量：' + allCounts">PV：{{dayCounts}}</span>
        </p>
      </div>
      <div class="xf-footer-right-con">
        <div class="xf-footer-right">
          <div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/weixin-service.jpg">
          </div>
          <p>Wechat Service Account</p>
        </div>
        <div class="xf-footer-right">
          <div class="xf-footer-qrcode">
            <img :src="test ? './static/assets/qrcode/app-test.png' : './static/assets/qrcode/app.png'">
          </div>
          <p>Mobile APP</p>
        </div>
        <div class="xf-footer-right">
          <div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/weibo.png">
          </div>
          <p>
            <a href="https://weibo.com/u/6535737664" target="_blank">Weibo</a>
          </p>
        </div>
      </div>
    </div>
    <!--英文版结束-->
    <!--中文版开始-->
    <div class="xf-footer-con" v-if="!en">
      <div class="xf-footer-left">
        <img src="../../common/img/logo.png" alt="">
      </div>
      <div class="xf-footer-middle">
        <p>地址：中国·河南省郑州市正光路11号  中国·河南招才引智创新发展大会组委会办公室</p>
        <p>大会咨询热线：12333</p>
        <p>大会网站技术服务：0371-67919501&nbsp;&nbsp;0371-67919503（周一至周五 早上9点—下午5点）</p>
        <p>大会组委会办公室：0371-69690404（周一至周五 早上9点—下午5点）</p>
        <p>传真：0371-69690431&nbsp;&nbsp;邮箱：hnzcyz@126.com&nbsp;&nbsp;邮编：450000</p>
        <p class="police">
          <a href="http://www.miibeian.gov.cn/" target="_blank">豫ICP备14002359号</a>&nbsp;
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41010702002490">
            <img style="vertical-align: middle" src="../../../static/assets/icon-police.png" />&nbsp;<span>豫公网安备 41010702002490号</span>
          </a>
        </p>
        <p>Copyright © 2018 All Rights Reserved&nbsp;中国·河南招才引智创新发展大会组委会</p>
        <p>技术支持：<a href="http://www.xfxxgs.com/" target="_blank">河南讯丰信息技术有限公司</a>
          <span style="margin-left: 15px;" :title="'ALL：' + allCounts">今日访问量：{{dayCounts}}</span>
        </p>
      </div>
      <div class="xf-footer-right-con">
        <div class="xf-footer-right">
          <div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/weixin-service.jpg">
          </div>
          <p>微信服务号</p>
          <!--<div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/weixin.jpg">
          </div>
          <p>微信订阅号</p>-->
        </div>
        <div class="xf-footer-right">
          <!--<div class="xf-footer-qrcode">
            <img :src="test ? './static/assets/qrcode/mobile-test.png' : './static/assets/qrcode/mobile.png'">
          </div>
          <p>手机微官网</p>-->
          <div class="xf-footer-qrcode">
            <img :src="test ? './static/assets/qrcode/app-test.png' : './static/assets/qrcode/app.png'">
          </div>
          <p>移动APP</p>
        </div>
        <div class="xf-footer-right">
          <!--<div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/mp.jpg">
          </div>
          <p>微信小程序</p>-->
          <div class="xf-footer-qrcode">
            <img src="../../../static/assets/qrcode/weibo.png">
          </div>
          <p>
            <a href="https://weibo.com/u/6535737664" target="_blank">微博</a>
          </p>
        </div>
      </div>
    </div>
    <!--中文版结束-->
  </div>
</template>
<script>
import $ from 'jquery'
import {STORAGE_TYPE, storage, isEn} from '../../common/js/utils'
// 是否为质保环境
const test = !!process.env.TEST

export default {
  name: 'xf-footer',
  data() {
    return {
      test: test,
      dayCounts: '',
      allCounts: '',
      en: isEn()
    }
  },
  methods: {
    getCount() {
      this.$post('/service/business/baiduApi/baiduApi/getBaiduSTT.xf', {}, false).then(res => {
        this.dayCounts = res.result.dayCounts
        this.allCounts = res.result.allCounts
      })
    },
    notice() {
      let until = new Date('2018/09/30 07:00:00')
      let now = new Date()
      if (now.getTime() > until.getTime()) return
      this.$notify({
        title: '通知',
        message: '本网站定于2018年10月19日21：00至次日06：00进行网站维护，期间数据不会被保留，请勿操作，由此给您带来的不便，敬请谅解',
        duration: 20000,
        offset: 100,
        type: 'warning',
        customClass: 'tempNotice'
      })
    },
    notice2() {
      let until = new Date('2018/10/25 20:00:00')
      let now = new Date()
      if (now.getTime() > until.getTime()) return
      if (storage.getTemp(STORAGE_TYPE.noticed)) return
      this.$confirm('本网站定于2018年10月25日15：00至20：00进行网站升级，由此给您带来的不便，敬请谅解', '提示', {
        confirmButtonText: '不再提示',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        storage.temp(STORAGE_TYPE.noticed, 1)
      }).catch(() => {
        // closed
      })
    }
  },
  created() {
    this.getCount()
    this.notice2()
    // 图片自适应大小函数，img需要有固定大小父容器，onload函数调用
    window.handleBeauty = function(e) {
      var $el = $(e.target)
      var $parent = $el.parent()
      var p = $parent.height() / $parent.width()
      var m = $el.height() / $el.width()
      if (p > m) {
        $el.css({
          height: '100%',
          width: 'auto',
          marginLeft: `-${($el.width() * $parent.height() / $el.height() - $parent.width()) / 2}px`
        })
      } else {
        $el.css({
          height: 'auto',
          width: '100%',
          marginTop: `-${($el.height() * $parent.width() / $el.width() - $parent.height()) / 2}px`
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";

  .xf-footer{
    width: 100%;
    background: #303032;
    .xf-footer-con{
      width: 1250px;
      margin: 0 auto;
      color: #fff;
      font-size: 12px;
      height: 240px;
      &.xf-footer-con-en{
        height: 280px;
        .xf-footer-middle{
          padding: 0 0 0 22px;
          height: 240px;
          margin: 14px 0 0 0;
        }
        .xf-footer-left{
          height: 240px;
          padding: 59px 0 0 30px;
        }
        .xf-footer-right{
          padding: 36px 0 0 20px;
        }
      }
      @include clearFixed;
      .xf-footer-left{
        width: 180px;
        height: 200px;
        float: left;
        border-right: 1px solid #454547;
        margin: 20px 0;
        padding: 33px 0 0 30px;
        img{
          width: 116px;
          height: 116px;
        }
      }
      .xf-footer-middle{
        width: 695px;
        float: left;
        border-right: 1px solid #454547;
        padding: 0 0 0 115px;
        line-height: 25px;
        height: 200px;
        margin: 30px 0 0 0;
        a{
          color: #fff;
          &:hover{
            color: $--color-primary;
          }
        }
      }
      .xf-footer-right{
        width: 120px;
        height: 100%;
        float: left;
        padding: 20px 0 0 20px;
        p{
          margin: 5px 0 0 0;
          text-align: center;
          a{
            color: #fff;
            &:hover{
              color: $--color-primary;
            }
          }
        }
      }
    }
    .xf-footer-right-con{
      float: left;
      width: 370px;
      @include clearFixed;
    }
    .xf-footer-qrcode{
      margin: 50px 0 0 0;
      width: 100px;
      height: 100px;
      background: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .police{
    img{
      vertical-align: middle;
      display: inline-block;
    }
    span{
      vertical-align: middle;
    }
  }
</style>
