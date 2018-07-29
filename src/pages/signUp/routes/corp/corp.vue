<template>
  <div class="personal">
    <div class="title">用人单位报名</div>
    <transition name="el-fade-in" mode="out-in">
      <div class="form-con" key="form" v-if="showForm">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
          <el-form-item label="用人单位全称" prop="name">
            <el-input v-model="form.name" placeholder="请输入用人单位全称"></el-input>
          </el-form-item>
          <el-form-item label="拟参加活动" prop="activity">
            <el-select v-model="multis" placeholder="请选择拟参加活动" filterable multiple collapse-tags>
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位性质" prop="nature">
            <el-select v-model="form.nature" placeholder="请选择单位性质">
              <el-option v-for="item in dictionaries.TAB_UNITNATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行业类型" prop="industry">
            <el-select v-model="form.industry" placeholder="请选择行业类型">
              <el-option v-for="item in dictionaries.INDUSTRY_AS" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员规模" prop="scale">
            <el-select v-model="form.scale" placeholder="请选择人员规模">
              <el-option v-for="item in dictionaries.TAB_PSCALE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区域" prop="area">
            <xf-cascader :fulltext.sync="form.areaName" filterable :options="dictionaries.TAB_CITY" v-model="form.area" placeholder="请选择所在区域"></xf-cascader>
          </el-form-item>
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入联系地址" type="textarea" :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalperson">
            <el-input v-model="form.legalperson" placeholder="请输入法定代表人"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入联系人手机号"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop="caac">
            <el-input v-model="form.caac" placeholder="请输入请输入统一社会信用代码(组织机构代码)"></el-input>
          </el-form-item>
          <el-form-item label="证件照片" prop="picture" ref="picture">
            <el-upload
              class="upload-demo"
              :data="uploadForm"
              accept="image/jpg,image/jpeg,image/png"
              ref="upload"
              :action="baseUrl + '/service/business/fm/pic/picInfo/uploadPicInfo'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
              :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="submit" v-loading="loading">我要报名</el-button>
          </el-form-item>
        </el-form>
      </div>
      <sign-success v-if="!showForm"></sign-success>
    </transition>
    <img :src="form.picture" v-img="form.picture" style="display: none;" ref="img">
  </div>
</template>
<script>
import {echo, handleCity, reg} from '../../../../common/js/utils'
import {FILE_URL} from '../../../../common/js/config'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'
import SignSuccess from '../success/success.vue'

export default {
  components: {
    SignSuccess,
    XfCascader},
  data() {
    return {
      showForm: true,
      baseUrl: FILE_URL,
      fileList: [],
      uploadForm: {
        picSize: 5120,
        remark: 160,
        _token: this.$userInfo.token,
        ccmu17: this.$userInfo.ccmu17,
        userId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmu01: this.$userInfo.ccmu01
      },
      form: {
        name: '', // 单位名称
        tel: '', // 电话
        nature: '', // 单位性质
        industry: '', // 行业类型
        scale: '', // 人员规模
        activity: '', // 活动
        address: '', // 联系地址
        legalperson: '', // 法人
        contact: '', // 联系人
        caac: '', // 证件号
        picture: '', // 证件图片
        area: '', // 地区
        areaName: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入用人单位全称',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        activity: [{
          required: true,
          message: '请选择拟参加活动',
          trigger: 'change'
        }],
        caac: [{
          required: true,
          message: '请输入三证合一证件号',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (/^[a-zA-Z\d]{18}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请填写18位证件号码'))
            }
          },
          trigger: 'blur'
        }],
        contact: [{
          required: true,
          message: '请输入联系人姓名',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'change'
        }],
        tel: [{
          required: true,
          message: '请输入联系人手机号',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (reg.phone(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          },
          trigger: 'blur'
        }],
        nature: [{
          required: true,
          message: '请选择单位性质',
          trigger: 'change'
        }],
        industry: [{
          required: true,
          message: '请选择行业类型',
          trigger: 'change'
        }],
        scale: [{
          required: true,
          message: '请选择人员规模',
          trigger: 'change'
        }],
        address: [{
          required: true,
          message: '请输入联系地址',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        legalperson: [{
          required: true,
          message: '请请输入单位法人',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'change'
        }],
        area: [{
          required: true,
          message: '请选择所在地区',
          trigger: 'blur'
        }],
        picture: [{
          required: true,
          message: '请上传证件照片',
          trigger: 'change'
        }]
      },
      dictionaries: {
        TAB_UNITNATURE: [], // 单位性质
        INDUSTRY_AS: [], // 行业类型
        TAB_CITY: [],
        TAB_PSCALE: [] // 人员规模
      },
      loading: false,
      activities: [],
      multis: []
    }
  },
  methods: {
    async getInfo() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 2) return
      const res = await this.$post('/service/business/registration/registration/getById', {
        id: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        flag: this.$userInfo.ccmu17 === 1 ? 0 : 1
      })
      echo(this.form, res.result)
      if (res.result.picture) {
        this.fileList = [{
          name: '证件照片',
          url: res.result.picture
        }]
      }
    },
    async getDictionaries() {
      const res = await this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_UNITNATURE,INDUSTRY_AS,TAB_CITY,TAB_PSCALE'
      })
      this.dictionaries = {
        TAB_UNITNATURE: res.result.TAB_UNITNATURE,
        INDUSTRY_AS: res.result.INDUSTRY_AS,
        TAB_CITY: handleCity(res.result.TAB_CITY.children),
        TAB_PSCALE: res.result.TAB_PSCALE
      }
      this.getInfo()
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    async geyActiveties() {
      const res = await this.$post('/service/business/sms/sms/getAcitvityList', {})
      this.activities = res.result
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({
            flag: 1
          }, this.form)
          this.$post('/service/business/registration/registration/save', form, false).then(res => {
            if (res.error && res.error.result === 1) {
              this.$alert(res.error.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  if (res.error.result === 1) {
                    this.$refs.form.resetFields()
                    this.showForm = false
                  }
                }
              })
            }
          })
        }
      })
    },
    handleRemove() {
      this.form.picture = ''
      this.fileList = []
    },
    handlePreview(file) {
      this.$refs.img.click()
    },
    onSuccess(res) {
      if (res.error && res.error.result === 1) {
        // success
        this.form.picture = res.result[0]
        this.$refs.picture.clearValidate()
      } else {
        this.$message({
          message: res.error.message,
          type: 'error'
        })
        this.fileList = []
      }
    }
  },
  created() {
    this.getDictionaries()
    this.geyActiveties()
    this.$watch('multis', newVal => {
      this.form.activity = newVal.join(',')
      setTimeout(() => {
        this.$refs.form.validateField('activity')
      }, 20)
    })
    this.$watch('form.area', newVal => {
      setTimeout(() => {
        this.$refs.form.validateField('area')
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .personal{
    background: url("./bg.jpg") no-repeat center 100%;
    background-size: 100%;
    .title{
      font-size: 26px;
      color: $--color-primary;
      font-weight: bold;
      padding: 20px 20px;
      border-bottom: 1px solid #d9d9d9;
      text-align: center;
    }
  }
  .form-con{
    width: 450px;
    margin: 0 auto;
    padding: 20px 0;
    .el-select,.el-cascader{
      width: 100%;
    }
    .submit{
      width: 100%;
    }
  }
</style>
