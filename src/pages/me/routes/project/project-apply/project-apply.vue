<template>
  <div class="project-apply">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="form">
      <el-form-item label="立项单位">
        <span>{{form.aab004}}</span>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目类别" prop="projectCategory">
        <el-select v-model="form.projectCategory" placeholder="请选择项目类别" clearable>
          <el-option :label="val.name" :value="val.code" :key="val.code" v-for="val in dictionaries.TAB_PROJECT_TYPE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目介绍" prop="projectIntroduction">
        <el-input type="textarea" :rows="5" v-model="form.projectIntroduction" placeholder="请输入项目介绍"></el-input>
      </el-form-item>
      <el-form-item label="项目需研究或解决的问题" prop="projectProblem">
        <el-input type="textarea" :rows="5" v-model="form.projectProblem" placeholder="请输入项目需研究或解决的问题"></el-input>
      </el-form-item>
      <el-form-item label="经费来源" prop="projectFundresourse">
        <el-select v-model="form.projectFundresourse" placeholder="请选择经费来源" clearable>
          <el-option :label="val.name" :value="val.code" :key="val.code" v-for="val in dictionaries.TAB_FUND_SOURCE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作方式" prop="projectWorktype">
        <el-select v-model="form.projectWorktype" placeholder="请选择合作方式" clearable>
          <el-option :label="val.name" :value="val.code" :key="val.code" v-for="val in dictionaries.TAB_COOPERATION_TYPE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="待遇" prop="projectTreatment">
        <el-select v-model="form.projectTreatment" placeholder="请选择待遇" clearable>
          <el-option :label="val.name" :value="val.code" :key="val.code" v-for="val in dictionaries.TAB_SALARY"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与单位" prop="projectJoinUnit">
        <el-input type="textarea" :rows="5" v-model="form.projectJoinUnit" placeholder="请输入参与单位"></el-input>
      </el-form-item>
      <el-form-item label="工作地点" prop="projectWorkCode">
        <xf-cascader
          :options="dictionaries.TAB_CITY3"
          clearable
          v-model="form.projectWorkCode"
          placeholder="请选择工作地点"
          :fulltext.sync="form.projectWorkaddress"></xf-cascader>
      </el-form-item>
      <el-form-item label="联系人" prop="projectContacts">
        <el-input v-model="form.projectContacts" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="projectPhone">
        <el-input v-model="form.projectPhone" placeholder="请输入联系人手机号"></el-input>
      </el-form-item>
      <el-form-item label="固定电话" prop="projectTel">
        <el-input v-model="form.projectTel" placeholder="请输入固定电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="projectEmail">
        <el-input v-model="form.projectEmail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input :rows="5" v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import XfCascader from '../../../../../components/xf-cascader/xf-cascader.vue'
import {mapGetters} from 'vuex'
import {reg, echo} from '../../../../../common/js/utils'

export default {
  components: {XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries',
      'corpInfo'
    ])
  },
  data() {
    return {
      loading: false,
      form: {
        projectName: '', // 项目名称
        projectCategory: '', // 项目类别
        projectIntroduction: '', // 项目介绍
        projectProblem: '', // 项目需研究或解决的问题
        projectFundresourse: '', // 经费来源code
        fundSourceName: '', // 经费来源
        projectWorktype: '', // 合作方式
        projectTreatment: '', // 待遇
        aab004: '', // 立项单位
        projectJoinUnit: '', // 参与单位
        projectWorkCode: '', // 工作地点code
        projectWorkaddress: '', // 工作地点
        projectContacts: '', // 联系人
        projectPhone: '', // 手机
        projectTel: '', // 固定电话
        projectEmail: '', // 邮箱
        remark: '' // 备注信息
      },
      rules: {
        projectName: [{
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        projectCategory: [{
          required: true,
          message: '请输入项目类别',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        projectIntroduction: [{
          required: true,
          message: '请输入项目介绍',
          trigger: 'blur'
        }, {
          max: 500,
          message: '最多500个字符',
          trigger: 'blur'
        }],
        projectProblem: [{
          required: true,
          message: '请输入项目需研究或解决的问题',
          trigger: 'blur'
        }, {
          max: 500,
          message: '最多500个字符',
          trigger: 'blur'
        }],
        projectFundresourse: [{
          required: true,
          message: '请选择项目经费来源',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        projectWorktype: [{
          required: true,
          message: '请选择合作方式',
          trigger: 'blur'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'blur'
        }],
        projectTreatment: [{
          required: true,
          message: '请选择待遇情况',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        /*
        aab004: [{
          required: true,
          message: '请输入立项单位',
          trigger: 'blur'
        }, {
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        */
        projectJoinUnit: [{
          max: 100,
          message: '最多100个字符',
          trigger: 'blur'
        }],
        projectWorkCode: [{
          required: true,
          message: '请选择工作地点',
          trigger: 'blur'
        }],
        projectContacts: [{
          required: true,
          message: '请输入联系人姓名',
          trigger: 'blur'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'blur'
        }],
        projectPhone: [{
          required: true,
          message: '请输入联系人手机号',
          trigger: 'blur'
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
        projectTel: [{
          required: false,
          message: '请输入固定电话',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (reg.tel(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的电话号码'))
            }
          },
          trigger: 'blur'
        }],
        projectEmail: [{
          required: false,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (reg.email(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱'))
            }
          },
          trigger: 'blur'
        }],
        remark: [{
          max: 500,
          message: '最多500个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aab001: this.$userInfo.aab001
          }, this.form)
          if (this.$route.query.projectid) form.projectid = this.$route.query.projectid
          this.loading = true
          this.$post('/service/business/project/enterpriseProject/saveEnterPriseProject', form).then(res => {
            this.loading = false
            if (res.error && res.error.result === 1) {
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.$router.go(-1)
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    handleRouter(route) {
      if (route.query.projectid) {
        this.getDetail(route.query.projectid)
      } else {
        echo(this.form)
        this.form.aab004 = this.corpInfo.aab004
      }
    },
    getDetail(projectid) {
      this.$post('/service/business/project/enterpriseProject/getProjectDetails', {projectid}).then(res => {
        echo(this.form, res.result)
      })
    }
  },
  created() {
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .form{
    padding: 20px 0;
    .el-input,.el-select,.el-cascader,.el-textarea{
      width: 300px;
    }
  }
</style>
