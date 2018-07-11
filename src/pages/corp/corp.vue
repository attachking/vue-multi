<template>
  <div class="corp">
    <xf-header></xf-header>
    <div class="module" ref="detail">
      <div class="container">
        <div class="left">
          <div class="left-top">
            <div class="logo">
              <img :src="corpInfo.ccmu15">
            </div>
            <div class="corp-tit">
              <p>{{corpInfo.aab004 || '--'}}</p>
              <p>
                <span>{{corpInfo.aaa021 || '--'}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{{corpInfo.aab019name || '--'}}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                <span>{{corpInfo.aab056name || '--'}}</span>
              </p>
            </div>
            <div class="collect" v-if="ccmu17 !== 2">
              <i class="xffont" :class="isCollect ? 'font-shoucang1' : 'font-shoucang'" @click="collect"></i>
            </div>
          </div>
          <div class="left-middle">
            <p class="tit">单位介绍</p>
            <div class="corp-info">{{corpInfo.acb206 || '--'}}</div>
          </div>
          <div class="left-middle">
            <p class="tit">单位风采</p>
            <el-carousel :interval="8000" type="card" height="200px" class="slider">
              <el-carousel-item v-for="val in corpPic" :key="val.caoa01">
                <img :src="val.caoa02" :title="val.caoa03" v-img="val.caoa02">
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="left-bottom">
            <p class="position-tit">
              <span>该单位招聘岗位</span>
              <span>
                <a href="javascript:;" @click="pre">&lt;</a>&nbsp;
                <span class="current-page">{{jobPageBean.currentPage}}</span>&nbsp;/&nbsp;<span>{{jobPageBean.totalPage}}</span>&nbsp;
                <a href="javascript:;" @click="next">&gt;</a>
              </span>
            </p>
            <div class="list" v-loading="jobLoading">
              <div class="item" v-for="val in jobList" :key="val.acb210">
                <p>
                  <a :href="'job.html?acb210=' + val.acb210" :title="val.cca113" target="_blank">{{val.cca113}}</a>
                  <span class="date">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</span>
                </p>
                <p>
                  <span>
                    <span>{{val.bcb202 || '--'}}</span>&nbsp;&nbsp;|
                    <span>{{val.acb21r || '--'}}人</span>&nbsp;&nbsp;|
                    <span>{{val.acb21iName || '--'}}</span>&nbsp;&nbsp;|
                    <span>{{val.acc218 || '--'}}</span>&nbsp;&nbsp;|
                    <span>{{val.aac012 || '--'}}</span>
                  </span>
                  <span class="salary">{{val.acc034Name}}</span>
                </p>
                <div class="job-control">
                  <i class="xffont" :class="Number(val.is_Collection) > 0 ? 'font-shoucang1' : 'font-shoucang'" @click="handleCollectJob(val)" :title="Number(val.is_Collection) > 0 ? '已收藏' : '收藏'"></i>
                  <i class="xffont font-send" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="handleResume(val)" :title="Number(val.is_Resume) > 0 ? '已投递简历' : '投递简历'"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div class="contact-tit">联系我们</div>
            <div class="contact-con">
              <p>
                <span class="label">网址：</span>
                <a :href="corpInfo.aae016" target="_blank">{{status && corpInfo.aae016 || '--'}}</a>
              </p>
              <p>
                <span class="label">电话：</span>
                <span>{{status && corpInfo.aae005 || '--'}}</span>
              </p>
              <p>
                <span class="label">邮箱：</span>
                <span>{{status && corpInfo.aae015 || '--'}}</span>
              </p>
              <p>
                <span class="label">地址：</span>
                <span>{{status && corpInfo.aae006 || '--'}}</span>
              </p>
              <div class="no-login" v-if="!status">
                <p class="no-login-text">企业联系方式<el-button type="text" @click="login">登录</el-button>后可见</p>
              </div>
            </div>
          </div>
          <div class="right-middle" v-if="false">
            <img src="./static/qrcode.png">
            <p>扫描二维码在手机查看单位详情</p>
          </div>
          <div class="right-bottom">
            <div class="recommend-tit">热门单位</div>
            <div class="list">
              <div class="item" v-for="val in corpList" :key="val.aab001">
                <div class="pos-logo">
                  <img :src="val.ccmu15">
                </div>
                <div class="recommend-info">
                  <a :href="'corp.html?aab001=' + val.aab001" :title="val.aab004">{{val.aab004 || '--'}}</a>
                  <span>{{val.aab056name || '--'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import {queryParse, renderTitle} from '../../common/js/utils'
import event from '../../common/js/event'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      val: {},
      corpInfo: {},
      corpPic: [],
      isCollect: false,
      aab001: '',
      loading: false,
      ccmu17: this.$userInfo.ccmu17,
      corpList: [],
      corpPageBean: {},
      jobLoading: false,
      jobList: [],
      jobSearch: {
        aab001: '',
        rowsNum: 8,
        currentPage: 1,
        aac001: this.$userInfo.aac001
      },
      jobPageBean: {},
      status: this.$userInfo.status
    }
  },
  methods: {
    login() {
      event.$emit('login')
    },
    getDetail(aab001) {
      this.$post('/service/business/corp/corps/getCorpDetail.xf', {
        aab001,
        aac001: this.$userInfo.aac001
      }).then(res => {
        this.corpInfo = res.result.corpInfo
        this.corpPic = res.result.corpPic
        renderTitle(res.result.corpInfo.aab004)
      })
    },
    collect() {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.isCollect) {
        this.delCorp()
      } else {
        this.saveCorp()
      }
    },
    getState() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 1) return
      if (this.loading) return
      this.loading = true
      this.$post('/service/business/person/personTalent/getPersonTalentCorpList.xf', {
        aab001: this.aab001,
        aac001: this.$userInfo.aac001
      }).then(res => {
        this.loading = false
        this.isCollect = !!Number(res.result.colState)
      }).catch(() => {
        this.loading = false
      })
    },
    saveCorp() {
      if (this.loading) return
      this.loading = true
      this.$post('/service/business/person/personTalent/saveTalentCorpinfo.xf', {
        aac001: this.$userInfo.aac001,
        aab001: this.aab001
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getState()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    delCorp() {
      if (this.loading) return
      this.loading = true
      this.$post('/service/business/person/personTalent/delTalentCorpInfo.xf', {
        aac001: this.$userInfo.aac001,
        aab001: this.aab001
      }).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getState()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getCorpList() {
      this.$post('/service/business/corp/corps/getHotCorpList.xf', {
        rowsNum: 8,
        currentPage: 1
      }).then(res => {
        this.corpList = res.result
        this.corpPageBean = res.pageBean
      })
    },
    pre() {
      if (this.jobPageBean.currentPage <= 1) return
      this.jobSearch.currentPage = this.jobPageBean.previousPage
      this.getJob()
    },
    next() {
      if (this.jobPageBean.currentPage >= this.jobPageBean.totalPage) return
      this.jobSearch.currentPage = this.jobPageBean.nextPage
      this.getJob()
    },
    getJob() {
      this.jobLoading = true
      this.$post('/service/business/corp/newPosition/getPositionList.xf', this.jobSearch).then(res => {
        this.jobLoading = false
        this.jobList = res.result || []
        this.jobPageBean = res.pageBean
      }).catch(() => {
        this.jobLoading = false
      })
    },
    handleCollectJob(val) {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 === 2) {
        this.$message({
          message: '只有求职者可以收藏岗位',
          type: 'warning'
        })
        return
      }
      if (Number(val.is_Collection) === 0) {
        this.collectJob(val.acb210)
      } else {
        this.delCollect(val.acb210)
      }
    },
    collectJob(acb210) {
      this.jobLoading = true
      this.$post('/service/business/person/positionTalent/saveTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.jobLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.jobLoading = false
      })
    },
    delCollect(acb210) {
      this.jobLoading = true
      this.$post('/service/business/person/positionTalent/delTalentPositionInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.jobLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.jobLoading = false
      })
    },
    handleResume(val) {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 === 2) {
        this.$message({
          message: '只有求职者可以收藏岗位',
          type: 'warning'
        })
        return
      }
      if (Number(val.is_Resume) > 0) {
        this.$message({
          message: '您已经投递过简历了',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定投递简历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        this.sendResume(val.acb210)
      })
    },
    sendResume(acb210) {
      this.jobLoading = true
      this.$post('/service/business/person/personSendResume/savePositionApplyInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.jobLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getJob()
        }
      }).catch(() => {
        this.jobLoading = false
      })
    }
  },
  created() {
    const search = queryParse(location.search)
    this.getDetail(search.aab001)
    this.aab001 = search.aab001
    this.jobSearch.aab001 = search.aab001
    this.getState()
    this.getCorpList()
    this.getJob()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .module{
    width: 100%;
    min-height: 650px;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .container{
    width: 1200px;
    @include clearFixed;
    margin: 0 auto;
    padding: 50px 0;
    .left{
      width: 908px;
      float: left;
      & > div:not(:last-child){
        margin-bottom: 20px;
      }
      .left-top{
        height: 160px;
        @include clearFixed;
        padding: 20px 10px 20px 30px;
        background: #fff;
        border-radius: 5px;
        .logo{
          height: 120px;
          width: 120px;
          float: left;
          img{
            width: 100%;
          }
        }
        .corp-tit{
          width: 666px;
          float: left;
          padding: 0 0 0 16px;
          p{
            padding-top: 18px;
            &:nth-child(1){
              font-size: 18px;
              color: $--color-primary;
            }
            &:nth-child(2){
              font-size: 14px;
              color: #666;
            }
          }
        }
        .collect{
          width: 35px;
          float: right;
          .xffont{
            font-size: 22px;
            &:hover{
              color: #f26b01;
              cursor: pointer;
            }
          }
          .font-shoucang1{
            color: #f26b01;
          }
          .font-shoucang{
            color: #333;
          }
        }
      }
    }
    .left-middle{
      background: #fff;
      border-radius: 5px;
      padding: 25px 25px;
      .corp-info{
        padding: 20px 0;
        white-space: pre-wrap;
        word-break: break-all;
        font-size: 14px;
        line-height: 25px;
      }
    }
    .left-bottom{
      background: #fff;
      border-radius: 5px;
      .position-tit{
        color: $--color-primary;
        padding: 15px 25px;
        border-bottom: 1px solid #ebebeb;
        & > span{
          display: inline-block;
          &:nth-child(1){
            font-size: 18px;
            color: $--color-primary;
          }
          &:nth-child(2){
            float: right;
            font-size: 14px;
            color: #333;
            .current-page{
              color: $--color-primary;
            }
          }
        }
      }
      .list{
        padding: 15px 25px;
        .item{
          padding: 20px 20px;
          position: relative;
          &:not(:last-child){
            border-bottom: 1px dashed #ebebeb;
          }
          &:hover{
            background: #f3f3f3;
            .salary,.date{
              display: none !important;
            }
            .job-control{
              display: block;
            }
          }
          p{
            &:nth-child(1){
              font-size: 16px;
              color: #333;
              span{
                display: inline-block;
                float: right;
                font-size: 14px;
                color: #666;
              }
            }
            &:nth-child(2){
              padding: 10px 0 0 0;
              font-size: 14px;
              color: #666;
              .salary{
                color: #f26b01;
                display: inline-block;
                float: right;
              }
            }
          }
          .job-control{
            display: none;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            .xffont{
              font-size: 22px;
              margin: 0 5px 0 0;
              &:hover{
                cursor: pointer;
                color: #f26b01;
              }
            }
            .active,.font-shoucang1{
              color: #f26b01;
            }
          }
        }
      }
    }
    .right{
      width: 271px;
      float: right;
      & > div:not(:last-child){
        margin-bottom: 20px;
      }
      .right-top{
        border-radius: 5px;
        background: #fff;
        .contact-tit{
          font-size: 18px;
          color: $--color-primary;
          padding: 15px 20px;
          border-bottom: 1px solid $--color-primary;
        }
        .contact-con{
          padding: 15px 20px;
          font-size: 14px;
          position: relative;
          p{
            &:not(:last-child){
              padding: 0 0 8px 0;
            }
          }
          .label{
            color: #666;
          }
          .no-login{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,.85);
            .no-login-text{
              position: absolute;
              top: 30%;
              left: 0;
              width: 100%;
              text-align: center;
            }
          }
        }
      }
      .right-middle{
        height: 304px;
        border-radius: 5px;
        background: #fff url("./static/qrcode-bg.png") no-repeat;
        padding: 44px 0 0 0;
        img{
          display: block;
          width: 186px;
          height: 186px;
          margin: 0 auto;
        }
        p{
          padding: 10px 0;
          color: #666;
          font-size: 14px;
          text-align: center;
        }
      }
      .right-bottom{
        border-radius: 5px;
        background: #fff;
        .recommend-tit{
          font-size: 18px;
          color: $--color-primary;
          padding: 15px 20px;
          border-bottom: 1px solid $--color-primary;
        }
        .list{
          padding: 0 15px;
          .item{
            padding: 13px 10px;
            @include clearFixed;
            &:not(:last-child){
              border-bottom: 1px dashed #ebebeb;
            }
            &:hover{
              background: #f3f3f3;
            }
            .pos-logo{
              width: 59px;
              height: 59px;
              overflow: hidden;
              float: left;
              img{
                width: 100%;
              }
            }
            .recommend-info{
              width: 153px;
              float: right;
              a{
                font-size: 16px;
                display: inline-block;
                width: 100%;
                @include ellipsis;
                padding: 5px 0 5px 0;
              }
              span{
                font-size: 14px;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .tit{
    color: $--color-primary;
    font-size: 18px;
  }
  .slider{
    img{
      width: 100%;
    }
  }
</style>
