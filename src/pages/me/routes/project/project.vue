<template>
  <div class="project">
    <div class="card-tit">
      <router-link class="item" to="/project/projectList"><i class="xffont font-icon-project"></i>我的项目</router-link>
      <router-link class="item" to="/project/projectApply"><i class="el-icon-circle-plus-outline"></i>申报项目</router-link>
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
      if (router.name === 'project') {
        this.$router.replace({name: 'projectList'})
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
  .project{
    padding: 20px 20px;
  }
</style>
