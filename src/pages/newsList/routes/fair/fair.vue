<!--招聘会列表（二级页面）-->
<template>
  <div class="fair">
    <div class="list">
      <div class="item" v-for="val in list" :key="val.acb330">
        <a :href="'fair.html?acb330=' + val.acb330" :title="val.acb331" target="_blank">
          <span :class="Number(val.status) === 1 ? 'green' : Number(val.status) === 2 ? 'red' : 'closed'">【{{Number(val.status) === 1 ? '进行中' : Number(val.status) === 2 ? '未开始' : '已结束'}}】</span>
          {{val.acb331 || '--'}}
        </a>
        <p>
          <i class="xffont font-zuobiao"></i><span>{{val.acd200name || '--'}}</span>
        </p>
        <p>
          <i class="xffont font-msnui-time"></i><span>{{$dateFormat(val.acb333, 'yyyy-MM-dd hh:mm')}} 至 {{$dateFormat(val.acb334, 'yyyy-MM-dd hh:mm')}}</span>
          <span class="count">参会单位：<span class="red">{{val.corpNum}}</span> 家</span>
          <span class="count">发布职位数：<span class="red">{{val.jobNum}}</span></span>
        </p>
        <a :href="'fair.html?acb330=' + val.acb330" target="_blank">
          <el-button class="btn" type="primary" plain>查看详情</el-button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      pageBean: {},
      searchData: {
        currentPage: 1,
        rowsNum: 5
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/jobfair/jobFairInfo/listJson.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .list{
    .item{
      padding: 20px 10px 0 10px;
      position: relative;
      a{
        font-size: 16px;
        display: inline-block;
        width: 80%;
        @include ellipsis;
      }
      p{
        padding: 10px 0 0 0;
        font-size: 14px;
        color: #666;
        .xffont{
          margin: 0 3px 0 6px;
        }
      }
      .btn{
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
      .count{
        margin-left: 10px;
      }
      &:not(:last-child){
        border-bottom: 1px dashed #ebebeb;
      }
      &:hover{
        background: #f3f3f3;
      }
    }
  }
  .green{
    color: green;
  }
  .red{
    color: red;
  }
  .closed{
    color: #666;
  }
</style>
