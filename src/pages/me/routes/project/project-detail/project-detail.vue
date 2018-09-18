<template>
  <div class="project-detail">
    <el-form label-width="100px" class="demo-table-expand">
      <el-form-item label="立项单位">
        <span>{{info.aab004 || '--'}}</span>
      </el-form-item>
      <el-form-item label="项目名称">
        <span>{{info.projectName || '--'}}</span>
      </el-form-item>
      <el-form-item label="项目类别">
        <span>{{info.projectCategory || '--'}}</span>
      </el-form-item>
      <el-form-item label="项目介绍">
        <span>{{info.projectIntroduction || '--'}}</span>
      </el-form-item>
      <el-form-item label="项目需研究或解决的问题">
        <span>{{info.projectProblem || '--'}}</span>
      </el-form-item>
      <el-form-item label="经费来源">
        <span>{{info.projectFundresourse || '--'}}</span>
      </el-form-item>
      <el-form-item label="合作方式">
        <span>{{info.projectWorktype || '--'}}</span>
      </el-form-item>
      <el-form-item label="待遇">
        <span>{{info.projectTreatment || '--'}}</span>
      </el-form-item>
      <el-form-item label="参与单位">
        <span class="no-wrap">{{info.projectJoinUnit || '--'}}</span>
      </el-form-item>
      <el-form-item label="工作地点">
        <span>{{info.projectWorkaddress || '--'}}</span>
      </el-form-item>
      <el-form-item label="联系人">
        <span>{{info.projectContacts || '--'}}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{info.projectPhone || '--'}}</span>
      </el-form-item>
      <el-form-item label="固定电话">
        <span>{{info.projectTel || '--'}}</span>
      </el-form-item>
      <el-form-item label="邮箱">
        <span>{{info.projectEmail || '--'}}</span>
      </el-form-item>
      <el-form-item label="备注">
        <span>{{info.remark || '--'}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {
    getInfo() {
      this.$post('/service/business/project/enterpriseProject/getProjectDetails', {
        projectid: this.$route.query.projectid
      }).then(res => {
        this.info = res.result
      })
    }
  },
  created() {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .project-detail{
    padding: 20px 0 0 0;
  }
</style>
