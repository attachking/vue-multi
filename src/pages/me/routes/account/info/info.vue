<!--单位基本信息-->
<template>
  <div class="corp-info" ref="info">
    <transition name="el-fade-in" mode="out-in" @enter="handleEnter">
      <el-form ref="form" v-if="formShow" :rules="rules" :model="form" label-width="140px" class="form" key="form">
        <el-form-item label="单位名称" prop="aab004">
          <el-input v-model="form.aab004" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="单位性质" prop="aab019">
          <el-select v-model="form.aab019" placeholder="请选择单位性质">
            <el-option v-for="item in dictionaries.TAB_UNITNATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员规模" prop="aab056">
          <el-select v-model="form.aab056" placeholder="请选择人员规模">
            <el-option v-for="item in dictionaries.TAB_PSCALE" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位所属行业" prop="ccpr10">
          <el-select v-model="form.ccpr10" placeholder="请选择单位所属行业">
            <el-option v-for="item in dictionaries.INDUSTRY_AS" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位所属产业" prop="aab054">
          <el-select v-model="form.aab054" placeholder="请选择单位所属产业">
            <el-option v-for="item in dictionaries.TAB_INDUSTRYCLASSES" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位所属区域" prop="aab301">
          <xf-cascader :fulltext.sync="form.aaa021" :options="dictionaries.TAB_CITY3" v-model="form.aab301" placeholder="请选择单位所属区域"></xf-cascader>
        </el-form-item>
        <el-form-item label="单位所属经济类型" prop="ccpr10">
          <el-select v-model="form.aab020" placeholder="请选择单位所属行业">
            <el-option v-for="item in dictionaries.TAB_ECONOMIC" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="法定代表人" prop="aab013">
          <el-input v-model="form.aab013" placeholder="请输入法定代表人"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人身份证号" prop="aab014">
          <el-input v-model="form.aab014" placeholder="请输入法定代表人身份证号"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人手机号" prop="aab015">
          <el-input v-model="form.aab015" placeholder="请输入法定代表人手机号"></el-input>
        </el-form-item>
        <el-form-item label="单位联系人" prop="aae004">
          <el-input v-model="form.aae004" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="aae005">
          <el-input v-model="form.aae005" placeholder="请输入联系人手机号"></el-input>
        </el-form-item>
        <el-form-item label="办公电话" prop="aab115">
          <el-input v-model="form.aab115" placeholder="请输入办公电话"></el-input>
          <span class="tip red">单位及职位详情仅显示办公电话，需向求职者公开</span>
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="aae015">
          <el-input v-model="form.aae015" placeholder="请输入联系人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="aab041">
          <el-input v-model="form.aab041" placeholder="请输入联系人微信"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="aab042">
          <el-input v-model="form.aab042" placeholder="请输入联系人QQ号"></el-input>
        </el-form-item>
        <el-form-item label="微博" prop="aab043">
          <el-input v-model="form.aab043" placeholder="请输入微博昵称"></el-input>
        </el-form-item>
        <el-form-item label="单位注册地址" prop="aae006">
          <el-input v-model="form.aae006" placeholder="请输入单位注册地址"></el-input>
        </el-form-item>
        <el-form-item label="单位联系地址" prop="aab040">
          <el-input v-model="form.aab040" placeholder="请输入单位联系地址"></el-input>
          <el-button icon="el-icon-location" size="mini" class="location" circle title="点击在地图上选取坐标" @click="dialogVisible = true"></el-button>
          <span class="tip" :class="form.cabq02 ? 'green' : 'red'">{{form.cabq02 ? '已选取坐标' : '未选取坐标'}}</span>
        </el-form-item>
        <el-form-item label="单位网址" prop="aae016">
          <el-input v-model="form.aae016" placeholder="请输入单位网址"></el-input>
        </el-form-item>
        <el-form-item label="乘车路线" prop="acb205">
          <el-input v-model="form.acb205" placeholder="请输入乘车路线"></el-input>
        </el-form-item>
        <el-form-item label="单位简介" prop="acb206">
          <el-input type="textarea" :rows="12" v-model="form.acb206" placeholder="请输入单位简介"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="formShow = false">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="140px" v-if="!formShow" class="infoForm" key="list">
        <el-button type="primary" icon="el-icon-edit" size="mini" class="edit-btn" @click="formShow = true">编辑</el-button>
        <el-form-item label="单位名称">
          <span>{{info.aab004 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位性质">
          <span>{{info.aab019name || '--'}}</span>
        </el-form-item>
        <el-form-item label="人员规模">
          <span>{{info.aab056name || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位所属行业">
          <span>{{info.ccpr10name || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位所属产业">
          <span>{{info.aab054name || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位所属区域">
          <span>{{info.aaa021 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位所属经济类型">
          <span>{{info.aab020name || '--'}}</span>
        </el-form-item>
        <el-form-item label="法定代表人">
          <span>{{info.aab013 || '--'}}</span>
        </el-form-item>
        <el-form-item label="法定代表人身份证号">
          <span>{{info.aab014 || '--'}}</span>
        </el-form-item>
        <el-form-item label="法定代表人手机号">
          <span>{{info.aab015 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位联系人">
          <span>{{info.aae004 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系人手机号">
          <span>{{info.aae005 || '--'}}</span>
        </el-form-item>
        <el-form-item label="办公电话">
          <span>{{info.aab115 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系人邮箱">
          <span>{{info.aae015 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系人微信">
          <span>{{info.aab041 || '--'}}</span>
        </el-form-item>
        <el-form-item label="联系人QQ">
          <span>{{info.aab042 || '--'}}</span>
        </el-form-item>
        <el-form-item label="微博">
          <span>{{info.aab043 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位注册地址">
          <span>{{info.aae006 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位联系地址">
          <span>{{info.aab040 || '--'}}</span>
          <span class="tip" :class="info.cabq02 ? 'green' : 'red'">{{info.cabq02 ? '已选取坐标' : '未选取坐标'}}</span>
        </el-form-item>
        <el-form-item label="单位网址">
          <span>{{info.aae016 || '--'}}</span>
        </el-form-item>
        <el-form-item label="乘车路线">
          <span>{{info.acb205 || '--'}}</span>
        </el-form-item>
        <el-form-item label="单位简介">
          <span class="no-wrap">{{info.acb206 || '--'}}</span>
        </el-form-item>
      </el-form>
    </transition>
    <el-dialog
      @open="renderMap"
      title="选择坐标"
      :visible.sync="dialogVisible"
      width="700px">
      <el-form :inline="true" class="demo-form-inline" onsubmit="return false">
        <el-form-item label="关键字">
          <el-input v-model.trim="mapKeywords" placeholder="请输入关键字搜索位置" @keydown.native.enter.stop.prevent="mapSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="mapSubmit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <p class="map-tip">在地图上点击公司所在位置<img class="map-marker" src="../../../../../../static/assets/marker.png">进行标记，然后关闭本窗口即可</p>
      <div id="allmap" class="map"></div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import XfCascader from '../../../../../components/xf-cascader/xf-cascader.vue'
import {echo, reg} from '../../../../../common/js/utils'
import event from '../../../../../common/js/event'
import $ from 'jquery'

const BMap = window.BMap

export default {
  components: {XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries',
      'authenInfo'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      formShow: false,
      form: {
        aab004: '', // 单位名称
        aab019: '', // 单位性质
        ccpr10: '', // 行业类型
        aab056: '', // 人员规模
        aaa021: '', // 所在区域
        aab301: '', // 所在区域code
        aab040: '', // 地图地址
        aab013: '', // 法定代表人
        aae004: '', // 联系人
        aae005: '', // 手机号
        acb205: '', // 乘车路线
        aae016: '', // 公司网址
        acb206: '', // 公司简介
        cabq02: '', // 经度
        cabq03: '', // 维度
        aab054: '', // 产业类型
        aab015: '', // 法定代表人手机号
        aab014: '', // 法定代表人身份证号
        aae006: '', // 注册地址
        aab042: '', // QQ
        aab041: '', // 微信
        aae015: '', // 联系人邮箱
        aab020: '', // 单位所属经济类型
        aab115: '', // 办公电话
        aab043: '' // 微博
      },
      rules: {
        aab054: [{
          required: true,
          message: '请选择单位所属产业',
          trigger: 'change'
        }],
        aab004: [{
          required: true,
          message: '请输入单位名称',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多50个字符',
          trigger: 'change'
        }],
        aab019: [{
          required: true,
          message: '请选择单位性质',
          trigger: 'change'
        }],
        ccpr10: [{
          required: true,
          message: '请选择行业类型',
          trigger: 'change'
        }],
        aab056: [{
          required: true,
          message: '请选择人员规模',
          trigger: 'change'
        }],
        aab301: [{
          required: true,
          message: '请选择所在区域',
          trigger: 'change'
        }],
        aab040: [{
          required: true,
          message: '请输入单位联系地址',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多不超过50个字符',
          trigger: 'change'
        }],
        aab013: [{
          required: true,
          message: '请输入法定代表人',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多不超过10个字符',
          trigger: 'change'
        }],
        aae004: [{
          required: true,
          message: '请输入联系人',
          trigger: 'change'
        }, {
          max: 10,
          message: '最多不超过10个字符',
          trigger: 'change'
        }],
        aae005: [{
          required: true,
          message: '请输入联系方式',
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
        aab115: [{
          required: true,
          message: '请输入办公电话',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (reg.tel(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的电话号码'))
            }
          },
          trigger: 'change'
        }],
        acb205: [{
          required: false,
          message: '请输入乘车路线',
          trigger: 'change'
        }, {
          max: 30,
          message: '最多不超过30个字符',
          trigger: 'change'
        }],
        aae016: [{
          max: 30,
          message: '最多不超过30个字符',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (value === '') {
              callback()
              return
            }
            if (/^http(s?):\/\//.test(value)) {
              callback()
            } else {
              callback(new Error('网址请以http://或https://开头'))
            }
          },
          trigger: 'change'
        }],
        acb206: [{
          required: true,
          message: '请输入单位简介',
          trigger: 'change'
        }, {
          max: 1000,
          message: '最多不超过1000个字符',
          trigger: 'change'
        }],
        aab015: [{
          validator(rule, value, callback) {
            if (reg.phone(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          },
          trigger: 'change'
        }],
        aab014: [{
          validator(rule, value, callback) {
            if (reg.idCard(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的身份证号'))
            }
          },
          trigger: 'change'
        }],
        aae006: [{
          required: true,
          message: '请输入单位注册地址',
          trigger: 'change'
        }, {
          max: 50,
          message: '最多不超过50个字符',
          trigger: 'change'
        }],
        aab042: [{
          validator(rule, value, callback) {
            if (value === '') {
              callback()
              return
            }
            if (/^\d{3,20}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的QQ号'))
            }
          },
          trigger: 'change'
        }],
        aab041: [{
          validator(rule, value, callback) {
            if (value === '') {
              callback()
              return
            }
            if (/^[\da-zA-Z_]{3,25}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的微信号'))
            }
          },
          trigger: 'change'
        }],
        aae015: [{
          validator(rule, value, callback) {
            if (reg.email(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱号'))
            }
          },
          trigger: 'change'
        }],
        aab043: [{
          max: 25,
          message: '最多25个字符',
          trigger: 'change'
        }]
      },
      info: {},
      hasMap: false,
      mapKeywords: ''
    }
  },
  methods: {
    mapSubmit() {
      event.$emit('mapKeywords', this.mapKeywords)
    },
    renderMap() {
      // 因为百度地图加载的位置因为定位等原因，与整个html 页面产生了不同步滚动的问题。
      // 百度地图的缩放是基于body层的，如果body层有滚动条，并且不在最顶端，在当前位置插入了百度地图，也就是出现该问题时的状态，这个时候滚轮缩放就会产生偏移
      // 解决办法，加载地图前将滚动条滚动至顶部
      $(window).scrollTop(0)
      let _this = this
      if (this.hasMap) return
      this.hasMap = true
      event.$off('mapKeywords')
      setTimeout(() => {
        let map = new BMap.Map('allmap')
        // 自定义标注图标
        var myIcon = new BMap.Icon('./static/assets/marker.png', new BMap.Size(40, 40), {
          anchor: new BMap.Size(20, 40),
          imageSize: new BMap.Size(40, 40)
        })
        let point
        if (this.form.cabq02) {
          point = new BMap.Point(this.form.cabq02, this.form.cabq03)
          map.clearOverlays()
          map.addOverlay(new BMap.Marker(point, {icon: myIcon})) // 将标注添加到地图中
        } else {
          point = new BMap.Point(113.658437, 34.752965)
        }
        map.centerAndZoom(point, 12)
        map.addControl(new BMap.NavigationControl())
        map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
        map.addControl(new BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}))
        var local = new BMap.LocalSearch(map, {
          renderOptions: {map: map},
          onMarkersSet: function(arr) {
            if (!arr.length) {
              _this.$message({
                message: '未搜索到内容',
                type: 'warning'
              })
            }
            arr.forEach(item => {
              item.marker.addEventListener('click', function(e) {
                if (e.domEvent && typeof e.domEvent.stopPropagation === 'function') {
                  e.domEvent.stopPropagation()
                } else if (e.domEvent) {
                  e.domEvent.cancelBubble = true
                }
                handleClick(item)
              })
            })
          }
        })
        event.$on('mapKeywords', keywords => {
          local.search(keywords)
        })
        function myFun(result) {
          if (_this.form.cabq02) return
          let cityName = result.name
          map.setCenter(cityName)
        }
        let myCity = new BMap.LocalCity()
        myCity.get(myFun)
        function handleClick(e) {
          // lng经度，lat维度
          map.clearOverlays()
          var point = new BMap.Point(e.point.lng, e.point.lat)
          var marker = new BMap.Marker(point, {icon: myIcon})// 创建标注
          map.addOverlay(marker) // 将标注添加到地图中
          _this.form.cabq02 = e.point.lng
          _this.form.cabq03 = e.point.lat
        }
        map.addEventListener('click', handleClick)
      }, 1000)
    },
    getInfo() {
      const loading = this.$loading({
        target: this.$refs.info,
        fullscreen: false
      })
      this.$post('/service/business/corp/corps/corpForm', {
        aab001: this.$userInfo.aab001
      }).then(res => {
        loading.close()
        echo(this.form, res.result)
        this.info = res.result
        this.formShow = false
        event.$emit('authen')
      }).catch(() => {
        loading.close()
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.authenInfo.authenState === 2) {
            this.$confirm('编辑后需重新提交后台审核，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.save()
            })
          } else {
            this.save()
          }
        }
      })
    },
    save() {
      const form = Object.assign({
        aab001: this.$userInfo.aab001
      }, this.form)
      this.$post('/service/business/corp/corps/corpSave', form).then(res => {
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getInfo()
        }
      })
    },
    handleEnter() {
      if (this.formShow) {
        this.$refs.form.clearValidate()
      }
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .form{
    padding: 20px 0;
    .el-input,.el-select,.el-cascader{
      width: 300px;
    }
    .location{
      margin: 0 0 0 10px;
    }
  }
  .tip{
    margin: 0 0 0 10px;
  }
  .red{
    color: red;
  }
  .green{
    color: green;
  }
  .map{
    height: 400px;
    div{
      transition: background 0s;
    }
  }
  .map-tip{
    margin: 0 0 15px 0;
    font-size: 14px;
    color: red;
  }
  .infoForm{
    margin: 20px 0 0 0;
    position: relative;
    .edit-btn{
      position: absolute;
      right: 50px;
      top: 10px;
      z-index: 5;
    }
  }
  .map-marker{
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: baseline;
  }
</style>
