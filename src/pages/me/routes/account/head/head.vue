<template>
  <div class="head">
    <div id="altContent"></div>
  </div>
</template>
<script>
import {BASE_URL} from '../../../../../common/js/config'

const xiuxiu = window.xiuxiu

export default {
  data() {
    return {}
  },
  methods: {
    xiuxiu(img) {
      let _this = this
      xiuxiu.embedSWF('altContent', 5, '100%', 600)
      xiuxiu.onClose = function (id) {
        _this.$router.back()
      }
      // 修改为您自己的图片上传接口
      xiuxiu.onInit = function (id) {
        xiuxiu.setUploadURL(BASE_URL + '/service/business/login/account/photoUpload')
        // 初始化图片
        xiuxiu.loadPhoto(img)
        xiuxiu.setUploadType(2)
        // 设置上传图片name
        xiuxiu.setUploadDataFieldName('file')
        // 设置其他表单参数
        const args = {
          'ccmu01': _this.$userInfo.ccmu01,
          'picSize': 1024,
          'ccmu17': _this.$userInfo.ccmu17
        }
        args._token = _this.$userInfo.token
        if (_this.$userInfo.ccmu17 === 1) {
          args.userId = _this.$userInfo.aac001
        } else {
          args.userId = _this.$userInfo.aab001
        }
        xiuxiu.setUploadArgs(args)
      }
      // 处理服务器响应参数
      xiuxiu.onUploadResponse = function (data) {
        data = JSON.parse(data)
        console.log(data)
      }
      xiuxiu.onDebug = function (data) {
        console.log(data)
      }
    }
  },
  mounted() {
    this.xiuxiu()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
</style>
