<template>
  <div class="authen">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form" v-if="authenInfo.authenState === 0 || formShow">
      <el-form-item label="证件类型">
        <span>统一社会信用代码(组织机构代码)</span>
      </el-form-item>
      <el-form-item label="证件号码" prop="aab007">
        <el-input v-model="form.aab007" placeholder="请输入统一社会信用代码(组织机构代码)"></el-input>
      </el-form-item>
      <el-form-item label="证件开始日期" prop="aab010">
        <el-date-picker
          v-model="form.aab010"
          value-format="yyyy-MM-dd"
          type="date"
          :editable="false"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="证件附件" prop="file">
        <el-upload
          class="upload-demo"
          :data="uploadForm"
          accept="image/jpg,image/jpeg,image/png"
          :action="baseUrl + '/service/business/fm/pic/picInfo/uploadPicInfo'"
          :on-remove="handleRemove"
          :on-success="onSuccess"
          :on-error="handleError"
          :file-list="fileList"
          :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-tooltip placement="left">
          <div slot="content">提交到后台，由网站后台工作人员进行人工认证，<br>大概2-3个工作日认证完成</div>
          <el-button type="warning" @click="onSubmit(0)" :loading="loading1" :disabled="loading2">人工认证</el-button>
        </el-tooltip>
        <el-tooltip placement="right">
          <div slot="content">单位不用提交到后台，实时认证是否通过，<br>在实时认证不通过的情况下，<br>需要网站后台工作人员进行人工认证，<br>大概2-3个工作日</div>
          <el-button type="warning" @click="onSubmit(1)" v-if="authenInfo.authenIsOpen === 1" :loading="loading2" :disabled="loading1">自主认证</el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <div class="top-box" v-if="authenInfo.authenState !== 0 && !formShow">
      <div class="text-center" v-if="authenInfo.authenState === 1"><img src="./1.jpg"></div>
      <div class="text-center" v-if="authenInfo.authenState === 2"><img src="./2.jpg"></div>
      <div class="text-center" v-if="authenInfo.authenState === 3">
        <img src="./3.jpg">
      </div>
      <div class="tip" v-if="authenInfo.authenState === 3">
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label-width="50px">
            <span>抱歉，您的认证未能通过！</span>
          </el-form-item>
          <el-form-item label="原因">
            <span class="fix-width">{{authenInfo.backname || '--'}}</span>
          </el-form-item>
          <!--<el-form-item label="备注">
            <span class="fix-width">{{authenInfo.caoa08 || '&#45;&#45;'}}</span>
          </el-form-item>-->
        </el-form>
      </div>
      <div class="text-center" v-if="authenInfo.authenState === 3">
        <el-button type="primary" plain @click="formShow = true">重新认证</el-button>
      </div>
    </div>
    <el-dialog
      title="单位自主认证信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="700px">
      <el-form label-position="left" class="demo-table-expand" label-width="110px" v-loading="dialogLoading">
        <el-form-item label="认证单位">
          <span class="corp-width">{{info.aab004 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位法人">
          <span class="corp-width">{{info.aab013 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位类型">
          <span class="corp-width">{{info.aab019Name || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位证件类型">
          <span class="corp-width">{{info.caoa04Name || '--'}}</span>
        </el-form-item>
        <el-form-item label="证件号码">
          <span class="corp-width">{{info.aab007 || '--'}}</span>
        </el-form-item>
        <el-form-item label="证件开始日期">
          <span class="corp-width">{{info.aab010 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <span class="corp-width">{{info.aae005 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系地址">
          <span class="corp-width">{{info.aae006 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位简介">
          <span class="corp-width no-wrap">{{info.acb206 || '--'}}</span>
        </el-form-item>
        <el-form-item label="证件附件">
          <div class="img">
            <img :src="info.caoa02" v-img="info.caoa02">
          </div>
        </el-form-item>
        <el-form-item >
          <el-tooltip placement="left">
            <div slot="content">确保单位认证信息正确无误，点击认证提交</div>
            <el-button type="primary" @click="autoAuthen" :loading="loading3">认证</el-button>
          </el-tooltip>
          <el-tooltip placement="right">
            <div slot="content">单位认证信息如需修改，点击返回修改</div>
            <el-button :disabled="loading3" @click="dialogVisible = false">返回修改</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {FILE_URL, AUTHEN_URL} from '../../../../../common/js/config'
import event from '../../../../../common/js/event'

export default{
  computed: {
    ...mapGetters([
      'authenInfo'
    ])
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      baseUrl: FILE_URL,
      formShow: false,
      form: {
        aab001: this.$userInfo.aab001,
        remark: 180,
        ccmu17: this.$userInfo.ccmu17,
        ccmu01: this.$userInfo.ccmu01,
        aab007: '', // 证件号码
        aab010: '', // 日期
        file: '',
        flag: 0 // 0人工认证，1自主认证
      },
      rules: {
        aab007: [{
          required: true,
          message: '请填写证件号码',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z\d]{0,18}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请填写正确的证件号码'))
            }
          }
        }],
        aab010: [{
          required: true,
          message: '请选择证件开始日期',
          trigger: 'change'
        }],
        file: [{
          required: true,
          message: '请选择证件附件',
          trigger: 'change'
        }]
      },
      fileList: [],
      uploadForm: {
        picSize: 5120,
        remark: 4,
        _token: this.$userInfo.token,
        ccmu17: this.$userInfo.ccmu17,
        userId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmu01: this.$userInfo.ccmu01,
        plateform: 1
      },
      dialogVisible: false,
      info: {},
      dialogLoading: false,
      loading3: false
    }
  },
  methods: {
    onSubmit(flag) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.flag = flag
          if (flag === 0) {
            this.loading1 = true
          } else {
            this.loading2 = true
          }
          this.$post('/service/business/fm/pic/picInfo/savePicInfo', this.form).then(res => {
            this.loading1 = false
            this.loading2 = false
            if (res.error && res.error.result === 1) {
              if (flag === 0) {
                event.$emit('authen')
                this.$message({
                  message: res.error.message,
                  type: 'success'
                })
                this.formShow = false
              } else {
                this.autoAuthenDialog()
              }
            }
          }).catch(() => {
            this.loading1 = false
            this.loading2 = false
          })
        }
      })
    },
    handleRemove() {
      this.fileList = []
      this.form.file = ''
    },
    onSuccess(res) {
      if (res.error && res.error.result === 1) {
        this.form.file = res.result[0]
      } else {
        this.fileList = []
      }
    },
    autoAuthenDialog() { // 自主认证弹出框
      this.dialogVisible = true
      this.dialogLoading = true
      this.$post('/service/business/authen/authen/authenMsg', {
        ccmu01: this.$userInfo.ccmu01
      }).then(res => {
        this.dialogLoading = false
        this.info = res.result
      }).catch(() => {
        this.dialogLoading = false
      })
    },
    autoAuthen() {
      this.info.iccToken = this.info.token
      this.info.corpCount = this.info.count
      this.loading3 = true
      this.$post(AUTHEN_URL + '/service/business/college/corp/iccCompany/autoAuthen.xf', this.info).then(res => {
        return this.$post('/service/business/authen/authen/updateStatus', {
          status: res.result,
          ccmu01: this.$userInfo.ccmu01
        })
      }).then(res => {
        this.loading3 = false
        this.$alert(res.error.message, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.dialogVisible = false
            event.$emit('authen')
          }
        })
      }).catch(() => {
        this.loading3 = false
      })
    },
    handleAuthenInfo() {
      this.form.aab007 = this.authenInfo.aab007 || ''
      this.form.aab010 = this.authenInfo.aab010 || ''
    },
    handleError(e) {
      /*
      this.$message({
        message: e.message,
        type: 'warning'
      })
      this.fileList = []
      */
    }
  },
  created() {
    this.handleAuthenInfo()
    this.$watch('authenInfo', () => {
      setTimeout(() => {
        this.handleAuthenInfo()
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .text-center{
    text-align: center;
  }
  .tip{
    padding: 0 20px 0 345px;
  }
  .fix-width{
    display: inline-block;
    max-width: 300px;
    word-break: break-all;
  }
  .form{
    width: 400px;
    padding: 20px 0 0 0;
    .el-input{
      width: 100%;
    }
  }
  .img{
    width: 100px;
    img{
      width: 100%;
    }
  }
</style>
