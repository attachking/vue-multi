<template>
  <div class="job-preview">
    <el-form ref="form" inline label-width="100px" class="demo-table-expand">
      <el-form-item label="职位类别">
        <span>{{form.bca112}}</span>
      </el-form-item>
      <el-form-item label="职位名称">
        <span>{{form.cca113}}</span>
      </el-form-item>
      <el-form-item label="招聘人数">
        <span>{{form.acb21r}}人</span>
      </el-form-item>
      <el-form-item label="发布日期">
        <span>{{form.aae030}}</span>
      </el-form-item>
      <el-form-item label="失效日期">
        <span>{{form.aae031}}</span>
      </el-form-item>
      <el-form-item label="学历要求">
        <span>{{form.aac012}}</span>
      </el-form-item>
      <el-form-item label="薪资待遇">
        <span>{{form.acc034Name}}</span>
      </el-form-item>
      <el-form-item label="工作经验">
        <span>{{form.acc218}}</span>
      </el-form-item>
      <el-form-item label="专业要求">
        <span>{{form.aac012}}</span>
      </el-form-item>
      <el-form-item label="福利待遇">
        <span>{{form.acc214name}}</span>
      </el-form-item>
      <el-form-item label="工作地点">
        <span>{{form.bcb202}}</span>
      </el-form-item>
      <el-form-item label="工作性质">
        <span>{{form.acb21iName}}</span>
      </el-form-item>
      <el-form-item label="食宿情况">
        <span>{{form.acb228name}}</span>
      </el-form-item>
      <el-form-item label="优惠政策">
        <span>{{form.favouredPolicy}}</span>
      </el-form-item>
      <el-form-item label="职位描述" style="width: 100%;">
        <p class="no-wrap">{{form.cca114}}</p>
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
</style>
