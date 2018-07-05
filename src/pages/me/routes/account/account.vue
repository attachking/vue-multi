<template>
  <div class="account">
    <div class="card-tit">
      <router-link to="/account/head" class="item"><i class="xffont font-yonghu"></i>修改头像</router-link>
      <router-link to="/account/info" class="item" v-if="ccmu17 === 2"><i class="xffont font-yidiandiantubiao04"></i>基本信息</router-link>
      <router-link to="/account/authen" class="item" v-if="ccmu17 === 2"><i class="xffont font-anquanshezhi"></i>企业认证</router-link>
      <router-link to="/account/password" class="item"><i class="xffont font-shezhi"></i>安全设置</router-link>
      <router-link to="/account/pics" class="item"><i class="xffont font-gerenfengcai"></i>个人风采</router-link>
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
      ccmu17: this.$userInfo.ccmu17
    }
  },
  methods: {
    handleRouter(route) {
      // 默认跳转至头像修改
      if (route.name === 'account') {
        this.$router.replace({name: 'head'})
      }
    }
  },
  created() {
    // 默认跳转至
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
  .account{
    padding: 20px 20px;
  }
</style>
