<template>
  <div class="pics">
    <el-upload
      :data="form"
      ref="upload"
      accept="image/*"
      class="upload-demo"
      :limit="6"
      :action="baseUrl + '/service/business/fm/pic/picInfo/uploadPicInfo'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="onSuccess"
      :file-list="fileList"
      :on-exceed="handleExceed"
      list-type="picture">
      <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB，最多上传6张</div>
    </el-upload>
    <empty v-if="!fileList.length"></empty>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="img">
        <img :src="currentPic.url" v-img="currentPic.url">
      </div>
      <div class="form">
        <el-form ref="form" :model="editForm" inline :rules="rules" label-width="100px">
          <el-form-item prop="desc" label="图片描述">
            <el-input v-model.trim="editForm.desc" placeholder="请输入图片描述" clearable @keydown.native.enter="onSubmit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {BASE_URL} from '../../../../../common/js/config'
import Empty from '../../../../../components/empty/empty.vue'

export default {
  components: {Empty},
  data() {
    return {
      baseUrl: BASE_URL,
      fileList: [],
      form: {
        picSize: 5120,
        remark: this.$userInfo.ccmu17 === 1 ? 2 : 3,
        _token: this.$userInfo.token,
        ccmu17: this.$userInfo.ccmu17,
        userId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmu01: this.$userInfo.ccmu01
      },
      rules: {
        caoa03: [{
          required: true,
          message: '请输入描述',
          trigger: 'change'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'change'
        }]
      },
      dialogVisible: false,
      currentPic: {},
      itemForm: {
        caoa01: '',
        file: '',
        remark: this.$userInfo.ccmu17 === 1 ? 2 : 3,
        desc: '',
        ccmu01: this.$userInfo.ccmu01
      },
      editForm: {
        desc: ''
      },
      loading: false
    }
  },
  methods: {
    handleRemove(file) {
      this.del(file.id)
    },
    handlePreview(file) {
      // caoa07 0未审核，1审核成功，2审核失败   caoa08失败原因
      if (file.caoa07 === 2) {
        this.$alert(`失败原因：${file.reason || '--'}，重新审核请删除后重新上传`, '详细信息', {
          confirmButtonText: '确定',
          callback: action => {}
        })
        return
      }
      this.currentPic = file
      this.editForm.desc = file.realname
      this.itemForm.caoa01 = file.id
      this.itemForm.file = file.url
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    onSubmit() {
      this.itemForm.desc = encodeURIComponent(this.editForm.desc)
      this.save('edit')
    },
    getList() {
      this.$post('/service/business/authen/authen/corpPic', {
        ccmu01: this.$userInfo.ccmu01,
        flag: this.$userInfo.ccmu17 === 1 ? 2 : 1
      }).then(res => {
        res.result.reverse()
        this.fileList = res.result.map(item => {
          return {
            url: item.caoa02,
            name: `${item.caoa03}（${item.caoa07 === 0 ? '未审核' : item.caoa07 === 1 ? '已审核' : '审核失败'}）`,
            id: item.caoa01,
            realname: item.caoa03,
            status: item.caoa07 === 1 ? 0 : 1,
            caoa07: item.caoa07,
            reason: item.caoa08
          }
        })
      })
    },
    onSuccess(res, file) {
      if (res.error && res.error.result === 1) {
        this.itemForm.caoa01 = ''
        this.itemForm.file = res.result[0]
        this.itemForm.desc = encodeURIComponent(file.name)
        this.save()
      }
    },
    save(remark) {
      if (remark) this.loading = true
      this.$post('/service/business/fm/pic/picInfo/savePicInfo', this.itemForm).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
          if (remark) this.dialogVisible = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    del(id) {
      this.$post('/service/business/authen/authen/delCorpPic', {
        ccmu17: this.$userInfo.ccmu17,
        id,
        aab001: this.$userInfo.aab001,
        aac001: this.$userInfo.aac001
      }).then(res => {
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    handleExceed(file, fileList) {
      this.$message({
        message: '最多上传6张',
        type: 'warning'
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .pics{
    padding: 20px 0;
  }
  .img{
    text-align: center;
    img{
      max-width: 100%;
      max-height: 200px;
    }
  }
  .form{
    padding: 15px 0 0 0;
    .el-input{
      width: 255px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
