<template>
  <div class="records">
    <div class="card-tit">
      <router-link class="item" to="/records/apply"><i class="xffont font-iconzhiwei"></i>应聘记录</router-link>
      <router-link class="item" to="/records/invitation"><i class="xffont font-youxiang"></i>面试邀请</router-link>
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
      if (router.name === 'records') {
        this.$router.replace({name: 'apply'})
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
  .records{
    padding: 20px 20px;
  }
</style>
