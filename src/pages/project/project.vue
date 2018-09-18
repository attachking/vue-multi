<template>
  <div class="news-detail">
    <xf-header></xf-header>
    <div class="module">
      <div class="news-module">
        <div class="top-tit">
          <i class="xffont font-weibiao45100847"></i>
          <a href="index.html">首页</a> >
          <a :href="currentUrl">{{current}}</a>
        </div>
        <div class="content">
          <div class="project-tit">
            <div class="news-tit">
              <h2>{{detail.projectName}}</h2>
              <div class="resource">
                发布时间：{{$dateFormat(detail.projectSubmitdate, 'yyyy-MM-dd')}}
              </div>
            </div>
          </div>
          <el-form label-width="180px" class="demo-table-expand">
            <el-form-item label="立项单位">
              <a :href="'corp.html?aab001=' + detail.aab001">{{detail.projectApprovalunit || '--'}}</a>
            </el-form-item>
            <el-form-item label="项目名称">
              <span>{{detail.projectName || '--'}}</span>
            </el-form-item>
            <el-form-item label="项目类别" class="half">
              <span>{{detail.projectCategory || '--'}}</span>
            </el-form-item>
            <el-form-item label="经费来源" class="half">
              <span>{{detail.projectFundresourse || '--'}}</span>
            </el-form-item>
            <el-form-item label="合作方式" class="half">
              <span>{{detail.projectWorktype || '--'}}</span>
            </el-form-item>
            <el-form-item label="待遇" class="half">
              <span>{{detail.projectTreatment || '--'}}</span>
            </el-form-item>
            <el-form-item label="工作地点" class="half">
              <span>{{detail.projectWorkaddress || '--'}}</span>
            </el-form-item>
            <el-form-item label="联系人" class="half">
              <span>{{detail.projectContacts || '--'}}</span>
            </el-form-item>
            <el-form-item label="手机号" class="half">
              <span>{{detail.projectPhone || '--'}}</span>
            </el-form-item>
            <el-form-item label="固定电话" class="half">
              <span>{{detail.projectTel || '--'}}</span>
            </el-form-item>
            <el-form-item label="邮箱" class="half">
              <span>{{detail.projectEmail || '--'}}</span>
            </el-form-item>
            <el-form-item label="参与单位">
              <span class="no-wrap">{{detail.projectJoinUnit || '--'}}</span>
            </el-form-item>
            <el-form-item label="项目介绍">
              <span>{{detail.projectIntroduction || '--'}}</span>
            </el-form-item>
            <el-form-item label="项目需研究或解决的问题">
              <span>{{detail.projectProblem || '--'}}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{detail.remark || '--'}}</span>
            </el-form-item>
          </el-form>
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

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      current: '',
      channelCode: '',
      detail: {},
      currentUrl: ''
    }
  },
  methods: {
    getDetail(projectid) {
      this.$post('/service/business/project/enterpriseProject/getProjectById', {projectid}).then(res => {
        renderTitle(res.result.projectName)
        this.detail = res.result
      })
    },
    getChannel(channelCode) {
      this.$post('/service/business/sms/sms/channelInfo/getCrChannel', {channel_code: channelCode}).then(res => {
        res.result.cr.forEach(item => {
          if (item.channelCode === channelCode) {
            this.current = item.canc03
            this.currentUrl = item.canc04
          }
        })
      })
    }
  },
  mounted() {
    const search = queryParse(location.search)
    this.channelCode = search.channel_code
    this.getDetail(search.projectid)
    this.getChannel(search.channel_code)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .module{
    min-height: 640px;
    padding: 50px 0;
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .news-module{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    padding: 10px 50px 30px 50px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .top-tit{
    padding: 20px 0;
    color: #333;
    border-bottom: 1px solid #d9d9d9;
    a{
      margin: 0 5px;
    }
  }
  .news-tit{
    padding: 30px 0 20px 0;
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
    .resource{
      padding: 20px 0 0 0;
      font-size: 14px;
      color: #666;
      i{
        font-size: 18px;
        margin: 0 5px;
        vertical-align: text-bottom;
      }
    }
  }
  .demo-table-expand{
    padding: 20px 20px;
    @include clearFixed;
    .el-form-item{
      display: inline-block;
      width: 100%;
      vertical-align: top;
    }
    .half{
      width: 49%;
    }
  }
</style>
