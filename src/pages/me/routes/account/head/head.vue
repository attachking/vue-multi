<template>
  <div class="head">
    <div id="altContent"></div>
  </div>
</template>
<script>
import {FILE_URL} from '../../../../../common/js/config'
import {mapGetters} from 'vuex'
import event from '../../../../../common/js/event'

const xiuxiu = window.xiuxiu

export default {
  computed: {
    ...mapGetters([
      'corpInfo',
      'personalInfo'
    ])
  },
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
        const url = (FILE_URL || location.protocol + '//' + location.host) + '/service/business/fm/pic/picInfo/uploadPicInfo'
        xiuxiu.setUploadURL(url)
        // 初始化图片
        xiuxiu.loadPhoto(img)
        xiuxiu.setUploadType(2)
        // 设置上传图片name
        xiuxiu.setUploadDataFieldName('file')
        // 设置其他表单参数
        const args = {
          ccmu01: _this.$userInfo.ccmu01,
          picSize: 1024,
          ccmu17: _this.$userInfo.ccmu17,
          remark: 1
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
        let res = JSON.parse(data)
        if (res.error && res.error.result === 1) {
          _this.save(res.result[0])
        }
      }
      xiuxiu.onDebug = function (data) {
        console.log(data)
      }
    },
    save(file) {
      this.$post('/service/business/fm/pic/picInfo/savePicInfo', {
        file,
        remark: 1,
        ccmu01: this.$userInfo.ccmu01
      }).then(res => {
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          event.$emit('refresh')
        }
      })
    }
  },
  mounted() {
    const img = this.$userInfo.ccmu17 === 1 ? this.personalInfo.ccmu15 : this.corpInfo.ccmu15
    this.xiuxiu(img)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
</style>
