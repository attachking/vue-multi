<template>
  <div class="pics">
    <el-upload
      :data="form"
      ref="upload"
      accept="image/*"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="img">
        <img :src="currentPic.url" v-img="currentPic.url">
      </div>
      <div class="form">
        <el-form ref="form" :model="form" inline :rules="rules" label-width="100px">
          <el-form-item prop="caoa03" label="图片描述">
            <el-input v-model.trim="form.caoa03" placeholder="请输入图片描述" clearable @keydown.native.enter="onSubmit"></el-input>
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

export default {
  data() {
    return {
      baseUrl: BASE_URL,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        id: 1
      }, {
        name: 'food2.jpeg',
        url: 'http://222.143.25.138/zcyz/upload/user/1/2018/6/1529832693835.jpg',
        id: 2
      }],
      form: {
        _token: this.$userInfo.token,
        ccmu17: this.$userInfo.ccmu17,
        userId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        caoa03: ''
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
      currentPic: {}
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file)
      setTimeout(() => {
        console.log(this.fileList)
      }, 20)
    },
    handlePreview(file) {
      this.currentPic = file
      this.form.caoa03 = file.name
      this.dialogVisible = true
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    onSubmit() {}
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
