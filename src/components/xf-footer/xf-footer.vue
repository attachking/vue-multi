<template>
  <div class="xf-footer">
    <div class="xf-footer-con">
      <div class="xf-footer-left">
        <img src="../../common/img/logo.png" alt="">
      </div>
      <div class="xf-footer-middle">
        <p>地址：中国·河南省郑州市正光路11号  中国·河南招才引智创新发展大会组委会办公室</p>
        <p>电话：0371-69690404&nbsp;&nbsp;0371-69690431&nbsp;&nbsp;0371-69690432</p>
        <p style="text-indent: 3em;">0371-69690433&nbsp;&nbsp;0371-69690434&nbsp;&nbsp;0371-69690435</p>
        <p>传真：0371-69690431&nbsp;&nbsp;邮箱：hnzcyz@126.com&nbsp;&nbsp;邮编：450000</p>
        <p>豫ICP备05021803号&nbsp;Copyright © 2018 All Right Reserved&nbsp;中国·河南招才引智创新发展大会组委会</p>
      </div>
      <div class="xf-footer-right">
        <div class="xf-footer-qrcode">
          <img src="../../../static/assets/qrcode/weixin.png">
        </div>
        <p>官方微信号</p>
      </div>
      <div class="xf-footer-right">
        <div class="xf-footer-qrcode">
          <img src="../../../static/assets/qrcode/weibo.png">
        </div>
        <p>官方微博</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'xf-footer'
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";

  .xf-footer{
    width: 100%;
    background: #303032;
    height: 205px;
    .xf-footer-con{
      width: 1200px;
      margin: 0 auto;
      color: #fff;
      font-size: 14px;
      @include clearFixed;
      .xf-footer-left{
        width: 200px;
        height: 145px;
        float: left;
        border-right: 1px solid #454547;
        margin: 30px 0;
        padding: 15px 0 0 30px;
      }
      .xf-footer-middle{
        width: 715px;
        float: left;
        border-right: 1px solid #454547;
        padding: 0 0 0 60px;
        line-height: 30px;
        height: 145px;
        margin: 30px 0;
      }
      .xf-footer-right{
        width: 138px;
        height: 100%;
        float: left;
        padding: 36px 0 0 15px;
        p{
          margin: 10px 0 0 0;
          text-align: center;
        }
      }
    }
    .xf-footer-qrcode{
      width: 109px;
      height: 109px;
      padding: 5px;
      background: #fff;
      margin: 0 0 0 7px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
