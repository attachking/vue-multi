<template>
  <div class="resume">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-jianli-copy"></i>基本信息</span>
      <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="toggle('formBase')"></el-button>
      <a :href="'personalInfo.html?aac001=' + info1.aac001" target="_blank">
        <el-button type="primary" size="mini" round style="float: right; margin: 3px 60px 0 0">预览简历</el-button>
      </a>
      <el-switch
        style="float: right; margin: 8px 60px 0 0"
        v-model="secret"
        active-text="保密"
        inactive-text="公开">
      </el-switch>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formBase')">
        <el-form label-position="left" inline class="demo-table-expand" v-if="!formBase" key="baseList">
          <el-form-item label="姓名">
            <span class="fix-width">{{info1.aac003 || '--'}}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span class="fix-width">{{info1.aac002 || '--'}}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span class="fix-width">{{info1.aac006 || '--'}}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span class="fix-width">{{info1.age || '--'}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span class="fix-width">{{info1.aac004name || '--'}}</span>
          </el-form-item>
          <el-form-item label="民族">
            <span class="fix-width">{{info1.aac005name || '--'}}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span class="fix-width">{{info1.aae005 || '--'}}</span>
          </el-form-item>
          <!--<el-form-item label="身高">
            <span class="fix-width">{{info1.aac034 ? info1.aac034 + 'cm' : '&#45;&#45;'}}</span>
          </el-form-item>
          <el-form-item label="体重">
            <span class="fix-width">{{info1.aac035 ? info1.aac035 + 'kg' : '&#45;&#45;'}}</span>
          </el-form-item>-->
          <el-form-item label="学历">
            <span class="fix-width">{{info1.aac011name || '--'}}</span>
          </el-form-item>
          <el-form-item label="政治面貌">
            <span class="fix-width">{{info1.aac024name || '--'}}</span>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <span class="fix-width">{{info1.aac017name || '--'}}</span>
          </el-form-item>
          <el-form-item label="毕业院校">
            <span class="fix-width">{{info1.aac180name || '--'}}</span>
          </el-form-item>
          <el-form-item label="专业类别">
            <span class="fix-width">{{info1.acc01gName || '--'}}</span>
          </el-form-item>
          <el-form-item label="专业名称">
            <span class="fix-width">{{info1.aac040 || '--'}}</span>
          </el-form-item>
          <el-form-item label="毕业时间">
            <span class="fix-width">{{info1.aac181 || '--'}}</span>
          </el-form-item>
          <el-form-item label="户口所在地">
            <span class="fix-width">{{info1.aab305name || '--'}}</span>
          </el-form-item>
          <el-form-item label="军人证号">
            <span class="fix-width">{{info1.aac00a || '--'}}</span>
          </el-form-item>
          <el-form-item label="户口性质">
            <span class="fix-width">{{info1.aac009 || '--'}}</span>
          </el-form-item>
          <el-form-item label="籍贯">
            <span class="fix-width">{{info1.aac025 || '--'}}</span>
          </el-form-item>
          <el-form-item label="邮编">
            <span class="fix-width">{{info1.aae007 || '--'}}</span>
          </el-form-item>
          <el-form-item label="健康状况">
            <span class="fix-width">{{info1.aac033name || '--'}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span class="fix-width">{{info1.aae015 || '--'}}</span>
          </el-form-item>
          <el-form-item label="现居住地址">
            <span class="fix-width">{{info1.aab301 || '--'}}</span>
          </el-form-item>
        </el-form>
        <el-form ref="formBase" :model="form1" inline :rules="rules1" class="base-form" label-width="100px" key="formBase" v-if="formBase">
          <el-form-item prop="aac003" label="姓名">
            <el-input v-model.trim="form1.aac003" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac002" label="身份证号">
            <el-input v-model.trim="form1.aac002" placeholder="请输入身份证号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac006" label="出生日期">
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="form1.aac006"
              :editable="false"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="age" label="年龄">
            <el-input v-model.trim="form1.age" placeholder="请输入年龄" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac004" label="性别">
            <el-select v-model="form1.aac004" placeholder="请选择性别" clearable>
              <el-option v-for="item in dictionaries.TAB_SEX" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac005" label="民族">
            <el-select v-model="form1.aac005" filterable placeholder="请选择民族" clearable>
              <el-option v-for="item in dictionaries.TAB_NATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aae005" label="联系电话">
            <el-input v-model.trim="form1.aae005" placeholder="请输入联系电话" clearable></el-input>
          </el-form-item>
          <!--<el-form-item prop="aac034" label="身高">
            <el-input v-model.trim="form1.aac034" placeholder="请输入身高" clearable>
              <template slot="append">cm</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="aac035" label="体重">
            <el-input v-model.trim="form1.aac035" placeholder="请输入体重" clearable>
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>-->
          <el-form-item prop="aac011" label="学历">
            <el-select v-model="form1.aac011" placeholder="请选择学历" clearable>
              <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac024" label="政治面貌">
            <el-select v-model="form1.aac024" filterable placeholder="请选择政治面貌" clearable>
              <el-option v-for="item in dictionaries.TAB_AFFIL" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac017" label="婚姻状况">
            <el-select v-model="form1.aac017" filterable placeholder="请选择婚姻状况" clearable>
              <el-option v-for="item in dictionaries.TAB_MARRIAGE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac00a" label="军人证号">
            <el-input placeholder="请输入军人证号" v-model.trim="form1.aac00a"></el-input>
          </el-form-item>
          <el-form-item prop="aac009" label="户口性质">
            <el-select v-model="form1.aac009" filterable placeholder="请选择户口性质" clearable>
              <el-option v-for="item in dictionaries.TAB_CATEGORY" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac025" label="籍贯">
            <el-input placeholder="请输入籍贯" v-model.trim="form1.aac025"></el-input>
          </el-form-item>
          <el-form-item prop="aac033" label="健康状况">
            <el-select v-model="form1.aac033" filterable placeholder="请选择健康状况" clearable>
              <el-option v-for="item in dictionaries.TAB_HEALTH" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aae007" label="邮编">
            <el-input placeholder="请输入邮编" v-model.trim="form1.aae007"></el-input>
          </el-form-item>
          <el-form-item prop="aac180" label="毕业院校">
            <el-input placeholder="请选择毕业院校" v-model="form1.aac180name" readonly @click.native="showSchool"></el-input>
          </el-form-item>
          <el-form-item prop="acc01g" label="专业类别">
            <xf-cascader :options="dictionaries.tab_major_type" v-model="form1.acc01g" placeholder="请选择专业类别" clearable></xf-cascader>
          </el-form-item>
          <el-form-item prop="aac040" label="专业名称">
            <el-input v-model.trim="form1.aac040" placeholder="请输入专业名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac181" label="毕业时间">
            <el-date-picker
              v-model="form1.aac181"
              :editable="false"
              type="date"
              clearable
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aab305" label="户口所在地">
            <!--<el-select v-model="form1.aab305" filterable placeholder="输入关键字选择地区" clearable remote :remote-method="remoteAddress" :loading="addressLoading">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>-->
            <xf-cascader :options="dictionaries.TAB_CITY3" v-model="form1.aab305" placeholder="请选择户口所在地" clearable></xf-cascader>
          </el-form-item>
          <el-form-item prop="aab301" label="现居住地址">
            <el-input v-model.trim="form1.aab301" placeholder="请输入现居住地址" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aae015" label="电子邮箱">
            <el-input v-model.trim="form1.aae015" placeholder="请输入邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item style="width: 100%;text-align: center;">
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
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formIntention')">
        <el-form ref="form" class="demo-table" v-if="!formIntention" key="intentionList">
          <el-form-item label="意向岗位">
            <span>{{info2.bca112 || '--'}}{{info2.bcaa12 && `，${info2.bcaa12}`}}{{info2.bcab12 && `，${info2.bcab12}`}}</span>
          </el-form-item>
          <el-form-item label="期望工作地区">
            <span>{{info2.bcb202 || '--'}}{{info2.bcb203 && `，${info2.bcb203}`}}{{info2.bcb204 && `，${info2.bcb204}`}}</span>
          </el-form-item>
          <el-form-item label="期望薪资">
            <span>{{info2.acc034Name || '--'}}</span>
          </el-form-item>
          <el-form-item label="期望工作性质">
            <span>{{info2.aac013Name || '--'}}</span>
          </el-form-item>
          <el-form-item label="福利待遇">
            <span>{{info2.acc214name || '--'}}</span>
          </el-form-item>
          <el-form-item label="食宿要求">
            <span>{{info2.acb228name || '--'}}</span>
          </el-form-item>
          <el-form-item label="单位性质">
            <span>{{info2.aab019name || '--'}}</span>
          </el-form-item>
          <el-form-item label="经济类型">
            <span>{{info2.aab020name || '--'}}</span>
          </el-form-item>
          <el-form-item label="参加工作时间">
            <span>{{info2.aac007 || '--'}}</span>
          </el-form-item>
        </el-form>
        <!--求职意向表单-->
        <el-form ref="formIntention" :model="form2" :rules="rules2" class="form" label-width="100px" key="formIntention" v-if="formIntention">
          <el-form-item prop="bca111" label="意向岗位" style="width: 100%;">
            <xf-cascader v-model="form2.bca111" :text.sync="form2.bca112" placeholder="请选择意向岗位" :options="dictionaries.CRAFT_AS"></xf-cascader>
            <xf-cascader v-model="form2.bcaa11" :text.sync="form2.bcaa12" placeholder="第二意向岗位" :options="dictionaries.CRAFT_AS"></xf-cascader>
            <xf-cascader v-model="form2.bcab11" :text.sync="form2.bcab12" placeholder="第三意向岗位" :options="dictionaries.CRAFT_AS"></xf-cascader>
          </el-form-item>
          <el-form-item prop="acb202" label="工作地点" style="width: 100%;">
            <xf-cascader v-model="form2.acb202" :fulltext.sync="form2.bcb202" placeholder="请选择意向工作地点" :options="dictionaries.TAB_CITY3"></xf-cascader>
            <xf-cascader v-model="form2.acb203" :fulltext.sync="form2.bcb203" placeholder="第二意向工作地点" :options="dictionaries.TAB_CITY3"></xf-cascader>
            <xf-cascader v-model="form2.acb204" :fulltext.sync="form2.bcb204" placeholder="第三意向工作地点" :options="dictionaries.TAB_CITY3"></xf-cascader>
          </el-form-item>
          <el-form-item prop="acc034" label="期望薪资">
            <el-select v-model="form2.acc034" placeholder="请选择期望薪资">
              <el-option v-for="item in dictionaries.TAB_SALARY" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac013" label="求职性质">
            <el-select v-model="form2.aac013" placeholder="请选择求职性质">
              <el-option v-for="item in dictionaries.TAB_NATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="acc214" label="福利待遇">
            <el-select v-model="form2.acc214" placeholder="请选择福利待遇" multiple collapse-tags>
              <el-option v-for="item in dictionaries.TAB_WELFARE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="acb228" label="食宿要求">
            <el-select v-model="form2.acb228" placeholder="请选择食宿要求">
              <el-option v-for="item in dictionaries.TAB_SREQUIREMENT" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aab019" label="单位性质">
            <el-select v-model="form2.aab019" placeholder="请选择食宿要求">
              <el-option v-for="item in dictionaries.TAB_UNITNATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aab020" label="经济类型">
            <el-select v-model="form2.aab020" placeholder="请选择经济类型">
              <el-option v-for="item in dictionaries.TAB_ECONOMIC" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="aac007" label="参加工作时间">
            <el-date-picker
              :picker-options="pickerOptions2"
              :editable="false"
              v-model="form2.aac007"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择参加工作时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2" :loading="loading2" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formIntention')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-xueshimao"></i>教育背景</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formEducation')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formEducation')">
        <el-table
          :data="educationList"
          stripe
          v-if="!formEducation"
          key="educationList"
          style="width: 100%">
          <el-table-column
            align="center"
            width="200px"
            label="时间">
            <template slot-scope="scope">
              <span>{{scope.row.aae030}} -- {{scope.row.aac046}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="学校">
            <template slot-scope="scope">
              <span>{{scope.row.aac045 || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="专业">
            <template slot-scope="scope">
              <span>{{scope.row.acc01g || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="学历">
            <template slot-scope="scope">
              <span>{{scope.row.atc011 || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.aae013 || '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100px"
            label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" size="mini" circle @click="editEducation(scope.row)" title="修改"></el-button>
              <el-button icon="el-icon-delete" size="mini" circle @click="delEducation(scope.row)" title="删除"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--教育经历表单-->
        <el-form ref="formEducation" :model="form3" :rules="rules3" class="form" label-width="100px" key="formEducation" v-if="formEducation">
          <el-form-item prop="aae030" label="开始时间">
            <el-date-picker
              :editable="false"
              v-model="form3.aae030"
              type="date"
              :picker-options="pickerOptions2"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac046" label="结束时间">
            <el-date-picker
              v-model="form3.aac046"
              :editable="false"
              type="date"
              value-format="yyyy-MM-dd"
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
          <el-form-item prop="aae013" label="备注">
            <el-input :rows="3" type="textarea" v-model.trim="form3.aae013" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit3" :loading="loading3" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formEducation')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-iconzhiwei"></i>工作经历</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formWork')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formWork')">
        <div v-if="!formWork" key="workList">
          <p class="no-data" v-if="!worksList.length"><i class="el-icon-info"></i>您还没有填写工作经历</p>
          <el-form class="demo-table work-item" v-for="val in worksList" :key="val.aac0b0">
            <el-form-item label="起止时间">
              <span>{{val.aae030}} -- {{val.aae031}}</span>
            </el-form-item>
            <el-form-item label="单位名称">
              <span>{{val.aac045 || '--'}}</span>
            </el-form-item>
            <el-form-item label="岗位名称">
              <span>{{val.aac0b3 || '--'}}</span>
            </el-form-item>
            <el-form-item label="岗位描述">
              <span class="max-text">{{val.aac0b4 || '--'}}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span class="max-text">{{val.aae013 || '--'}}</span>
            </el-form-item>
            <div class="item-edit">
              <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="editWork(val)"></el-button>
              <el-button title="删除" icon="el-icon-delete" size="mini" circle @click="delWork(val)"></el-button>
            </div>
          </el-form>
        </div>
        <!--工作经历表单-->
        <el-form ref="formWork" :model="form4" :rules="rules4" class="form" label-width="100px" key="formWork" v-if="formWork">
          <el-form-item prop="aae030" label="开始时间">
            <el-date-picker
              :editable="false"
              v-model="form4.aae030"
              type="date"
              :picker-options="pickerOptions2"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aae031" label="结束时间">
            <el-date-picker
              :editable="false"
              v-model="form4.aae031"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="aac045" label="单位名称">
            <el-input v-model.trim="form4.aac045" placeholder="请输入单位名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac0b3" label="岗位名称">
            <el-input v-model.trim="form4.aac0b3" placeholder="请输入岗位名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aac0b4" label="岗位描述">
            <el-input type="textarea" :rows="4" v-model.trim="form4.aac0b4" placeholder="请输入岗位名称" clearable></el-input>
          </el-form-item>
          <el-form-item prop="aae013" label="备注">
            <el-input :rows="4" type="textarea" v-model.trim="form4.aae013" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit4" :loading="loading4" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formWork')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="el-icon-document"></i>技能证书</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('certForm')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('certForm')">
        <div class="cert-list" v-if="!certForm" key="list">
          <el-table
            :data="certList"
            stripe
            style="width: 100%">
            <el-table-column
              align="center"
              label="证书名称">
              <template slot-scope="scope">
                <el-popover
                  placement="top"
                  title="附件"
                  width="200"
                  :disabled="!scope.row.aac0c5"
                  trigger="hover">
                  <img :src="scope.row.aac0c5" style="width: 100%;" v-img="scope.row.aac0c5">
                  <el-button slot="reference" type="text">{{scope.row.bac0c2}}</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="获得日期">
              <template slot-scope="scope">
                <span>{{scope.row.aac0c4 || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="证书类别">
              <template slot-scope="scope">
                <span>{{scope.row.cczy06Str || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="证书编号">
              <template slot-scope="scope">
                <span>{{scope.row.aac0c3 || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.aae013 || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="editCert(scope.row)"></el-button>
                <el-button title="删除" icon="el-icon-delete" size="mini" circle @click="delCert(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="certForm" key="form">
          <!--技能证书表单-->
          <el-form ref="certForm" :model="form5" class="form" :rules="rules5" label-width="100px" v-if="certForm">
            <el-form-item prop="bac0c2" label="证书名称">
              <el-input v-model="form5.bac0c2" placeholder="请输入证书名称"></el-input>
            </el-form-item>
            <el-form-item prop="aac0c4" label="获得日期">
              <el-date-picker
                :editable="false"
                v-model="form5.aac0c4"
                type="date"
                :picker-options="pickerOptions2"
                value-format="yyyy-MM-dd"
                placeholder="获得日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="aac0c3" label="证书编号">
              <el-input v-model="form5.aac0c3" placeholder="请输入证书编号"></el-input>
            </el-form-item>
            <el-form-item prop="cczy06" label="证书类别">
              <el-select v-model="form5.cczy06" placeholder="请选择证书类别" clearable>
                <el-option v-for="item in dictionaries.TAB_CERTIFICATE_TYPE" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="aae013" label="备注">
              <el-input v-model="form5.aae013" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="附件" :style="`${form5.aac0c5 ? 'max-height: 150px; ' : ''}overflow: hidden;`">
              <el-upload
                :data="uploadForm"
                accept="image/jpg,image/jpeg,image/png"
                :action="baseUrl + '/service/business/fm/pic/picInfo/uploadPicInfo'"
                :limit="1"
                :file-list="fileList"
                :on-success="onSuccess"
                :on-remove="onRemove"
                list-type="picture-card">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit5" :loading="loading5" size="mini">确定</el-button>
              <el-button type="default" @click="toggle('certForm')" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="el-icon-tickets"></i>培训经历</span>
      <el-button title="添加" icon="el-icon-plus" size="mini" circle @click="toggle('formTrain')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formTrain')">
        <div v-if="!formTrain" key="workList">
          <p class="no-data" v-if="!trainList.length"><i class="el-icon-info"></i>您还没有填写培训经历</p>
          <el-form class="demo-table work-item" v-for="val in trainList" :key="val.id">
            <el-form-item label="起止时间">
              <span>{{val.starttime}} -- {{val.endtime}}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{val.agencyname || '--'}}</span>
            </el-form-item>
            <el-form-item label="培训内容">
              <span class="max-text">{{val.traindesc || '--'}}</span>
            </el-form-item>
            <div class="item-edit">
              <el-button title="修改" icon="el-icon-edit" size="mini" circle @click="editTrain(val)"></el-button>
              <el-button icon="el-icon-delete" size="mini" circle @click="delTrain(val)" title="删除"></el-button>
            </div>
          </el-form>
        </div>
        <!--培训经历表单-->
        <el-form ref="formTrain" :model="form6" :rules="rules6" class="form" label-width="100px" key="formTrain" v-if="formTrain">
          <el-form-item prop="starttime" label="开始时间">
            <el-date-picker
              v-model="form6.starttime"
              type="date"
              :picker-options="pickerOptions2"
              :editable="false"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="endtime" label="结束时间">
            <el-date-picker
              v-model="form6.endtime"
              type="date"
              :editable="false"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="agencyname" label="机构名称">
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
      <span class="item active"><i class="xffont font-admin"></i>技能描述</span>
      <el-button title="添加" icon="el-icon-edit" size="mini" circle @click="toggle('formSkill')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formSkill')">
        <div v-if="!formSkill" key="skill" class="skill-box">
          <el-button icon="el-icon-delete" size="mini" circle @click="delDesc('skill')" title="删除" class="skill-del" v-if="info1.aac042"></el-button>
          <p class="no-data" v-if="!info1.aac042"><i class="el-icon-info"></i>您还没有填写技能描述</p>
          <p class="skill">{{info1.aac042}}</p>
        </div>
        <!--技能描述表单-->
        <el-form ref="formSkill" :model="form7" :rules="rules7" class="formSkill" label-width="100px" key="formSkill" v-if="formSkill">
          <el-form-item prop="aac042" label="技能描述">
            <el-input type="textarea" :rows="6" v-model.trim="form7.aac042" placeholder="请输入技能描述"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit7" :loading="loading7" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formSkill')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <div class="card-tit">
      <span class="item active"><i class="xffont font-yonghu"></i>自我介绍</span>
      <el-button title="添加" icon="el-icon-edit" size="mini" circle @click="toggle('formDesc')"></el-button>
    </div>
    <div class="container">
      <transition name="el-fade-in" mode="out-in" @enter="handleEnter('formDesc')">
        <div v-if="!formDesc" key="skill" class="skill-box">
          <el-button icon="el-icon-delete" size="mini" circle @click="delDesc('desc')" title="删除" class="skill-del" v-if="info1.aac041"></el-button>
          <p class="no-data" v-if="!info1.aac041"><i class="el-icon-info"></i>您还没有填写自我介绍</p>
          <p class="skill">{{info1.aac041}}</p>
        </div>
        <!--自我介绍表单-->
        <el-form ref="formDesc" :model="form8" :rules="rules8" class="formSkill" label-width="100px" key="formDesc" v-if="formDesc">
          <el-form-item prop="aac041" label="自我介绍">
            <el-input type="textarea" :rows="6" v-model.trim="form8.aac041" placeholder="请输入自我介绍"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit8" :loading="loading8" size="mini">确定</el-button>
            <el-button type="default" @click="toggle('formDesc')" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </div>
    <el-dialog
      title="选择院校"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="500px">
      <div style="white-space: nowrap;">
        <el-select v-model="formSchool.province" filterable placeholder="请选择省份" style="width: 35%;">
          <el-option v-for="item in dictionaries.tab_university_city" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
        <el-select v-model="formSchool.school" filterable placeholder="请输入搜索院校" style="width: 63%;" remote :remote-method="getSchoolList" :loading="remoteLoading">
          <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmSchool">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {echo, reg} from '../../../../common/js/utils'
import {FILE_URL} from '../../../../common/js/config'
import event from '../../../../common/js/event'
import XfCascader from '../../../../components/xf-cascader/xf-cascader.vue'

export default {
  components: {XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries',
      'personalInfo'
    ])
  },
  data() {
    let _this = this
    return {
      fileList: [],
      baseUrl: FILE_URL,
      uploadForm: {
        picSize: 2048,
        remark: 170,
        _token: this.$userInfo.token,
        ccmu17: this.$userInfo.ccmu17,
        userId: this.$userInfo.ccmu17 === 1 ? this.$userInfo.aac001 : this.$userInfo.aab001,
        ccmu01: this.$userInfo.ccmu01
      },
      dialogVisible: false,
      formBase: false,
      form1: { // 基本信息
        aac002: '', // 身份证号
        aac003: '', // 姓名
        aae005: '', // 手机号码
        aae015: '', // 邮箱
        aac181: '', // 毕业时间
        aac004: '', // 性别
        aac004name: '',
        age: '', // 年龄
        aac005: '', // 民族
        aac005name: '',
        aac006: '', // 出生日期
        aac024: '', // 政治面貌
        aab301: '', // 居住地
        // aac041: '', // 个人介绍
        // aac042: '', // 技能描述
        aab305: '', // 户籍地址
        aab305name: '',
        acc01g: '', // 专业
        aac040: '', // 专业（文字）
        aac011: '', // 学历
        aac011name: '',
        aac034: '', // 身高
        aac035: '', // 体重
        aac180: '', // 毕业院校（code）
        aac180name: '',
        aac017: '', // 婚姻状况
        aac017name: '',
        aac00a: '', // 军人证号
        aac009: '', // 户口性质
        aac025: '', // 籍贯
        aac033: '', // 健康状况
        aae007: '' // 邮编
      },
      info1: {},
      rules1: {
        aac003: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }, {
          max: 10,
          message: '最多10个字符',
          trigger: 'blur'
        }],
        aac002: [{
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的身份证号'))
            }
          },
          trigger: 'blur'
        }, {
          // 根据身份证号读取生日，性别
          validator(rule, value, callback) {
            if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(_this.form1.aac002)) {
              _this.$post('/service/business/person/personInfo/getInfoByCard', {
                cardNo: _this.form1.aac002,
                aac001: _this.$userInfo.aac001
              }, false).then(res => {
                if (res.error && res.error.result === 0) {
                  callback(new Error(res.error.message))
                } else {
                  callback()
                  _this.form1.aac006 || (_this.form1.aac006 = res.result.birthday || '')
                  _this.form1.aac004 || (_this.form1.aac004 = res.result.sexCode || '')
                  _this.form1.age || (_this.form1.age = res.result.age || '')
                }
              })
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        aac006: [{
          required: true,
          message: '请选择出生日期',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (!value) {
              callback()
              return
            }
            let date = new Date(value.replace(/-/g, '/'))
            let now = new Date()
            if (date.getFullYear() > now.getFullYear() - 120 && date.getTime() < now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000) {
              callback()
            } else {
              callback(new Error('只有大于18岁，小于120岁才能报名'))
            }
          }
        }],
        aae005: [{
          required: true,
          message: '请输入您的手机号',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的手机号'))
            }
          }
        }],
        age: [{
          required: true,
          message: '请输入年龄',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/^[1-9][0-9]{0,1}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入小于99的整数'))
            }
          },
          trigger: 'blur'
        }],
        aac004: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        aac005: [{
          required: true,
          message: '请选择民族',
          trigger: 'change'
        }],
        aac011: [{
          required: true,
          message: '请选择学历',
          trigger: 'change'
        }],
        aac024: [{
          required: true,
          message: '请选择政治面貌',
          trigger: 'change'
        }],
        aac017: [{
          required: true,
          message: '请选择婚姻状况',
          trigger: 'change'
        }],
        aab305: [{
          required: true,
          message: '请选择户籍地址',
          trigger: 'change'
        }],
        aab301: [{
          required: true,
          message: '请输入现居住地址',
          trigger: 'blur'
        }, {
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }],
        aac040: [{
          required: false,
          message: '请输入专业名称',
          trigger: 'blur'
        }, {
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }],
        aae015: [{
          validator(rule, value, callback) {
            if (reg.email(value)) {
              callback()
            } else {
              callback(new Error('请输入正确格式的邮箱'))
            }
          },
          trigger: 'blur'
        }],
        aac00a: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }],
        aac009: [{
          required: true,
          message: '请选择户口性质',
          trigger: 'blur'
        }],
        aac025: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }],
        aae007: [{
          validator(rule, value, callback) {
            if (value === '') {
              callback()
              return
            }
            if (/^[0-9]\d{5}$/.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确格式的邮编'))
            }
          },
          trigger: 'blur'
        }]
      },
      // 求职意向
      form2: {
        bca111: '', // 期望岗位code
        bca112: '', // 期望岗位
        bcaa11: '', // 第二期望岗位
        bcaa12: '', // 第二期望岗位
        bcab11: '', // 第三期望岗位
        bcab12: '', // 第三期望岗位
        bcb202: '', // 期望地点
        acb202: '', // 期望地点code
        bcb203: '', // 第二期望地点
        acb203: '', // 第二期望地点code
        bcb204: '', // 第三期望地点
        acb204: '', // 第三期望地点code
        acc034: '', // 期望月薪
        aac013: '', // 求职性质
        acc214: [], // 福利待遇
        acb228: '', // 食宿要求
        aab019: '', // 单位性质
        aab020: '', // 经济类型
        aac007: '' // 参加工作时间
      },
      info2: {},
      rules2: {
        bca111: [{
          required: true,
          message: '请选择期望岗位',
          trigger: 'blur'
        }],
        acb202: [{
          required: true,
          message: '请选择期望工作地点',
          trigger: 'blur'
        }],
        acc034: [{
          required: true,
          message: '请选择期望月薪',
          trigger: 'change'
        }],
        aac013: [{
          required: true,
          message: '请选择求职性质',
          trigger: 'change'
        }]
      },
      formIntention: false,
      // 教育经历
      form3: {
        aae030: '', // 开始时间
        aac046: '', // 结束时间
        aac045: '', // 学校名称
        acc01g: '', // 专业名称
        atc011: '', // 学历
        aae013: '' // 备注
      },
      rules3: {
        aae030: [{
          required: true,
          message: '请选择开始日期',
          trigger: 'change'
        }],
        aac046: [{
          required: true,
          message: '请选择结束日期',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (!_this.form3.aae030 || !value) {
              callback()
              return
            }
            let begin = new Date(_this.form3.aae030.replace(/-/g, '/')).getTime()
            let end = new Date(value.replace(/-/g, '/')).getTime()
            if (begin < end) {
              callback()
            } else {
              callback(new Error('结束时间需要大于开始时间'))
            }
          },
          trigger: 'blur'
        }],
        aac045: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        acc01g: [{
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        atc011: [{
          required: true,
          message: '请选择学历',
          trigger: 'change'
        }],
        aae013: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }]
      },
      educationList: [],
      formEducation: false,
      // 工作经历
      form4: {
        aae030: '', // 开始时间
        aae031: '', // 结束时间
        aac045: '', // 公司名称
        aac0b3: '', // 岗位名称
        aac0b4: '', // 岗位描述
        aae013: '' // 备注
      },
      rules4: {
        aae030: [{
          required: true,
          message: '请选择开始日期',
          trigger: 'change'
        }],
        aae031: [{
          required: true,
          message: '请选择结束日期',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (!_this.form4.aae030 || !value) {
              callback()
              return
            }
            let begin = new Date(_this.form4.aae030.replace(/-/g, '/')).getTime()
            let end = new Date(value.replace(/-/g, '/')).getTime()
            if (begin < end) {
              callback()
            } else {
              callback(new Error('结束时间需要大于开始时间'))
            }
          },
          trigger: 'blur'
        }],
        aac045: [{
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        }, {
          max: 25,
          message: '最多25个字符',
          trigger: 'blur'
        }],
        aac0b3: [{
          required: true,
          message: '请输入岗位名称',
          trigger: 'blur'
        }, {
          max: 25,
          message: '最多25个字符',
          trigger: 'blur'
        }],
        aac0b4: [{
          required: true,
          message: '请输入岗位描述',
          trigger: 'blur'
        }, {
          max: 200,
          message: '最多200个字符',
          trigger: 'blur'
        }],
        aae013: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'blur'
        }]
      },
      formWork: false,
      worksList: [],
      // 证书
      form5: {
        bac0c2: '', // 证书名称
        cczy06: '', // 证书类别
        aac0c3: '', // 证书编号
        aae013: '', // 证书备注
        aac0c4: '', // 证书获得时间
        aac0c5: '' // 证书图片路径
      },
      rules5: {
        bac0c2: [{
          required: true,
          message: '请输入证书名称',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        cczy06: [{
          required: true,
          message: '请选择证书类别',
          trigger: 'change'
        }],
        aac0c3: [{
          max: 25,
          message: '最多25个字符',
          trigger: 'blur'
        }],
        aae013: [{
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        aac0c4: [{
          required: true,
          message: '请选择证书获得时间',
          trigger: 'change'
        }]
      },
      certList: [],
      certForm: false,
      // 培训经历
      form6: {
        agencyname: '', // 机构名称
        starttime: '', // 开始时间
        endtime: '', // 结束时间
        traindesc: '' // 培训详情
      },
      rules6: {
        agencyname: [{
          required: true,
          message: '请输入机构名称',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        starttime: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
        endtime: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'change'
        }, {
          validator(rule, value, callback) {
            if (!_this.form6.starttime || !value) {
              callback()
              return
            }
            let begin = new Date(_this.form6.starttime.replace(/-/g, '/')).getTime()
            let end = new Date(value.replace(/-/g, '/')).getTime()
            if (end > new Date().getTime()) {
              callback(new Error('结束时间不能大于当前时间'))
              return
            }
            if (begin < end) {
              callback()
            } else {
              callback(new Error('结束时间需要大于开始时间'))
            }
          },
          trigger: 'blur'
        }],
        traindesc: [{
          required: true,
          message: '请输入培训详情',
          trigger: 'blur'
        }, {
          max: 200,
          message: '最多200个字符',
          trigger: 'blur'
        }]
      },
      trainList: [],
      formTrain: false,
      // 技能描述
      form7: {
        aac042: ''
      },
      rules7: {
        aac042: [{
          required: true,
          message: '请输入技能描述',
          trigger: 'blur'
        }, {
          max: 150,
          message: '最多150个字符',
          trigger: 'blur'
        }]
      },
      formSkill: false,
      // 自我介绍
      form8: {
        aac041: ''
      },
      rules8: {
        aac041: [{
          required: true,
          message: '请输入自我介绍',
          trigger: 'blur'
        }, {
          max: 150,
          message: '最多150个字符',
          trigger: 'blur'
        }]
      },
      formDesc: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false,
      formSchool: {
        province: '',
        school: ''
      },
      schoolList: [],
      remoteLoading: false,
      addressList: [],
      addressLoading: false,
      secret: false,
      pickerOptions: {
        disabledDate(date) {
          let now = new Date()
          return !(date.getFullYear() > now.getFullYear() - 120 && date.getTime() < now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000)
        }
      },
      pickerOptions2: {
        disabledDate(date) {
          let now = new Date()
          return date.getTime() > now.getTime()
        }
      }
    }
  },
  methods: {
    toggle(name) {
      this[name] = !this[name]
      if (name === 'formEducation') {
        echo(this.form3)
        this.aac0d0 = ''
      }
      if (name === 'formWork') {
        echo(this.form4)
        this.aac0b0 = ''
      }
      if (name === 'certForm') {
        this.aac0c1 = ''
        this.fileList = []
        echo(this.form5)
      }
      if (name === 'formTrain') {
        echo(this.form6)
        this.trainId = ''
      }
      if (name === 'formSkill') {
        echo(this.form7, this.info1)
      }
      if (name === 'formDesc') {
        echo(this.form8, this.info1)
      }
    },
    handleEnter(name) {
      if (this[name]) {
        this.$refs[name].clearValidate()
      }
    },
    // 基本信息提交
    onSubmit1() {
      this.$refs.formBase.validate(valid => {
        if (valid) {
          this.loading1 = true
          const form = Object.assign({
            ccmu01: this.$userInfo.ccmu01,
            aac001: this.$userInfo.aac001
          }, this.form1)
          this.$post('/service/business/person/personInfo/personSave.xf', form).then(res => {
            this.loading1 = false
            if (res.result.result === 1) {
              this.formBase = false
              this.$message({
                message: res.result.message,
                type: 'success'
              })
              this.getBase()
              event.$emit('refresh')
            }
          }).catch(() => {
            this.loading1 = false
          })
        }
      })
    },
    // 求职意向提交
    onSubmit2() {
      this.$refs.formIntention.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aac001: this.$userInfo.aac001,
            ccmu01: this.$userInfo.ccmu01
          }, this.form2)
          form.acc214 = form.acc214.join(',')
          this.loading2 = true
          this.$post('/service/business/search/stuApplyJob/jobIntentionSave.xf', form).then(res => {
            this.loading2 = false
            if (res.error.result === 1) {
              this.formIntention = false
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.getBase()
            }
          }).catch(() => {
            this.loading2 = false
          })
        }
      })
    },
    onSubmit3() {
      this.$refs.formEducation.validate(valid => {
        if (valid) {
          this.loading3 = true
          const form = Object.assign({
            aac001: this.$userInfo.aac001,
            aac0d0: this.aac0d0
          }, this.form3)
          this.$post('/service/business/person/stuEducation/educationSave', form).then(res => {
            this.loading3 = false
            if (res.error.result === 1) {
              this.formEducation = false
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.getBase()
            }
          }).catch(() => {
            this.loading3 = false
          })
        }
      })
    },
    editEducation(val) {
      this.aac0d0 = val.aac0d0
      this.formEducation = true
      const loading = this.$loading({ fullscreen: true })
      this.$post('/service/business/person/stuEducation/educationEdit.xf', {
        aac001: this.$userInfo.aac001,
        aac0d0: val.aac0d0
      }).then(res => {
        loading.close()
        if (!res.result.length) return
        echo(this.form3, res.result[0])
      }).catch(() => {
        loading.close()
      })
    },
    delEducation(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$post('/service/business/person/stuEducation/educationDel.xf', {
          aac001: this.$userInfo.aac001,
          aac0d0: val.aac0d0
        })
      }).then(res => {
        if (res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getBase()
        }
      })
    },
    onSubmit4() {
      this.$refs.formWork.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aac001: this.$userInfo.aac001,
            aac0b0: this.aac0b0
          }, this.form4)
          this.loading4 = true
          this.$post('/service/business/person/stuWorkExperience/workExperienceSave.xf', form).then(res => {
            this.loading4 = false
            if (res.error.result === 1) {
              this.formWork = false
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.getBase()
            }
          }).catch(() => {
            this.loading4 = false
          })
        }
      })
    },
    editWork(val) {
      this.aac0b0 = val.aac0b0
      const loading = this.$loading({ fullscreen: true })
      this.$post('/service/business/person/stuWorkExperience/workExperienceEdit.xf', {
        aac0b0: val.aac0b0,
        aac001: this.$userInfo.aac001
      }).then(res => {
        loading.close()
        if (!res.result.length) return
        echo(this.form4, res.result[0])
        this.formWork = true
      }).catch(() => {
        loading.close()
      })
    },
    delWork(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$post('/service/business/person/stuWorkExperience/workExperienceDel.xf', {
          aac001: this.$userInfo.aac001,
          aac0b0: val.aac0b0
        })
      }).then(res => {
        if (res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getBase()
        }
      })
    },
    // 证书
    onSubmit5() {
      this.$refs.certForm.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aac001: this.$userInfo.aac001,
            aac0c1: this.aac0c1
          }, this.form5)
          this.loading5 = true
          this.$post('/service/business/person/stuSkill/saveOrUpdate', form).then(res => {
            this.loading5 = false
            if (res.error.result === 1) {
              this.certForm = false
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.getCert()
            }
          }).catch(() => {
            this.loading5 = false
          })
        }
      })
    },
    editCert(val) {
      this.aac0c1 = val.aac0c1
      this.certForm = true
      const loading = this.$loading({ fullscreen: true })
      this.$post('/service/business/person/stuSkill/listJson', {
        aac0c1: val.aac0c1,
        aac001: this.$userInfo.aac001
      }).then(res => {
        loading.close()
        if (!res.result.length) return
        echo(this.form5, res.result[0])
        if (res.result[0].aac0c5) {
          this.fileList = [{url: res.result[0].aac0c5}]
        }
      }).catch(() => {
        loading.close()
      })
    },
    delCert(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$post('/service/business/person/stuSkill/del', {aac0c1: val.aac0c1})
      }).then(res => {
        if (res.error.result === 1) {
          this.formTrain = false
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getCert()
        }
      })
    },
    getCert() {
      this.$post('/service/business/person/stuSkill/listJson', {
        aac001: this.$userInfo.aac001
      }).then(res => {
        this.certList = res.result
      })
    },
    // 培训经历
    onSubmit6() {
      this.$refs.formTrain.validate(valid => {
        if (valid) {
          this.loading6 = true
          const form = Object.assign({
            id: this.trainId,
            aac001: this.$userInfo.aac001
          }, this.form6)
          this.$post('/service/business/person/train/saveTrainInfo', form).then(res => {
            this.loading6 = false
            if (res.error.result === 1) {
              this.formTrain = false
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.getTrainList()
            }
          }).catch(() => {
            this.loading6 = false
          })
        }
      })
    },
    editTrain(val) {
      this.trainId = val.id
      this.formTrain = true
      const loading = this.$loading({ fullscreen: true })
      this.$post('/service/business/person/train/getTrainInfo', {
        aac001: this.$userInfo.aac001,
        trainId: val.id
      }).then(res => {
        loading.close()
        echo(this.form6, res.result)
      }).catch(() => {
        loading.close()
      })
    },
    delTrain(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$post('/service/business/person/train/delTrainInfo', {
          aac001: this.$userInfo.aac001,
          trainId: val.id
        })
      }).then(res => {
        if (res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getTrainList()
        }
      })
    },
    getTrainList() {
      this.$post('/service/business/person/train/getTrainList', {
        rowsNum: 100,
        currentPage: 1,
        aac001: this.$userInfo.aac001
      }).then(res => {
        this.trainList = res.result
      })
    },
    onSubmit7() {
      this.$refs.formSkill.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aac001: this.$userInfo.aac001
          }, this.form7)
          form.aac042 = encodeURIComponent(form.aac042)
          this.loading7 = true
          this.$post('/service/business/person/stuSkill/skillDescSave.xf', form).then(res => {
            this.loading7 = false
            if (res.result.result === 1) {
              this.formSkill = false
              this.$message({
                message: res.result.message,
                type: 'success'
              })
              this.getBase()
            }
          }).catch(() => {
            this.loading7 = false
          })
        }
      })
    },
    onSubmit8() {
      this.$refs.formDesc.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aac001: this.$userInfo.aac001
          }, this.form8)
          form.aac041 = encodeURIComponent(form.aac041)
          this.loading8 = true
          this.$post('/service/business/person/stuSkill/skillDescSave.xf', form).then(res => {
            this.loading8 = false
            if (res.result.result === 1) {
              this.formDesc = false
              this.$message({
                message: res.result.message,
                type: 'success'
              })
              this.getBase()
            }
          }).catch(() => {
            this.loading8 = false
          })
        }
      })
    },
    // 删除技能描述/自我介绍
    delDesc(type) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const form = {
          aac001: this.$userInfo.aac001,
          aac041: 'a',
          aac042: 'a'
        }
        if (type === 'desc') {
          form.aac041 = ''
        } else {
          form.aac042 = ''
        }
        const loading = this.$loading({ fullscreen: true })
        this.$post('/service/business/person/stuSkill/skillDel', form).then(res => {
          loading.close()
          if (res.result.result === 1) {
            this.$message({
              message: res.result.message,
              type: 'success'
            })
            this.getBase()
          }
        }).catch(() => {
          loading.close()
        })
      })
    },
    getBase() {
      this.$post('/service/business/person/resumeInfo/getResumeIndex.xf', {
        aac001: this.$userInfo.aac001
      }).then(res => {
        echo(this.form1, res.result.personInfo)
        echo(this.form7, res.result.personInfo)
        echo(this.form8, res.result.personInfo)
        this.info1 = res.result.personInfo
        res.result.jobIntention || (res.result.jobIntention = {})
        res.result.jobIntention.acc214 = res.result.jobIntention.acc214 ? res.result.jobIntention.acc214.split(',') : []
        echo(this.form2, res.result.jobIntention)
        this.info2 = res.result.jobIntention
        this.educationList = res.result.educationList || []
        this.worksList = res.result.worksList || []
      })
    },
    showSchool() {
      this.dialogVisible = true
    },
    confirmSchool() {
      this.dialogVisible = false
      this.form1.aac180 = this.formSchool.school
      let index = this.schoolList.findIndex(item => item.id === this.form1.aac180)
      this.form1.aac180name = this.schoolList[index].name
    },
    // 根据省份变化获取学校列表
    getSchoolList(query) {
      if (query === '') return
      this.remoteLoading = true
      this.$post('/service/sys/config/config/getCityList', {
        code: this.formSchool.province,
        keyword: query
      }).then(res => {
        this.remoteLoading = false
        this.schoolList = res.result
      }).catch(() => {
        this.remoteLoading = false
      })
    },
    // 根据关键字搜索户籍地址
    remoteAddress(cityname) {
      this.addressLoading = true
      this.$post('/service/business/graduation/graduation/listCity', {cityname}).then(res => {
        this.addressList = res.result
        this.addressLoading = false
      }).catch(() => {
        this.addressLoading = false
      })
    },
    handleSecret(acb208) {
      if (!this.info2.acc200) return
      this.$post('/service/business/search/stuApplyJob/resumeOpenSecrecy.xf', {
        acc200: this.info2.acc200,
        acb208 // 1保密，0公开
      }).then(res => {
        if (res.result && res.result.result === 1) {
          setTimeout(() => {
            event.$emit('refresh')
          }, 500)
        }
      })
    },
    // 证书上传
    onSuccess(res, file) {
      if (res.error && res.error.result === 1) {
        this.form5.aac0c5 = res.result[0]
      } else {
        this.fileList = []
      }
    },
    onRemove() {
      this.form5.aac0c5 = ''
    }
  },
  created() {
    this.getBase()
    this.getCert()
    this.getTrainList()
    this.secret = this.personalInfo.resumeState === 1
    this.$watch('personalInfo', newVal => {
      this.secret = newVal.resumeState === 1
    })
    this.$watch('secret', newVal => {
      setTimeout(() => {
        this.handleSecret(newVal ? 1 : 0)
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .resume{
    padding: 20px 20px;
  }
  .base-form{
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      width: 49%;
    }
    .el-input,.el-select,.el-cascader{
      width: 210px;
    }
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
      .el-icon-edit{
        margin-right: 0;
      }
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
    margin: 10px 0 0 0;
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
  .work-item{
    padding: 10px 0;
    position: relative;
    .item-edit{
      width: 80px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:not(:last-child){
      border-bottom: 1px dashed #d9d9d9;
    }
  }
  .formSkill{
    padding: 10px 0 0 0;
    width: 500px;
  }
  .skill{
    white-space: pre-wrap;
    word-break: break-all;
    max-width: 850px;
    font-size: 14px;
  }
  .no-data{
    color: #666;
    font-size: 14px;
    padding: 20px 0;
    i{
      margin: 0 8px 0 0;
    }
  }
  .skill-box{
    position: relative;
    .skill-del{
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .max-text{
    display: inline-block;
    max-width: 700px;
    word-break: break-all;
    white-space: pre-wrap;
  }
  .fix-width{
    display: inline-block;
    max-width: 330px;
    word-break: break-all;
  }
</style>
