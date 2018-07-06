<template>
  <div class="register-page">
    <xf-header ref="header"></xf-header>
    <div class="register">
      <div class="register-con">
        <transition name="el-fade-in" mode="out-in">
          <router-view @login="login"></router-view>
        </transition>
      </div>
    </div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'
import XfHeader from '../../components/xf-header/xf-header.vue'

export default {
  components: {
    XfHeader,
    RightMenu,
    XfFooter},
  data() {
    return {}
  },
  methods: {
    login() {
      this.$refs.header.login()
    }
  },
  created() {}
}
</script>
<style lang="scss">
  @import "../../common/style/variables";
  .register{
    background: url("../../common/img/bg.png") no-repeat;
    padding: 90px 0;
    background-size: 100% 100%;
    min-height: 650px;
  }
  .register-con{
    width: 760px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    .title{
      padding: 25px 0;
      margin: 0 20px;
      border-bottom: 1px solid #ebebeb;
      span{
        i{
          font-size: 20px;
        }
        &:nth-child(1){
          font-size: 20px;
          color: $--color-primary;
        }
        &:nth-child(2){
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
</style>
