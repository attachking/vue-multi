<template>
  <div class="job">
    <div class="card-tit">
      <router-link class="item" to="/job/jobList"><i class="xffont font-iconzhiwei"></i>职位管理</router-link>
      <router-link class="item" to="/job/jobEdit"><i class="el-icon-circle-plus-outline"></i>发布职位</router-link>
    </div>
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleRouter(router) {
      if (router.name === 'job') {
        this.$router.replace({name: 'jobList'})
      }
    }
  },
  created() {
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
  }
}
</script>
<style lang="scss">
  @import "../../../../common/style/variables";
  .job{
    padding: 20px 20px;
  }
</style>
