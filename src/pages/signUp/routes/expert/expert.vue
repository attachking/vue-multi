<template>
  <div class="expert">
    <div class="title">特邀嘉宾报名</div>
    <transition name="el-fade-in" mode="out-in">
      <div class="form-con" key="form" v-if="showForm">
        <el-form ref="form" :rules="rules" :model="form" label-width="180px" class="form">
          <el-form-item label="姓名" prop="guestName">
            <el-input v-model="form.guestName" placeholder="请输入姓名" disabled></el-input>
          </el-form-item>
          <!--<el-form-item label="邀请函编号" prop="invitationNo">
            <el-input v-model="form.invitationNo" placeholder="请输入邀请函编号" disabled></el-input>
          </el-form-item>-->
          <el-form-item label="性别" prop="guestSex">
            <el-select v-model="form.guestSex" placeholder="请选择性别" filterable clearable>
              <el-option v-for="item in dictionaries.TAB_SEX" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国籍" prop="guestNationality">
            <el-input v-model="form.guestNationality" placeholder="请输入国籍"></el-input>
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
          <el-form-item label="证件类型" prop="guestCardno">
            <!--<el-input v-model="form.guestCardno" placeholder="请输入身份证号/护照/通行证号"></el-input>-->
            <el-input v-model="form.guestCardno" >
              <el-select v-model="form.guestType" slot="prepend" placeholder="请选择" class="select">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
                <el-option label="通行证" value="3"></el-option>
                <el-option label="其它" value="0"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="抵达时间" prop="arriveTime" class="flex-date">
            <el-date-picker
              style="width: 49%;"
              v-model="date1"
              :editable="false"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
              placeholder="选择日期"></el-date-picker>
            <el-time-picker
              style="width: 49%;"
              v-model="time1"
              :editable="false"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="选择时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="抵达站点" prop="arriveEnd">
            <xf-cascader :fulltext.sync="form.arriveEndVar" :options="dictionaries.TAB_END" filterable v-model="form.arriveEnd" placeholder="请选择抵达站点"></xf-cascader>
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
              placeholder="活动时间和地点待定，请联系管理员"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动一地点" prop="act" v-if="activity1.name">
            <el-input v-model="activity1.address" placeholder="活动时间和地点待定，请联系管理员" disabled></el-input>
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
              placeholder="活动时间和地点待定，请联系管理员"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动二地点" prop="act" v-if="activity2.name">
            <el-input v-model="activity2.address" placeholder="活动时间和地点待定，请联系管理员" disabled></el-input>
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
              placeholder="活动时间和地点待定，请联系管理员"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动三地点" prop="act" v-if="activity3.name">
            <el-input v-model="activity3.address" placeholder="活动时间和地点待定，请联系管理员" disabled></el-input>
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
              placeholder="活动时间和地点待定，请联系管理员"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动四地点" prop="act" v-if="activity4.name">
            <el-input v-model="activity4.address" placeholder="活动时间和地点待定，请联系管理员" disabled></el-input>
          </el-form-item>
          <el-form-item label="离郑时间" prop="leaveTime" class="flex-date">
            <el-date-picker
              style="width: 49%;"
              v-model="date2"
              :editable="false"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
              placeholder="选择日期"></el-date-picker>
            <el-time-picker
              style="width: 49%;"
              v-model="time2"
              :editable="false"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="选择时间">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="离郑站点" prop="leaveEnd">
            <xf-cascader :fulltext.sync="form.leaveEndVar" :options="dictionaries.TAB_END" filterable v-model="form.leaveEnd" placeholder="请选择离郑站点"></xf-cascader>
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
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'

export default {
  components: {
    XfCascader,
    SignSuccess},
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
        guestNationality: [{
          required: true,
          message: '请输入国籍',
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
          validator(rule, value, callback) {
            if (_this.form.guestType === '1') {
              if (reg.idCard(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的身份证号'))
              }
            }
            if (_this.form.guestType === '2') {
              if (reg.passPort(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的护照号'))
              }
            }
            if (_this.form.guestType === '3') {
              if (reg.permit(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的通行证号'))
              }
            }
            if (_this.form.guestType === '0') {
              if (/^[A-Za-z0-9]{1,20}$/.test(value)) {
                callback()
              } else {
                callback(new Error('请输入正确的证件号'))
              }
            }
          },
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
          trigger: 'blur'
        }],
        arriveTrips: [{
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        leaveTime: [{
          required: false,
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
        invitationNo: '', // 邀请函编号
        guestSex: '', // 性别
        guestNationality: '', // 国籍
        guestNation: '', // 民族
        guestCom: '', // 单位
        guestPost: '', // 职务
        guestTel: '', // 手机号
        guestType: '', // 证件类型
        guestCardno: '', // 证件号
        arriveTime: '', // 抵达时间
        arriveEnd: '', // 抵达站点
        arriveEndVar: '', // name
        arriveTrips: '', // 抵达车次
        leaveEnd: '', // 离郑站点
        leaveEndVar: '', // name
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
      activities: [],
      date1: '',
      time1: '',
      date2: '',
      time2: ''
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
        TAB_END: this.handleTabEnd(res.result.TAB_END) // 抵达站点
      }
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    },
    handleTabEnd(arr) { // 处理站点字典表
      arr.forEach(item => {
        item.id = item.code
        item.text = item.name
        item.parentId = item.pCode
      })
      let first = arrFilter(arr, '0')
      first.forEach(item => {
        let children = arrFilter(arr, item.id)
        item.children = children.length ? children : null
      })
      return first

      function arrFilter(arr, parentId) {
        let a = []
        arr.forEach(item => {
          if (item.parentId === parentId) {
            a.push(item)
          }
        })
        return a
      }
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
        this.date1 = this.$dateFormat(window.expertTemp.arriveTime, 'yyyy-MM-dd')
        this.time1 = this.$dateFormat(window.expertTemp.arriveTime, 'hh:mm')
      }
      if (window.expertTemp.leaveTime) {
        window.expertTemp.leaveTime = this.$dateFormat(window.expertTemp.leaveTime, 'yyyy-MM-dd hh:mm')
        this.date2 = this.$dateFormat(window.expertTemp.leaveTime, 'yyyy-MM-dd')
        this.time2 = this.$dateFormat(window.expertTemp.leaveTime, 'hh:mm')
      }
      if (window.expertTemp.guestType) {
        window.expertTemp.guestType += ''
      } else {
        window.expertTemp.guestType = '1' // 默认证件类型为身份证
      }
      window.expertTemp.guestNationality || (window.expertTemp.guestNationality = '中国')

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
    this.$watch('form.guestType', (newVal, oldVal) => {
      this.form.guestCardno = ''
    })
    this.$watch('form.arriveTrips', (newVal, oldVal) => {
      this.form.arriveTrips = newVal.toUpperCase()
    })
    this.$watch('form.leaveTrips', (newVal, oldVal) => {
      this.form.leaveTrips = newVal.toUpperCase()
    })
    this.$watch('form.arriveEnd', newVal => {
      setTimeout(() => {
        this.$refs.form.validateField('arriveEnd')
      }, 20)
    })
    this.$watch('date1', newVal => {
      if (newVal && this.time1) {
        this.form.arriveTime = `${newVal} ${this.time1}`
      } else {
        this.form.arriveTime = ''
      }
    })
    this.$watch('time1', newVal => {
      if (this.date1 && newVal) {
        this.form.arriveTime = `${this.date1} ${newVal}`
      } else {
        this.form.arriveTime = ''
      }
    })
    this.$watch('date2', newVal => {
      if (newVal && this.time2) {
        this.form.leaveTime = `${newVal} ${this.time2}`
      } else {
        this.form.leaveTime = ''
      }
    })
    this.$watch('time2', newVal => {
      if (this.date2 && newVal) {
        this.form.leaveTime = `${this.date2} ${newVal}`
      } else {
        this.form.leaveTime = ''
      }
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
    .select {
      width: 89px;
    }
    .submit{
      width: 100%;
    }
  }
  .datetime{
    width: 100%;
  }
</style>
