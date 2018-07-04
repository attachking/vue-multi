<template>
  <div class="job-fair">
    <div class="card-tit">
      <router-link class="item" to="/jobFair/jobFairList"><i class="xffont font-iconzhiwei"></i>招聘会</router-link>
      <router-link class="item" to="/jobFair/reserved"><i class="xffont font-admin"></i>我的招聘会</router-link>
    </div>
    <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stallsName: ''
    }
  },
  methods: {
    handleRouter(router) {
      if (router.name === 'jobFair') {
        this.$router.replace({name: 'jobFairList'})
      }
    }
  },
  created() {
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .job-fair{
    padding: 20px 20px;
  }
</style>
