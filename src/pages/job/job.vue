<template>
  <div class="corp">
    <xf-header></xf-header>
    <div class="module" ref="detail">
      <div class="container">
        <div class="left">
          <div class="left-top">
            <div class="title">
              <p class="pos-name">{{detail.cca113 || '--'}}</p>
              <p class="info">
                <span class="salary">{{detail.acc034Name || '--'}}</span>&nbsp;&nbsp;
                <span>{{detail.acb21r ? detail.acb21r + '人' : '若干'}}</span>&nbsp;|&nbsp;
                <span>{{detail.acb21iName || '--'}}</span>&nbsp;|&nbsp;
                <span>{{detail.acc218 || '--'}}</span><span v-if="detail.aac012">&nbsp;|&nbsp;</span>
                <span v-if="detail.aac012">{{detail.aac012 || '--'}}</span>
                <span class="time">{{$dateFormat(detail.ccpr05, 'yyyy-MM-dd')}}刷新</span>
              </p>
              <div class="edit" v-if="ccmu17 !== 2">
                <!--<i class="xffont font-jubao"></i>-->
                <i class="xffont" :title="state.positionTalenState > 0 ? '已收藏' : '收藏'" :class="state.positionTalenState > 0 ? 'font-shoucang1' : 'font-shoucang'" @click="collect(currentSearch.acb210, state.positionTalenState)"></i>
                <el-button type="primary" size="mini" :disabled="state.resumeState > 0" :title="state.resumeState > 0 ? '已投递' : '投递简历'" @click="confirmSend(currentSearch.acb210, state.resumeState)">投递简历</el-button>
              </div>
            </div>
            <div class="welfare">
              <span v-for="(val, key) in welfares" :key="key">{{val}}</span>
            </div>
            <div class="desc">
              <div class="tit">工作地点</div>
              <div class="con">{{detail.bcb202 || '--'}}</div>
            </div>
            <div class="desc">
              <div class="tit">专业要求</div>
              <div class="con">{{detail.acc01gname || '无'}}</div>
            </div>
            <div class="desc">
              <div class="tit">食宿情况</div>
              <div class="con">{{detail.acb228name || '无'}}</div>
            </div>
            <div class="desc">
              <div class="tit">优惠政策</div>
              <div class="con">{{detail.favouredPolicy || '无'}}</div>
            </div>
            <div class="desc">
              <div class="tit">岗位描述</div>
              <div class="con">{{detail.cca114 || '--'}}</div>
            </div>
            <!--<div class="desc">
              <div class="tit">联系电话</div>
              <div class="con">0379-63091742</div>
            </div>-->
          </div>
          <div class="left-bottom" v-loading="listLoading">
            <p class="position-tit">
              <span>该单位招聘岗位</span>
              <span>
                <a href="javascript:;" @click="handlePage(0)">&lt;</a>&nbsp;
                <span class="current-page">{{pageBean.currentPage}}</span>&nbsp;/&nbsp;<span>{{pageBean.totalPage}}</span>&nbsp;
                <a href="javascript:;" @click="handlePage(1)">&gt;</a>
              </span>
            </p>
            <empty v-if="pageBean.totalCount === 0"></empty>
            <div class="list">
              <div class="item" v-for="val in otherJob" :key="val.acb210">
                <p>
                  <a :href="'job.html?acb210=' + val.acb210" :title="val.cca113" target="_blank">{{val.cca113}}</a>
                  <span class="date">{{$dateFormat(val.ccpr05, 'yyyy-MM-dd')}}</span>
                </p>
                <p>
                  <span>
                    <span>{{val.bcb202 || '--'}}</span>&nbsp;|&nbsp;
                    <span>{{val.acb21r ? val.acb21r + '人' : '若干'}}</span><span v-if="val.acc01gname">&nbsp;|&nbsp;</span>
                    <span v-if="val.acc01gname">{{val.acc01gname || '--'}}</span>&nbsp;|&nbsp;
                    <span>{{val.acc218 || '--'}}</span><span v-if="val.aac012">&nbsp;|&nbsp;</span>
                    <span v-if="val.aac012">{{val.aac012 || '--'}}</span>
                  </span>
                  <span class="salary">{{val.acc034Name}}</span>
                </p>
                <div class="job-control">
                  <i class="xffont" :class="Number(val.is_Collection) > 0 ? 'font-shoucang1' : 'font-shoucang'" @click="collect(val.acb210, val.is_Collection, 2)" :title="Number(val.is_Collection) > 0 ? '已收藏' : '收藏'"></i>
                  <i class="xffont font-send" :class="Number(val.is_Resume) > 0 ? 'active' : ''" @click="confirmSend(val.acb210, val.is_Resume)" :title="Number(val.is_Resume) > 0 ? '已投递简历' : '投递简历'"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div class="contact-tit">
              <img :src="corpLogo.ccmu15" alt="">
              <a :href="'corp.html?aab001=' + corpInfo.aab001">{{corpInfo.aab004}}</a>
            </div>
            <div class="contact-con">
              <p>
                <span class="label">网址：</span>
                <a :href="corpInfo.aae016" target="_blank">{{status && corpInfo.aae016 || '--'}}</a>
              </p>
              <p>
                <span class="label">电话：</span>
                <span>{{status && (corpInfo.aab115 || corpInfo.aae005) || '--'}}</span>
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
                <p class="no-login-text">用人单位联系方式<el-button type="text" @click="login">登录</el-button>后可见</p>
              </div>
            </div>
          </div>
          <div class="right-middle" v-if="qrCode">
            <img :src="qrCode" alt="">
            <p>扫描二维码在手机查看岗位详情</p>
          </div>
          <div class="right-bottom">
            <div class="recommend-tit">推荐岗位</div>
            <div class="list">
              <div class="item" v-for="val in recommendJob" :key="val.acb210">
                <a :href="'job.html?acb210=' + val.acb210">{{val.cca113 || '--'}}</a>
                <span>{{val.acc034Name || '--'}}</span>
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
import Empty from '../../components/empty/empty.vue'

export default {
  components: {
    Empty,
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      detail: {},
      isCollect: false,
      welfares: [],
      recommendJob: [], // 推荐岗位
      otherJob: [], // 该公司在招其他岗位
      pageBean: {},
      searchData: {
        acb210: '',
        aac001: this.$userInfo.aac001,
        rowsNum: 6,
        currentPage: 1
      },
      state: {
        positionTalenState: 0,
        resumeState: 0
      },
      editLoading: false,
      corpInfo: {},
      corpLogo: {},
      currentSearch: {},
      ccmu17: this.$userInfo.ccmu17,
      status: this.$userInfo.status,
      listLoading: false,
      qrCode: ''
    }
  },
  methods: {
    getDetail(acb210) {
      this.$post('/service/business/corp/newPosition/getPositionDetail.xf', {
        acb210,
        aac001: this.$userInfo.aac001
      }).then(res => {
        renderTitle(res.result.positionInfo.cca113)
        this.detail = res.result.positionInfo
        this.welfares = res.result.positionInfo.acc214name ? res.result.positionInfo.acc214name.split(',') : []
        this.corpInfo = res.result.corpInfo
        this.corpLogo = res.result.corpLogo
      })
    },
    collect(acb210, state, remark) {
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (this.$userInfo.ccmu17 !== 1) {
        this.$message({
          message: '只有求职者才能收藏岗位',
          type: 'warning'
        })
        return
      }
      if (this.editLoading) return
      this.editLoading = true
      let url = state > 0 ? '/service/business/person/positionTalent/delTalentPositionInfo.xf' : '/service/business/person/positionTalent/saveTalentPositionInfo.xf'
      this.$post(url, {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.editLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          if (remark === 2) {
            this.getOtherJob()
          } else {
            this.getState()
          }
        }
      }).catch(() => {
        this.editLoading = false
      })
    },
    getRecommendJob(acb210) {
      this.$post('/service/business/corp/newPosition/getRecommendJob.xf', {
        acb210,
        rowsNum: 6,
        currentPage: 1
      }).then(res => {
        this.recommendJob = res.result
      })
    },
    getOtherJob() {
      this.listLoading = true
      this.$post('/service/business/corp/newPosition/getPositionList.xf', this.searchData).then(res => {
        this.listLoading = false
        this.otherJob = res.result || []
        this.pageBean = res.pageBean
      }).catch(() => {
        this.listLoading = false
      })
    },
    handlePage(page) {
      if (page === 0) {
        if (this.pageBean.hasPreviousPage) {
          this.searchData.currentPage = this.pageBean.previousPage
          this.getOtherJob()
        }
      } else {
        if (this.pageBean.hasNextPage) {
          this.searchData.currentPage = this.pageBean.nextPage
          this.getOtherJob()
        }
      }
    },
    getState() {
      if (this.$userInfo.status !== 1 || this.$userInfo.ccmu17 !== 1) return
      this.$post('/service/business/corp/newPosition/getPositionState', {
        aac001: this.$userInfo.aac001,
        acb210: this.currentSearch.acb210
      }).then(res => {
        this.state = res.result
      })
    },
    sendResume(acb210) {
      this.editLoading = true
      this.$post('/service/business/person/personSendResume/savePositionApplyInfo.xf', {
        aac001: this.$userInfo.aac001,
        acb210
      }).then(res => {
        this.editLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {
        this.editLoading = false
      })
    },
    confirmSend(acb210, state) {
      if (this.editLoading) return
      if (this.$userInfo.status !== 1) {
        event.$emit('login')
        return
      }
      if (Number(state) > 0) return
      if (this.$userInfo.ccmu17 !== 1) {
        this.$message({
          message: '只有求职者才能投递简历',
          type: 'warning'
        })
        return
      }
      this.$confirm('确定向该单位投递简历?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sendResume(acb210)
      })
    },
    login() {
      event.$emit('login')
    },
    getQrCode(acb210) { // 获取二维码
      this.$post('/service/business/fm/pic/picInfo/qrCodeGenerate.xf', {
        /// type=1 个人   type=2 单位   type=3 岗位
        type: 3,
        paramsId: acb210
      }, false).then(res => {
        if (res.result && res.result.qrCodeUrl) {
          this.qrCode = res.result.qrCodeUrl
        }
      })
    }
  },
  created() {
    const search = queryParse(location.search)
    this.currentSearch = search
    this.getDetail(search.acb210)
    this.getRecommendJob(search.acb210)
    this.getState()
    this.searchData.acb210 = search.acb210
    this.getOtherJob()
    this.getQrCode(search.acb210)
  }
}
</script>
<style lang="scss">
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
        background: #fff;
        padding: 30px 20px;
        border-radius: 5px;
        .title{
          padding: 0 0 20px 0;
          border-bottom: 1px solid #ebebeb;
          position: relative;
          .pos-name{
            font-size: 16px;
            color: $--color-primary;
          }
          .info{
            font-size: 14px;
            color: #666;
            padding-top: 12px;
            .salary{
              color: #f26b01;
            }
            .time{
              display: inline-block;
              float: right;
            }
          }
          .edit{
            position: absolute;
            top: -5px;
            right: -1px;
            .xffont{
              font-size: 20px;
              margin: 0 5px 0 0;
              &.font-jubao{
                font-size: 18px;
              }
              &:hover{
                cursor: pointer;
                color: #f26b01;
              }
              &.font-shoucang1{
                color: #f26b01;
              }
            }
          }
        }
        .welfare{
          padding: 15px 0;
          border-bottom: 1px solid #ebebeb;
          span{
            display: inline-block;
            padding: 8px 10px;
            border: 1px solid #d9d9d9;
            color: $--color-primary;
            font-size: 14px;
            margin: 0 5px 5px 0;
          }
        }
        .desc{
          padding: 0 0 20px 0;
          border-bottom: 1px solid #ebebeb;
          .tit{
            font-size: 16px;
            color: $--color-primary;
            padding: 15px 0;
          }
          .con{
            font-size: 14px;
            line-height: 25px;
            white-space: pre-wrap;
            word-break: break-all;
          }
        }
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
              a{
                display: inline-block;
                max-width: 700px;
                @include ellipsis;
              }
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
          color: $--color-primary;
          padding: 15px 0 0 0;
          img{
            width: 120px;
            height: 120px;
            display: block;
            margin: 0 auto;
          }
          a{
            padding: 15px 0 0 0;
            font-size: 16px;
            color: $--color-primary;
            text-align: center;
            display: inline-block;
            width: 100%;
            @include ellipsis;
          }
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
          .item{
            padding: 13px 10px;
            white-space: nowrap;
            &:not(:last-child){
              border-bottom: 1px dashed #ebebeb;
            }
            &:hover{
              background: #f3f3f3;
            }
            a{
              display: inline-block;
              max-width: 64%;
              @include ellipsis;
              font-size: 16px;
            }
            span{
              color: #f26b01;
              font-size: 14px;
              width: 36%;
              float: right;
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
</style>
