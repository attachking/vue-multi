<template>
  <div class="resume">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-jianli-copy"></i>基本信息</span>
      <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="toggle('formBase')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formBase')">
        <el-form label-position="left" inline class="demo-table-expand" v-if="!formBase" key="baseList">
          <el-form-item label="姓名">
            <span>徐丹阳</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>412312654946126</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>29</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>女性</span>
          </el-form-item>
          <el-form-item label="民族">
            <span>汉族</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <span>15617696629</span>
          </el-form-item>
          <el-form-item label="学历">
            <span>本科</span>
          </el-form-item>
          <el-form-item label="政治面貌">
            <span>党员</span>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <span>未婚</span>
          </el-form-item>
          <el-form-item label="毕业院校">
            <span>郑州大学</span>
          </el-form-item>
          <el-form-item label="毕业时间">
            <span>2018-06-20</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>给水排水工程</span>
          </el-form-item>
          <el-form-item label="户口所在地">
            <span>河南省郑州市</span>
          </el-form-item>
          <el-form-item label="现居住地">
            <span>河南省郑州市</span>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>6516161@qq.com</span>
          </el-form-item>
        </el-form>
        <el-form ref="formBase" :model="form1" :rules="rules1" class="form" label-width="100px" key="formBase" v-if="formBase">
          <el-form-item prop="aac003" label="姓名">
            <el-input v-model.trim="form1.aac003" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac002" label="身份证号">
            <el-input v-model.trim="form1.aac002" placeholder="请输入身份证号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac006" label="出生日期">
            <el-date-picker
              v-model="form1.aac006"
              :editable="false"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac004" label="性别">
            <el-select v-model="form1.aac004" placeholder="请选择性别">
              <el-option v-for="item in dictionaries.TAB_SEX" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac005" label="民族">
            <el-select v-model="form1.aac005" filterable placeholder="请选择民族">
              <el-option v-for="item in dictionaries.TAB_NATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aae005" label="手机号">
            <el-input v-model.trim="form1.aae005" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="acc011" label="学历">
            <el-select v-model="form1.acc011" placeholder="请选择学历">
              <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac024" label="政治面貌">
            <el-select v-model="form1.aac024" filterable placeholder="请选择政治面貌">
              <el-option v-for="item in dictionaries.TAB_AFFIL" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac017" label="婚姻状况">
            <el-select v-model="form1.aac017" filterable placeholder="请选择婚姻状况">
              <el-option v-for="item in dictionaries.TAB_MARRIAGE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac180" label="毕业院校">
            <el-select v-model="form1.aac180" filterable placeholder="输入关键字选择毕业院校">
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item prop="acc01g" label="专业">
            <el-select v-model="form1.acc01g" filterable placeholder="输入关键字选择专业">
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item prop="aac181" label="毕业时间">
            <el-date-picker
              v-model="form1.aac181"
              :editable="false"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aab305" label="户口所在地">
            <el-select v-model="form1.aab305" filterable placeholder="输入关键字选择地区">
              <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item prop="aab301" label="现居住地">
            <el-input v-model.trim="form1.aab301" placeholder="请输入现居住地" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aae015" label="邮箱">
            <el-input v-model.trim="form1.aae015" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit1" :loading="loading1" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formBase')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>求职意向</span>
      <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="toggle('formIntention')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <el-form ref="form" class="demo-table" v-if="!formIntention" key="intentionList">
          <el-form-item label="意向岗位">
            <span>意向岗位</span>
          </el-form-item>
          <el-form-item label="期望工作地区">
            <span>意向岗位</span>
          </el-form-item>
          <el-form-item label="期望薪资">
            <span>意向岗位</span>
          </el-form-item>
          <el-form-item label="期望工作性质">
            <span>意向岗位</span>
          </el-form-item>
        </el-form>
        <!--求职意向表单-->
        <el-form ref="formIntention" :model="form2" :rules="rules2" class="form" label-width="100px" key="formIntention" v-if="formIntention">
          <el-form-item prop="bca112" label="意向岗位" style="width: 100%;">
            <xf-cascader v-model="form2.bca112" placeholder="请选择意向岗位" change-on-select :options="dictionaries.CRAFT_AS"></xf-cascader>
            <xf-cascader v-model="form2.bca112" placeholder="第二意向岗位" change-on-select :options="dictionaries.CRAFT_AS"></xf-cascader>
            <xf-cascader v-model="form2.bca112" placeholder="第三意向岗位" change-on-select :options="dictionaries.CRAFT_AS"></xf-cascader>
          </el-form-item>
          <el-form-item prop="bcb202" label="工作地点" style="width: 100%;">
            <xf-cascader v-model="form2.bcb202" placeholder="请选择意向工作地点" change-on-select :options="dictionaries.TAB_CITY"></xf-cascader>
            <xf-cascader v-model="form2.bcb202" placeholder="第二意向工作地点" change-on-select :options="dictionaries.TAB_CITY"></xf-cascader>
            <xf-cascader v-model="form2.bcb202" placeholder="第三意向工作地点" change-on-select :options="dictionaries.TAB_CITY"></xf-cascader>
          </el-form-item>
          <el-form-item prop="acc034" label="期望薪资">
            <el-select v-model="form1.acc034" placeholder="请选择期望薪资">
              <el-option v-for="item in dictionaries.TAB_SALARY" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac013" label="求职性质">
            <el-select v-model="form1.aac013" placeholder="请选择求职性质">
              <el-option v-for="item in dictionaries.TAB_NATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2" :loading="loading2" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formIntention')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>教育经历</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formEducation')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <div class="education-list" v-if="!formEducation" key="educationList">
          <div class="item">
            <span>2016-03-03 -- 2017-06-06</span>
            <span>郑州大学</span>
            <span>给水排水工程</span>
            <span>本科</span>
            <el-button icon="el-icon-edit" size="mini" circle @click="toggle('formEducation')"></el-button>
          </div>
        </div>
        <!--教育经历表单-->
        <el-form ref="formEducation" :model="form3" :rules="rules3" class="form" label-width="100px" key="formEducation" v-if="formEducation">
          <el-form-item prop="aae030" label="开始时间">
            <el-date-picker
              v-model="form3.aae030"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac046" label="结束时间">
            <el-date-picker
              v-model="form3.aac046"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac045" label="学校名称">
            <el-input v-model.trim="form3.aac045" placeholder="请输入学校名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="acc01g" label="专业名称">
            <el-input v-model.trim="form3.acc01g" placeholder="请输入专业名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="atc011" label="学历">
            <el-select v-model="form3.atc011" placeholder="请选择学历">
              <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit3" :loading="loading3" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formEducation')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>工作经历</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formWork')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <div v-if="!formWork" key="workList">
          <el-form class="demo-table work-item">
            <el-form-item label="起止时间">
              <span>2017-03-03 -- 2018-12-12</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>河南讯丰信息技术有限公司</span>
            </el-form-item>
            <el-form-item label="职位名称">
              <span>web前端工程师</span>
            </el-form-item>
            <el-form-item label="职位描述">
              <span>负责公司前端项目的研发和维护工作</span>
            </el-form-item>
            <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="toggle('formWork')"></el-button>
          </el-form>
        </div>
        <!--工作经历表单-->
        <el-form ref="formWork" :model="form4" :rules="rules4" class="form" label-width="100px" key="formWork" v-if="formWork">
          <el-form-item prop="start" label="开始时间">
            <el-date-picker
              v-model="form4.start"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="end" label="结束时间">
            <el-date-picker
              v-model="form4.end"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac045" label="单位名称">
            <el-input v-model.trim="form4.aac045" placeholder="请输入单位名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac0b3" label="职位名称">
            <el-input v-model.trim="form4.aac0b3" placeholder="请输入职位名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac0b4" label="职位描述">
            <el-input type="textarea" :rows="4" v-model.trim="form4.aac0b4" placeholder="请输入职位名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit4" :loading="loading4" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formWork')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>技能证书</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('certForm')"></el-button>
    </div>
    <div class="container">
      <div class="cert-list">
        <span>英语四级<i class="el-icon-delete" title="删除" @click="delCert"></i></span>
      </div>
      <transition name="el-fade-in" mode="out-in">
        <div v-if="certForm">
          <el-form ref="certForm" inline :model="form5" class="inline-form" :rules="rules5" label-width="100px" v-if="certForm">
            <el-form-item prop="start" label="自定义证书">
              <el-input v-model="form5.name" placeholder="请输入自定义证书名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit5" :loading="loading5" size="mini">确定</el-button>
              <el-button type="default" @click="toggle('certForm')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
          <div class="cert-list">
            <span>英语六级<i class="el-icon-plus" title="添加" @click="addCert"></i></span>
          </div>
        </div>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>培训经历</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formTrain')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <div v-if="!formTrain" key="workList">
          <el-form class="demo-table work-item">
            <el-form-item label="起止时间">
              <span>2017-03-03 -- 2018-12-12</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>河南讯丰信息技术有限公司</span>
            </el-form-item>
            <el-form-item label="职位名称">
              <span>web前端工程师</span>
            </el-form-item>
            <el-form-item label="职位描述">
              <span>负责公司前端项目的研发和维护工作</span>
            </el-form-item>
            <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="toggle('formTrain')"></el-button>
          </el-form>
        </div>
        <!--培训经历表单-->
        <el-form ref="formWork" :model="form6" :rules="rules6" class="form" label-width="100px" key="formTrain" v-if="formTrain">
          <el-form-item prop="starttime" label="开始时间">
            <el-date-picker
              v-model="form6.starttime"
              type="date"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="endtime" label="结束时间">
            <el-date-picker
              v-model="form6.endtime"
              type="date"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="agencyname" label="培训机构名称">
            <el-input v-model.trim="form6.agencyname" placeholder="请输入培训机构名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="traindesc" label="培训内容">
            <el-input type="textarea" :rows="4" v-model.trim="form6.traindesc" placeholder="请输入培训内容" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit6" :loading="loading6" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formTrain')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>技能描述</span>
      <el-button title="添加" icon="el-icon-edit" size="mini" circle @click="toggle('formSkill')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <div v-if="!formSkill" key="skill" class="skill">
          1、撒大大大的
          2、方式发送到三国杀
        </div>
        <!--技能描述表单-->
        <el-form ref="formSkill" :model="form7" :rules="rules7" class="formSkill" label-width="100px" key="formSkill" v-if="formSkill">
          <el-form-item prop="desc" label="技能描述">
            <el-input type="textarea" :rows="6" v-model.trim="form7.desc" placeholder="请输入技能描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit7" :loading="loading7" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formSkill')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>自我介绍</span>
      <el-button title="添加" icon="el-icon-edit" size="mini" circle @click="toggle('formDesc')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in">
        <div v-if="!formSkill" key="skill" class="skill">
          1、撒大大大的
          2、方式发送到三国杀
        </div>
        <!--技能描述表单-->
        <el-form ref="formDesc" :model="form8" :rules="rules8" class="formSkill" label-width="100px" key="formDesc" v-if="formDesc">
          <el-form-item prop="desc" label="技能描述">
            <el-input type="textarea" :rows="6" v-model.trim="form8.desc" placeholder="请输入自我介绍"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit8" :loading="loading8" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formDesc')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {echo} from '../../../../common/js/utils'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'

export default {
  components: {XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  data() {
    return {
      formBase: false,
      form1: { // 基本信息
        aac002: '', // 身份证号
        aac003: '', // 姓名
        aae005: '', // 手机号码
        aae015: '', // 邮箱
        aac181: '', // 毕业时间
        aac004: '', // 性别
        aac004name: '',
        aac005: '', // 民族
        aac005name: '',
        aac006: '', // 出生日期
        aac024: '', // 政治面貌
        aab301: '', // 居住地
        aac041: '', // 个人介绍
        aac042: '', // 技能描述
        aab305: '', // 户籍地址
        aab305name: '',
        acc01g: '', // 专业
        acc011: '', // 学历
        acc011name: '',
        aac034: '', // 身高
        aac035: '', // 体重
        aac180: '', // 毕业院校
        aac017: '', // 婚姻状况
        aac017name: ''
      },
      rules1: {},
      // 求职意向
      form2: {
        bca112: '', // 期望岗位
        bcb202: '', // 期望地点
        acc034: '', // 期望月薪
        aac013: '' // 求职性质
      },
      rules2: {},
      formIntention: false,
      // 教育经历
      form3: {
        aae030: '', // 开始时间
        aac046: '', // 结束时间
        aac045: '', // 学校名称
        acc01g: '', // 专业名称
        atc011: '' // 学历
      },
      rules3: {},
      formEducation: false,
      // 工作经历
      form4: {
        start: '', // 开始时间
        end: '', // 结束时间
        aac045: '', // 公司名称
        aac0b3: '', // 职位名称
        aac0b4: '' // 职位描述
      },
      rules4: {},
      formWork: false,
      // 证书
      form5: {},
      rules5: {},
      certForm: false,
      // 培训经历
      form6: {
        agencyname: '', // 机构名称
        starttime: '', // 开始时间
        endtime: '', // 结束时间
        traindesc: '' // 培训详情
      },
      rules6: {},
      formTrain: false,
      // 技能描述
      form7: {
        desc: ''
      },
      rules7: {},
      formSkill: false,
      // 自我介绍
      form8: {
        desc: ''
      },
      rules8: {},
      formDesc: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false
    }
  },
  methods: {
    toggle(name) {
      this[name] = !this[name]
    },
    handleEnter(name) {
      if (this[name]) {
        this.$refs[name].clearValidate()
      }
    },
    onSubmit1() {
      this.$refs.formBase.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit2() {
      this.$refs.formIntention.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit3() {
      this.$refs.formEducation.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit4() {
      this.$refs.formWork.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit5() {
      this.$refs.certForm.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit6() {
      this.$refs.formTrain.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit7() {
      this.$refs.formSkill.validate(valid => {
        if (valid) {}
      })
    },
    onSubmit8() {
      this.$refs.formSkill.validate(valid => {
        if (valid) {}
      })
    },
    getBase() {
      this.$post('/service/business/person/resumeInfo/getResumeIndex.xf', {
        aac001: this.$userInfo.aac001
      }).then(res => {
        echo(this.form1, res.result.personInfo)
      })
    },
    delCert() {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1
      })
    },
    addCert() {}
  },
  created() {
    this.getBase()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .resume{
    padding: 20px 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .container{
    padding: 10px 20px;
  }
  .card-tit{
    .el-button{
      float: right;
      margin-top: 5px;
    }
  }
  .demo-table{
    label{
      color: #99a9bf;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
  .form{
    .el-form-item{
      width: 350px;
    }
    .el-date-editor{
      width: 100%;
    }
    .el-select{
      width: 100%;
    }
    .el-cascader{
      width: 250px;
    }
  }
  .education-list{
    font-size: 14px;
    .item{
      padding: 10px 10px;
      white-space: nowrap;
      &:nth-child(2n){
        background: #f3f3f3;
      }
      &:not(:last-child){
        border-bottom: 1px dashed #d9d9d9;
      }
      .el-button{
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
        display: inline-block;
        @include ellipsis;
        padding-right: 10px;
        &:nth-child(1){
          width: 25%;
        }
        &:nth-child(2){
          width: 30%;
        }
        &:nth-child(3){
          width: 30%;
        }
        &:nth-child(4){
          width: 85px;
        }
      }
    }
  }
  .work-item{
    padding: 10px 0;
    position: relative;
    .el-button{
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:not(:last-child){
      border-bottom: 1px dashed #d9d9d9;
    }
  }
  .cert-list{
    padding: 10px 0;
    span{
      font-size: 14px;
      display: inline-block;
      padding: 8px 12px;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      .el-icon-delete,.el-icon-plus{
        vertical-align: middle;
        margin-left: 5px;
        &:hover{
          color: $--color-primary;
          cursor: pointer;
        }
      }
    }
  }
  .inline-form{
    margin: 10px 0 0 0;
    padding: 20px 0 0 0;
    border-top: 1px solid #ebebeb;
    .el-form-item{
      margin-bottom: 10px;
    }
  }
  .formSkill{
    padding: 10px 0 0 0;
    width: 500px;
  }
  .skill{
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
