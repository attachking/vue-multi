<template>
  <div class="job-preview">
    <el-form ref="form" inline label-width="100px" class="demo-table-expand">
      <el-form-item label="岗位类别">
        <span class="detail">{{form.bca112 || '--'}}</span>
      </el-form-item>
      <el-form-item label="岗位名称">
        <span class="detail">{{form.cca113 || '--'}}</span>
      </el-form-item>
      <el-form-item label="招聘人数">
        <span class="detail">{{form.acb21r || '--'}}人</span>
      </el-form-item>
      <el-form-item label="发布日期">
        <span class="detail">{{$dateFormat(form.aae030, 'yyyy-MM-dd')}}</span>
      </el-form-item>
      <el-form-item label="失效日期">
        <span class="detail">{{$dateFormat(form.aae031, 'yyyy-MM-dd')}}</span>
      </el-form-item>
      <el-form-item label="学历要求">
        <span class="detail">{{form.aac012 || '--'}}</span>
      </el-form-item>
      <el-form-item label="薪资待遇">
        <span class="detail">{{form.acc034Name || '--'}}</span>
      </el-form-item>
      <el-form-item label="工作经验">
        <span class="detail">{{form.acc218 || '--'}}</span>
      </el-form-item>
      <el-form-item label="专业要求">
        <span class="detail">{{form.acc01gname || '--'}}</span>
      </el-form-item>
      <el-form-item label="福利待遇">
        <span class="detail">{{form.acc214name || '--'}}</span>
      </el-form-item>
      <el-form-item label="工作地点">
        <span class="detail">{{form.bcb202 || '--'}}</span>
      </el-form-item>
      <el-form-item label="工作性质">
        <span class="detail">{{form.acb21iName || '--'}}</span>
      </el-form-item>
      <el-form-item label="食宿情况">
        <span class="detail">{{form.acb228name || '--'}}</span>
      </el-form-item>
      <el-form-item label="优惠政策">
        <span class="detail">{{form.favouredPolicy || '--'}}</span>
      </el-form-item>
      <el-form-item label="岗位描述" style="width: 100%;">
        <p class="no-wrap">{{form.cca114 || '--'}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    getInfo(acb210) {
      this.$post('/service/business/corp/newPosition/getPositionDetail.xf', {acb210}).then(res => {
        this.form = res.result.positionInfo
      }).catch(() => {})
    }
  },
  mounted() {
    this.getInfo(this.$route.query.acb210)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-table-expand {
    font-size: 0;
    margin: 20px 0 0 0;
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
  .no-wrap{
    max-width: 770px;
  }
  .detail{
    max-width: 350px;
    display: inline-block;
  }
</style>
