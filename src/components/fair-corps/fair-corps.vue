<!--招聘会参会企业列表-->
<template>
  <div class="fair-corps">
    <div class="list">
      <div class="item" v-for="val in list" :key="val.aab001">
        <div class="img">
          <img :src="val.ccmu15">
        </div>
        <div class="content">
          <a :href="'corp.html?aab001=' + val.aab001" target="_blank" :title="val.aab004">{{val.aab004 || '--'}}</a>
          <p>
            <i class="xffont font-biaoqian"></i>&nbsp;摊位号：（<span class="theme">{{val.ace201 || '--'}}</span>）
          </p>
          <p><i class="xffont font-zuobiao"></i>&nbsp;公司地址：{{val.aaa021 || '--'}}</p>
        </div>
        <el-popover
          placement="left"
          width="650"
          :disabled="!val.jobNum"
          trigger="click">
          <el-table :data="val.positionList">
            <el-table-column
              label="岗位名称">
              <template slot-scope="scope">
                <a class="ellipsis" target="_blank" :href="'job.html?acb210=' + scope.row.acb210" :title="scope.row.cca113">{{scope.row.cca113 || '--'}}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="工作地点">
              <template slot-scope="scope">
                <span class="ellipsis" :title="scope.row.bcb202">{{scope.row.bcb202 || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="学历要求">
              <template slot-scope="scope">
                <span class="ellipsis" :title="scope.row.aac011name">{{scope.row.aac011name || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="招聘人数">
              <template slot-scope="scope">
                <span class="ellipsis" :title="scope.row.acb21r">{{scope.row.acb21r || '--'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="薪资">
              <template slot-scope="scope">
                <span class="ellipsis red" :title="scope.row.aac034name">{{scope.row.aac034name || '--'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="right" slot="reference">
            <p>{{val.jobNum || 0}}</p>
            <p>发布岗位</p>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fair-corps',
  props: {
    fair: {
      type: null,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      pageBean: {},
      list: [],
      searchData: {
        acb330: '',
        currentPage: 1,
        rowsNum: 6
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/jobfair/jobFairInfo/getJobFairCorpInfo', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    handleFair(id) {
      if (!id) return
      this.searchData.acb330 = id
      this.getList()
    }
  },
  created() {
    this.handleFair(this.fair)
    this.$watch('fair', this.handleFair)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .item{
    padding: 15px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    position: relative;
    @include clearFixed;
    &:not(:last-child){
      margin: 0 0 8px 0;
    }
    &:hover{
      background: #f2f2f2;
    }
    .img{
      height: 80px;
      width: 80px;
      overflow: hidden;
      float: left;
      img{
        width: 100%;
      }
    }
    .content{
      width: 70%;
      padding: 0 0 0 15px;
      float: left;
      a{
        display: inline-block;
        max-width: 100%;
        @include ellipsis;
        font-size: 16px;
      }
      p{
        font-size: 14px;
        color: #666;
        padding: 5px 0 0 0;
      }
    }
    .right{
      background: #f1f1f1;
      width: 80px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      &:hover{
        cursor: pointer;
      }
      p{
        height: 50%;
        text-align: center;
        line-height: 55px;
        &:nth-child(1){
          color: $--color-primary;
          font-size: 36px;
          margin: 0 8px;
          border-bottom: 1px solid #ebebeb;
        }
        &:nth-child(2){
          font-size: 16px;
        }
      }
    }
  }
  .theme{
    color: $--color-primary;
  }
  .ellipsis{
    display: inline-block;
    max-width: 118px;
    @include ellipsis;
  }
  .red{
    color: red;
  }
</style>
