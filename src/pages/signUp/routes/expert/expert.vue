<template>
  <div class="expert">
    <div class="title">特邀专家报名</div>
    <transition name="el-fade-in" mode="out-in">
      <div class="form-con" key="form" v-if="showForm">
        <el-form ref="form" :rules="rules" :model="form" label-width="180px" class="form">
          <el-form-item label="姓名" prop="guestName">
            <el-input v-model="form.guestName" placeholder="请输入姓名" disabled></el-input>
          </el-form-item>
          <el-form-item label="邀请码" prop="invitationNo">
            <el-input v-model="form.invitationNo" placeholder="请输入邀请码" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="guestSex">
            <el-select v-model="form.guestSex" placeholder="请选择性别" filterable clearable>
              <el-option v-for="item in dictionaries.TAB_SEX" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族" prop="guestNation">
            <el-select v-model="form.guestNation" placeholder="请选择民族" filterable clearable>
              <el-option v-for="item in dictionaries.TAB_NATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位" prop="guestCom">
            <el-input v-model="form.guestCom" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="职务/级别/专家称号" prop="guestPost">
            <el-input v-model="form.guestPost" placeholder="请输入职务/级别/专家称号"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="guestTel">
            <el-input v-model="form.guestTel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号/护照/通行证号" prop="guestCardno">
            <el-input v-model="form.guestCardno" placeholder="请输入身份证号/护照/通行证号"></el-input>
          </el-form-item>
          <el-form-item label="抵达时间" prop="arriveTime">
            <el-date-picker
              class="datetime"
              v-model="form.arriveTime"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
              placeholder="请选择抵达时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="抵达站点" prop="arriveEnd">
            <el-select v-model="form.arriveEnd" placeholder="请选择抵达站点" filterable clearable>
              <el-option v-for="item in dictionaries.TAB_END" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抵郑车次" prop="arriveTrips">
            <el-input v-model="form.arriveTrips" placeholder="请输入抵郑车次"></el-input>
          </el-form-item>
          <el-form-item label="活动一" prop="cand01Str">
            <el-select v-model="activity1.name" placeholder="请选择参加的活动" filterable clearable>
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动一时间" prop="act" v-if="activity1.name">
            <el-date-picker
              class="datetime"
              v-model="activity1.time"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              disabled
              placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动一地点" prop="act" v-if="activity1.name">
            <el-input v-model="activity1.address" placeholder="请输入活动地点" disabled></el-input>
          </el-form-item>
          <el-form-item label="活动二" prop="act" v-if="selections[0]">
            <el-select v-model="activity2.name" placeholder="请选择参加的活动" filterable clearable>
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动二时间" prop="act" v-if="activity2.name">
            <el-date-picker
              class="datetime"
              v-model="activity2.time"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              disabled
              placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动二地点" prop="act" v-if="activity2.name">
            <el-input v-model="activity2.address" placeholder="请输入活动地点" disabled></el-input>
          </el-form-item>
          <el-form-item label="活动三" prop="act" v-if="selections[1]">
            <el-select v-model="activity3.name" placeholder="请选择参加的活动" filterable clearable>
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动三时间" prop="act" v-if="activity3.name">
            <el-date-picker
              class="datetime"
              v-model="activity3.time"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              disabled
              placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动三地点" prop="act" v-if="activity3.name">
            <el-input v-model="activity3.address" placeholder="请输入活动地点" disabled></el-input>
          </el-form-item>
          <el-form-item label="活动四" prop="act" v-if="selections[2]">
            <el-select v-model="activity4.name" placeholder="请选择参加的活动" filterable clearable>
              <el-option v-for="item in activities" :key="item.cand01" :label="item.cand03" :value="item.cand01" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动四时间" prop="act" v-if="activity4.name">
            <el-date-picker
              class="datetime"
              v-model="activity4.time"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              disabled
              placeholder="请选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动四地点" prop="act" v-if="activity4.name">
            <el-input v-model="activity4.address" placeholder="请输入活动地点" disabled></el-input>
          </el-form-item>
          <el-form-item label="离郑时间" prop="leaveTime">
            <el-date-picker
              class="datetime"
              v-model="form.leaveTime"
              :editable="false"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              clearable
              placeholder="请选择离郑时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="离郑车次" prop="leaveTrips">
            <el-input v-model="form.leaveTrips" placeholder="请输入离郑车次"></el-input>
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
import SignSuccess from '../success/success.vue'
import {echo, reg} from '../../../../common/js/utils'

export default {
  components: {SignSuccess},
  data() {
    let _this = this
    return {
      showForm: true,
      loading: false,
      rules: {
        guestSex: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        guestNation: [{
          required: true,
          message: '请选择民族',
          trigger: 'change'
        }],
        guestCom: [{
          required: true,
          message: '请输入单位',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        guestPost: [{
          required: true,
          message: '请输入职务/级别/专家称号',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        guestTel: [{
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
          trigger: 'change'
        }],
        guestCardno: [{
          required: true,
          message: '请输入证件号',
          trigger: 'change'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'change'
        }],
        arriveTime: [{
          required: true,
          message: '请选择到达时间',
          trigger: 'change'
        }],
        arriveEnd: [{
          required: true,
          message: '请选择抵郑站点',
          trigger: 'change'
        }],
        arriveTrips: [{
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        leaveTime: [{
          required: true,
          message: '请选择离郑时间',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (!value || !_this.form.arriveTime) {
              callback()
              return
            }
            let arrive = new Date(_this.form.arriveTime.replace(/-/g, '/')).getTime()
            let leave = new Date(value.replace(/-/g, '/')).getTime()
            if (leave > arrive) {
              callback()
            } else {
              callback(new Error('离郑时间不能早于抵达时间'))
            }
          },
          trigger: 'change'
        }],
        leaveTrips: [{
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        cand01Str: [{
          required: true,
          message: '请至少选择一个活动',
          trigger: 'change'
        }]
      },
      form: {
        id: '',
        guestName: '', // 姓名
        invitationNo: '', // 邀请码
        guestSex: '', // 性别
        guestNation: '', // 民族
        guestCom: '', // 单位
        guestPost: '', // 职务
        guestTel: '', // 手机号
        guestCardno: '', // 身份证号
        arriveTime: '', // 抵达时间
        arriveEnd: '', // 抵达站点
        arriveTrips: '', // 抵达车次
        leaveTime: '', // 离郑时间
        leaveTrips: '', // 离郑车次
        cand01Str: ''
      },
      dictionaries: {
        TAB_NATION: [],
        TAB_SEX: [],
        TAB_END: []
      },
      selections: [],
      activity1: {
        name: '',
        time: '',
        address: ''
      },
      activity2: {
        name: '',
        time: '',
        address: ''
      },
      activity3: {
        name: '',
        time: '',
        address: ''
      },
      activity4: {
        name: '',
        time: '',
        address: ''
      },
      activities: []
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({}, this.form)
          form.cand01Str = this.selections.map(item => item.code).join(',')
          this.loading = true
          this.$post('/service/business/college/registration/guestRegist/guestSignUp.xf', form).then(res => {
            this.loading = false
            if (res.error && res.error.result === 1) {
              this.$alert(res.error.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.showForm = false
                }
              })
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    async getDictionaries() {
      const res = await this.$post('/service/sys/config/config/getConditionList', {
        tabStr: 'TAB_NATION,TAB_SEX,TAB_END'
      })
      this.dictionaries = {
        TAB_NATION: res.result.TAB_NATION, // 民族
        TAB_SEX: res.result.TAB_SEX, // 性别
        TAB_END: res.result.TAB_END // 抵达站点
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    async getActivities() {
      const res = await this.$post('/service/business/sms/sms/getGuestAcitvityList.xf', {})
      res.result.forEach(item => {
        item.disabled = false
      })
      this.activities = res.result
      setTimeout(() => {
        this.echoCand01Str(this.cand01Str)
      }, 20)
    },
    handleActivities(name, n, o) {
      if (!n) {
        this[name].time = ''
        this[name].address = ''
      } else {
        let index = this.activities.findIndex(item => item.cand01 === n)
        if (index !== -1) {
          this[name].time = this.activities[index].cand23 || ''
          this[name].address = this.activities[index].cand22 || ''
        }
      }
      setTimeout(() => {
        this.selections = []
        this.addSelection('activity1')
        this.addSelection('activity2')
        this.addSelection('activity3')
        this.addSelection('activity4')
        let copy = this.activities.slice(0)
        copy.forEach(item => {
          item.disabled = false
        })
        this.selections.forEach(item => {
          let index = copy.findIndex(val => val.cand01 === item.code)
          if (index !== -1) {
            copy[index].disabled = true
          }
        })
        this.activities = copy
      }, 20)
    },
    addSelection(name) {
      if (this[name].name) {
        this.selections.push({
          code: this[name].name,
          time: this[name].time,
          address: this[name].address
        })
      }
    },
    echoCand01Str(str) {
      if (str && str.length) {
        let arr = str.map(item => item.cand01)
        if (arr[0]) this.activity1.name = arr[0]
        if (arr[1]) this.activity2.name = arr[1]
        if (arr[2]) this.activity3.name = arr[2]
        if (arr[3]) this.activity4.name = arr[3]
      }
    }
  },
  created() {
    if (!window.expertTemp) {
      this.$router.replace({name: 'expertCheck'})
      return
    } else {
      window.expertTemp.guestSex && (window.expertTemp.guestSex += '')
      window.expertTemp.guestNation && (window.expertTemp.guestNation += '')
      window.expertTemp.arriveEnd && (window.expertTemp.arriveEnd += '')
      this.cand01Str = window.expertTemp.contentList // array
      if (window.expertTemp.arriveTime) {
        window.expertTemp.arriveTime = this.$dateFormat(window.expertTemp.arriveTime, 'yyyy-MM-dd hh:mm')
      }
      if (window.expertTemp.leaveTime) {
        window.expertTemp.leaveTime = this.$dateFormat(window.expertTemp.leaveTime, 'yyyy-MM-dd hh:mm')
      }
      echo(this.form, window.expertTemp)
    }
    this.getDictionaries()
    this.getActivities()
    this.$watch('activity1.name', (newVal, oldVal) => {
      this.form.cand01Str = newVal
      setTimeout(() => {
        this.$refs.form.validateField('cand01Str')
      }, 20)
      this.handleActivities('activity1', newVal, oldVal)
    })
    this.$watch('activity2.name', (newVal, oldVal) => {
      this.handleActivities('activity2', newVal, oldVal)
    })
    this.$watch('activity3.name', (newVal, oldVal) => {
      this.handleActivities('activity3', newVal, oldVal)
    })
    this.$watch('activity4.name', (newVal, oldVal) => {
      this.handleActivities('activity4', newVal, oldVal)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .expert{
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
    width: 570px;
    padding: 20px 0 20px 90px;
    .el-select,.el-cascader{
      width: 100%;
    }
    .submit{
      width: 100%;
    }
  }
  .datetime{
    width: 100%;
  }
</style>
