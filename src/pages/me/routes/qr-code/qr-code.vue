<template>
  <div class="qr-code">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-erweima"></i>我的二维码</span>
    </div>
    <img :src="src" alt="" class="img">
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  methods: {
    getImg() {
      this.$post('/service/business/fm/pic/picInfo/qrCodeGenerate.xf', {
        /// type=1 个人   type=2 单位   type=3 岗位
        type: this.$userInfo.ccmu17,
        paramsId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001
      }).then(res => {
        this.src = res.result.qrCodeUrl
      })
    }
  },
  created() {
    this.getImg()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .qr-code{
    padding: 20px 20px;
    .img{
      width: 300px;
      margin: 0 auto;
      display: block;
    }
  }
</style>
