<template>
  <div class="personal">
    <div class="title">个人报名</div>
    <transition name="el-fade-in" mode="out-in">
      <div class="form-con" key="form" v-if="showForm">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="cardno">
            <el-input v-model="form.cardno" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nation">
            <el-select v-model="form.nation" placeholder="请选择民族" filterable>
              <el-option v-for="item in dictionaries.TAB_NATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="form.political" placeholder="请选择政治面貌" filterable>
              <el-option v-for="item in dictionaries.TAB_AFFIL" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称" prop="position">
            <xf-cascader :fulltext.sync="form.positionName" :options="titles" filterable v-model="form.position" placeholder="请选择职称"></xf-cascader>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="form.education" placeholder="请选择学历" filterable>
              <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拟参加活动" prop="activity" ref="activity">
            <el-select v-model="multis" placeholder="请选择拟参加活动" filterable multiple collapse-tags ref="select">
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区" prop="area">
            <xf-cascader :fulltext.sync="form.areaName" :options="dictionaries.TAB_CITY" filterable v-model="form.area" placeholder="请选择所在地区"></xf-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="submit" :loading="loading">我要报名</el-button>
          </el-form-item>
        </el-form>
      </div>
      <sign-success key="success" v-if="!showForm"></sign-success>
    </transition>
  </div>
</template>
<script>
import {echo, handleCity, reg} from '../../../../common/js/utils'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'
import SignSuccess from '../success/success.vue'

export default {
  components: {
    SignSuccess,
    XfCascader},
  data() {
    return {
      multis: [],
      showForm: true,
      form: {
        name: '', // 姓名
        cardno: '', // 身份证号
        tel: '', // 电话
        nation: '', // 民族
        political: '', // 政治面貌
        position: '', // 职称
        positionName: '',
        education: '', // 学历
        activity: '', // 活动
        area: '', // 地区
        areaName: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'change'
        }],
        cardno: [{
          required: true,
          message: '请输入身份证号',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (reg.idCard(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的身份证号'))
            }
          },
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          message: '请输入手机号',
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
        nation: [{
          required: true,
          message: '请选择民族',
          trigger: 'change'
        }],
        political: [{
          required: true,
          message: '请选择政治面貌',
          trigger: 'change'
        }],
        position: [{
          required: false,
          message: '请选择职称',
          trigger: 'blur'
        }],
        education: [{
          required: true,
          message: '请选择学历',
          trigger: 'change'
        }],
        activity: [{
          required: true,
          message: '请选择拟参加活动',
          trigger: 'blur'
        }],
        area: [{
          required: true,
          message: '请选择所在地区',
          trigger: 'blur'
        }]
      },
      dictionaries: {
        TAB_NATION: [], // 民族
        TAB_EDUCATION: [], // 学历
        TAB_CITY: [],
        TAB_TITLE: [], // 职称
        TAB_AFFIL: [] // 政治面貌
      },
      activities: [],
      loading: false,
      titles: []
    }
  },
  methods: {
    async getInfo() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 1) return
      const res = await this.$post('/service/business/registration/registration/getById', {
        id: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        flag: this.$userInfo.ccmu17 === 1 ? 0 : 1
      })
      echo(this.form, res.result)
    },
    async getDictionaries() {
      const res = await this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_NATION,TAB_EDUCATION,TAB_CITY,TAB_TITLE,TAB_AFFIL'
      })
      this.dictionaries = {
        TAB_NATION: res.result.TAB_NATION, // 民族
        TAB_EDUCATION: res.result.TAB_EDUCATION, // 学历
        TAB_CITY: handleCity(res.result.TAB_CITY.children),
        TAB_TITLE: res.result.TAB_TITLE,
        TAB_AFFIL: res.result.TAB_AFFIL
      }
      this.getInfo()
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    async getTitle() { // 职称
      const res = await this.$post('/service/sys/config/config/getTitleList', {})
      this.titles = res.result.map(item => {
        return {
          id: item.id + '',
          text: item.name,
          parentId: item.pid + '',
          children: item.list && item.list.length ? item.list.map(item => {
            return {
              id: item.id + '',
              text: item.name,
              parentId: item.pid + '',
              children: item.list && item.list.length ? item.list.map(item => {
                return {
                  id: item.id + '',
                  text: item.name,
                  parentId: item.pid + ''
                }
              }) : null
            }
          }) : null
        }
      })
    },
    async geyActiveties() {
      const res = await this.$post('/service/business/sms/sms/getAcitvityList', {})
      this.activities = res.result
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({
            flag: 0
          }, this.form)
          this.loading = true
          this.$post('/service/business/registration/registration/save', form, false).then(res => {
            this.loading = false
            if (res.error) {
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
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  },
  created() {
    this.getDictionaries()
    this.geyActiveties()
    this.getTitle()
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
    this.$watch('form.position', newVal => {
      setTimeout(() => {
        this.$refs.form.validateField('position')
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .personal{
    background: url("../corp/bg.jpg") no-repeat center 100%;
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
    width: 400px;
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
