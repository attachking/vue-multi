<template>
  <div class="job-search-box">
    <div class="card-tit">
      <span class="item active"><i class="xffont font-search"></i>岗位搜索</span>
    </div>
    <div class="job-search">
      <!--个人中心的岗位搜索页直接复用二级页面的岗位搜索-->
      <job-search></job-search>
    </div>
  </div>
</template>
<script>
import JobSearch from '../../../newsList/routes/job/job.vue'

export default {
  components: {JobSearch},
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .job-search-box{
    padding: 20px 20px;
  }
  .job-search{
    padding: 0 0;
  }
</style>
