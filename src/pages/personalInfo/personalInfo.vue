<template>
  <div>
    <xf-header></xf-header>
    <div class="resume">
      <div class="resume-con">
        <div class="left">
          <div class="person-info">
            <div class="img">
              <img :src="info1.ccmu15">
            </div>
            <p class="left-name">{{info1.aac003 || '--'}}</p>
            <div class="btn-box">
              <el-button type="primary" v-if="ccmu17 !== 1" @click="invite" :disabled="Number(is_Resume) > 0" :title="Number(is_Resume) > 0 ? '已邀请' : '面试邀请'">面试邀请</el-button>
            </div>
            <div class="btn-box">
              <el-button type="warning" @click="download">下载简历</el-button>
            </div>
          </div>
          <div class="pics-box" v-if="pics.length">
            <div class="card-tit">
              <span class="item active"><i class="xffont font-jianli-copy"></i>个人风采</span>
            </div>
            <div class="pics-item" v-for="val in pics" :key="val.caoa01">
              <img :src="val.caoa02" :title="val.caoa03" v-img="val.caoa02">
              <p :title="val.caoa03">{{val.caoa03}}</p>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="card-tit">
            <span class="item active"><i class="xffont font-jianli-copy"></i>基本信息</span>
            <i class="collect" :class="Number(is_Collection) > 0 ? 'el-icon-star-on' : 'el-icon-star-off'" :title="Number(is_Collection) > 0 ? '已收藏' : '收藏'" @click="handleCollect" v-if="ccmu17 !== 1"></i>
          </div>
          <div class="container">
            <transition name="el-fade-in" mode="out-in">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span class="fix-width">{{info1.aac003 || '--'}}</span>
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
                  <span class="fix-width">{{info1.aac011 || '--'}}</span>
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
                  <span class="fix-width">--</span>
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
                <el-form-item label="现居住地">
                  <span class="fix-width">{{info1.aab301 || '--'}}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span class="fix-width">{{info1.aae015 || '--'}}</span>
                </el-form-item>
              </el-form>
            </transition>
          </div>
          <div class="card-tit">
            <span class="item active"><i class="xffont font-qiuzhiyixiang"></i>求职意向</span>
          </div>
          <div class="container">
            <transition name="el-fade-in" mode="out-in">
              <el-form ref="form" class="demo-table">
                <el-form-item label="意向岗位">
                  <span>{{info2.bca112 || '--'}}</span>
                </el-form-item>
                <el-form-item label="期望工作地区">
                  <span>{{info2.bcb202 || '--'}}</span>
                </el-form-item>
                <el-form-item label="期望薪资">
                  <span>{{info2.acc034Name || '--'}}</span>
                </el-form-item>
                <el-form-item label="期望工作性质">
                  <span>{{info2.aac013Name || '--'}}</span>
                </el-form-item>
              </el-form>
            </transition>
          </div>
          <div class="card-tit" v-if="educationList.length">
            <span class="item active"><i class="xffont font-xueshimao"></i>教育经历</span>
          </div>
          <div class="container" v-if="educationList.length">
            <transition name="el-fade-in" mode="out-in">
              <el-table
                :data="educationList"
                stripe
                style="width: 100%">
                <el-table-column
                  label="时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.aae030}} -- {{scope.row.aac046}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="学校">
                  <template slot-scope="scope">
                    <span>{{scope.row.aac045 || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="专业">
                  <template slot-scope="scope">
                    <span>{{scope.row.acc01g || '--'}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="学历">
                  <template slot-scope="scope">
                    <span>{{scope.row.atc011 || '--'}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </transition>
          </div>
          <div class="card-tit" v-if="worksList.length">
            <span class="item active"><i class="xffont font-iconzhiwei"></i>工作经历</span>
          </div>
          <div class="container" v-if="worksList.length">
            <transition name="el-fade-in" mode="out-in">
              <div>
                <p class="no-data" v-if="!worksList.length"><i class="el-icon-info"></i>--</p>
                <el-form class="demo-table work-item" v-for="val in worksList" :key="val.aac0b0">
                  <el-form-item label="起止时间">
                    <span>{{val.aae030}} -- {{val.aae031}}</span>
                  </el-form-item>
                  <el-form-item label="公司名称">
                    <span>{{val.aac045 || '--'}}</span>
                  </el-form-item>
                  <el-form-item label="岗位名称">
                    <span>{{val.aac0b3 || '--'}}</span>
                  </el-form-item>
                  <el-form-item label="岗位描述">
                    <span class="max-text">{{val.aac0b4 || '--'}}</span>
                  </el-form-item>
                </el-form>
              </div>
            </transition>
          </div>
          <div class="card-tit" v-if="certList.length">
            <span class="item active"><i class="el-icon-document"></i>技能证书</span>
          </div>
          <div class="container" v-if="certList.length">
            <transition name="el-fade-in" mode="out-in">
              <div class="cert-list">
                <el-table
                  :data="certList"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    label="证书名称">
                    <template slot-scope="scope">
                      <span>{{scope.row.bac0c2}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证书类别">
                    <template slot-scope="scope">
                      <span>{{scope.row.cczy06Str}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证书编号">
                    <template slot-scope="scope">
                      <span>{{scope.row.aac0c3 || '--'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注">
                    <template slot-scope="scope">
                      <span>{{scope.row.aae013 || '--'}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </transition>
          </div>
          <div class="card-tit" v-if="trainList.length">
            <span class="item active"><i class="el-icon-tickets"></i>培训经历</span>
          </div>
          <div class="container" v-if="trainList.length">
            <transition name="el-fade-in" mode="out-in">
              <div>
                <p class="no-data" v-if="!trainList.length"><i class="el-icon-info"></i>--</p>
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
                </el-form>
              </div>
            </transition>
          </div>
          <div class="card-tit" v-if="info1.aac042">
            <span class="item active"><i class="xffont font-admin"></i>技能描述</span>
          </div>
          <div class="container" v-if="info1.aac042">
            <transition name="el-fade-in" mode="out-in">
              <div class="skill-box">
                <p class="no-data" v-if="!info1.aac042"><i class="el-icon-info"></i>--</p>
                <p class="skill">{{info1.aac042}}</p>
              </div>
            </transition>
          </div>
          <div class="card-tit" v-if="info1.aac041">
            <span class="item active"><i class="xffont font-yonghu"></i>自我介绍</span>
          </div>
          <div class="container" v-if="info1.aac041">
            <transition name="el-fade-in" mode="out-in">
              <div class="skill-box">
                <p class="no-data" v-if="!info1.aac041"><i class="el-icon-info"></i>--</p>
                <p class="skill">{{info1.aac041}}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <xf-invitation ref="invite"></xf-invitation>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import {queryParse, renderTitle} from '../../common/js/utils'
import {BASE_URL} from '../../common/js/config'
import event from '../../common/js/event'
import XfInvitation from '../../components/xf-invitation/xf-invitation.vue'

export default {
  components: {
    XfInvitation,
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      info1: {},
      info2: {},
      educationList: [],
      worksList: [],
      trainList: [],
      certList: [],
      aac001: '',
      ccmu17: this.$userInfo.ccmu17,
      is_Resume: 0,
      is_Collection: 0,
      pics: []
    }
  },
  methods: {
    getBase() {
      this.$post('/service/business/person/resumeInfo/getRCResumeIndex.xf', {
        aac001: this.aac001,
        ccmu01: this.$userInfo.ccmu17 === 2 ? this.$userInfo.ccmu01 : ''
      }).then(res => {
        this.is_Collection = res.result.is_Collection
        this.is_Resume = res.result.is_Resume
        this.info1 = res.result.personInfo
        res.result.jobIntention || (res.result.jobIntention = {})
        this.info2 = res.result.jobIntention
        this.educationList = res.result.educationList || []
        this.worksList = res.result.worksList || []
        renderTitle((this.info1.aac003 || '--') + '的简历')
      })
    },
    getTrainList() {
      this.$post('/service/business/person/train/getRCTrainList', {
        rowsNum: 100,
        currentPage: 1,
        aac001: this.aac001
      }).then(res => {
        this.trainList = res.result
      })
    },
    getCert() {
      this.$post('/service/business/person/stuSkill/getRCStuSkillList', {
        aac001: this.aac001
      }).then(res => {
        this.certList = res.result
      })
    },
    download() {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 === 1) {
        this.$post('/service/business/person/resumeInfo/checkResumeInfo.xf', {
          aac001: this.aac001
        }).then(res => {
          if (res.result && res.result.result === 1) {
            location.href = BASE_URL + '/service/business/person/resumeInfo/excWord.xf?aac001=' + this.aac001 + '&userId=' + this.$userInfo.aac001 + '&ccmu17=1' + '&_token=' + this.$userInfo.token
          }
        })
      }
      if (this.$userInfo.ccmu17 === 2) {
        this.$post('/service/business/corp/corps/getDownLoadResumeCount.xf', {
          aab001: this.$userInfo.aab001
        }).then(res => {
          if (res.result > 0) {
            this.$post('/service/business/person/resumeInfo/checkResumeInfo.xf', {
              aac001: this.aac001
            }).then(res => {
              if (res.result && res.result.result === 1) {
                location.href = (BASE_URL + '/service/business/person/resumeInfo/excWord.xf?aac001=' + this.aac001 + '&ccmu01=' + this.$userInfo.ccmu01 + '&userId=' + this.$userInfo.aab001 + '&ccmu17=2' + '&_token=' + this.$userInfo.token)
              }
            })
          } else {
            this.$message({
              message: '下载次数超过限制，如有疑问请联系管理员',
              type: 'warning'
            })
          }
        })
      }
      if (this.$userInfo.status !== 1) {
        this.$message({
          message: '请先登录后进行更多操作',
          type: 'warning'
        })
      }
    },
    invite() {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      this.$refs.invite.show(this.aac001).then(() => {
        this.getBase()
      })
    },
    handleCollect() {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (Number(this.is_Collection) > 0) {
        this.del()
      } else {
        this.collect()
      }
    },
    collect() {
      this.$post('/service/business/corpResume/corpTalentCollection/corpTalentSave.xf', {
        aac001: this.aac001,
        aab001: this.$userInfo.aab001
      }).then(res => {
        if (res.result && res.result.result === 1) {
          this.$message({
            message: res.result.message,
            type: 'success'
          })
          this.getBase()
        }
      })
    },
    del() {
      this.$post('/service/business/corpResume/corpTalentCollection/delTalent', {
        aac001: this.aac001,
        aab001: this.$userInfo.aab001
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getBase()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getPics() {
      this.$post('/service/business/authen/authen/corpPic', {
        aac001: this.aac001,
        flag: 2
      }).then(res => {
        this.pics = res.result
      })
    }
  },
  mounted() {
    const search = queryParse(location.search)
    this.aac001 = search.aac001
    this.getBase()
    this.getTrainList()
    this.getCert()
    this.getPics()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .resume{
    min-height: 650px;
    padding: 30px 0;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .demo-table{
    label{
      color: #99a9bf;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
  .resume-con{
    width: 1200px;
    margin: 0 auto;
    @include clearFixed;
    .left{
      .person-info{
        background: #fff;
        border-radius: 5px;
        padding: 20px 20px;
      }
      width: 280px;
      float: left;
      .img{
        width: 100px;
        margin: 0 auto;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .left-name{
        font-size: 14px;
        color: $--color-primary;
        padding: 10px 0;
        text-align: center;
      }
      .pics-box{
        margin: 20px 0 0 0;
        background: #fff;
        border-radius: 5px;
        padding: 10px 20px 20px 20px;
        .pics-item{
          width: 100%;
          margin: 10px 0;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          border: 1px solid #ebebeb;
          img{
            width: 100%;
          }
          p{
            position: absolute;
            width: 100%;
            padding: 5px 0;
            text-align: center;
            left: 0;
            bottom: 0;
            background: rgba(0,0,0,.5);
            color: #fff;
            display: none;
            @include ellipsis;
          }
          &:hover{
            cursor: pointer;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            transform: scale(1.05);
            p{
              display: block;
            }
          }
        }
      }
    }
    .right{
      width: 900px;
      padding: 20px 20px;
      float: right;
      background: #fff;
      border-radius: 5px;
    }
  }
  .container{
    padding: 10px 20px;
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
  }
  .demo-table-expand{
    label{
      color: #99a9bf;
    }
  }
  .card-tit{
    font-size: 16px;
    border-bottom: 1px solid #ebebeb;
    .item{
      display: inline-block;
      padding: 10px 10px;
      .xffont,i{
        font-size: 18px;
        margin: 0 5px 0 0;
        vertical-align: middle;
      }
      &:hover{
        color: $--color-primary;
        cursor: pointer;
      }
      &.active,&.router-link-exact-active{
        color: $--color-primary;
        border-bottom: 2px solid $--color-primary;
        cursor: text;
      }
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
  .fix-width{
    display: inline-block;
    max-width: 330px;
    word-break: break-all;
  }
  .btn-box{
    padding: 5px 20px;
    .el-button{
      width: 100%;
    }
  }
  .collect{
    font-size: 20px;
    margin: 10px 20px 0 0;
    float: right;
    &:hover{
      cursor: pointer;
      color: #f26b01;
    }
    &.el-icon-star-on{
      color: #f26b01;
    }
  }
</style>
