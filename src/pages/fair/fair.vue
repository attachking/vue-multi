<template>
  <div class="fair">
    <xf-header></xf-header>
    <div class="fair-con">
      <div class="top">
        <div class="top-left">
          <p class="title">{{detail.acb331 || '--'}}</p>
          <p class="other">
            <span class="label">场地</span>
            {{detail.acd200name || '--'}}
          </p>
          <p class="other">
            <span class="label">时间</span>
            {{$dateFormat(detail.acb333, 'yyyy-MM-dd hh:mm')}} 至 {{$dateFormat(detail.acb334, 'yyyy-MM-dd hh:mm')}}
          </p>
        </div>
        <div class="top-right">
          <div>
            <p><span class="num">2</span>家</p>
            <p>参会单位</p>
          </div>
          <div>
            <p><span class="num">4</span>个</p>
            <p>招聘职位</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="first">
            <span slot="label" class="tab"><i class="xffont font-admin"></i>&nbsp;企业预定</span>
            <div class="tab-con">
              <xf-talls :acb330="acb330" :status="detail.status"></xf-talls>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label" class="tab"><i class="xffont font-gongsixinxi"></i>&nbsp;参会企业</span>
            <div class="tab-con">
              <fair-corps :fair="acb330"></fair-corps>
            </div>
          </el-tab-pane>
          <el-tab-pane name="third">
            <span slot="label" class="tab"><i class="xffont font-jilu"></i>&nbsp;招聘会详情</span>
            <div class="tab-con">
              <div v-html="detail.aae013"></div>
            </div>
          </el-tab-pane>
        </el-tabs>
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
import Empty from '../../components/empty/empty.vue'
import XfTalls from '../../components/xf-talls/xf-talls.vue'
import FairCorps from '../../components/fair-corps/fair-corps.vue'

export default {
  components: {
    FairCorps,
    XfTalls,
    Empty,
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {
      acb330: '',
      detail: {},
      activeName: 'first'
    }
  },
  methods: {
    getDetail() {
      this.$post('/service/business/jobfair/jobFairInfo/getJobFairInfo.xf', {
        acb330: this.acb330
      }).then(res => {
        this.detail = res.result
        renderTitle(res.result.acb331)
      })
    },
    handleClick(tab) {}
  },
  created() {
    const query = queryParse(location.search)
    this.acb330 = query.acb330
    this.getDetail()
  }
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  .fair{
    background: url("../../common/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .fair-con{
    width: 1200px;
    min-height: 650px;
    margin: 0 auto;
  }
  .top{
    margin: 20px 0;
    padding: 20px 20px;
    background: #fff;
    border-radius: 5px;
    @include clearFixed;
    .top-left{
      width: 900px;
      float: left;
      .title{
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }
      .label{
        display: inline-block;
        padding: 3px 5px;
        background: $--color-primary;
        color: #fff;
        border-radius: 2px;
        margin: 0 3px 0 0;
      }
      .other{
        padding: 10px 0 0 0;
        font-size: 14px;
      }
    }
    .top-right{
      width: 250px;
      float: right;
      margin: 20px 0 0 0;
      text-align: center;
      @include clearFixed;
      .num{
        font-size: 40px;
        color: $--color-primary;
      }
      & > div{
        width: 50%;
        float: left;
        &:nth-child(1){
          border-right: 1px solid #ebebeb;
        }
      }
    }
  }
  .bottom{
    border-radius: 5px;
    background: #fff;
    padding: 10px 20px 20px 20px;
    margin: 0 0 20px 0;
    .tab{
      font-size: 16px;
    }
    .tab-con{
      min-height: 380px;
    }
  }
</style>
