<template>
  <div class="user-collection">
    <div class="card-tit">
      <router-link class="item" to="/job/jobList"><i class="xffont font-iconzhiwei"></i>收藏的职位</router-link>
      <router-link class="item" to="/job/jobEdit"><i class="xffont font-gongsixinxi"></i>收藏的单位</router-link>
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
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .user-collection{
    padding: 20px 20px;
  }
</style>
