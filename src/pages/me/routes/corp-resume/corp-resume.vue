<template>
  <div class="corp-resume">
    <div class="card-tit">
      <router-link class="item" to="/corpResume/received"><i class="xffont font-jianli-copy"></i>收到的简历</router-link>
      <router-link class="item" to="/corpResume/corpCollection"><i class="xffont font-shoucang1"></i>我的收藏</router-link>
      <router-link class="item" to="/corpResume/invited"><i class="xffont font-yaoqingchengyuan"></i>面试邀请记录</router-link>
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
      if (router.name === 'corpResume') {
        this.$router.replace({name: 'received'})
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
  .corp-resume{
    padding: 20px 20px;
  }
</style>
