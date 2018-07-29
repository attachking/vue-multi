<template>
  <div class="register-page">
    <xf-header ref="header"></xf-header>
    <div class="register">
      <div class="register-con">
        <transition name="el-fade-in" mode="out-in">
          <router-view></router-view>
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
    width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    .el-tag{
      white-space: normal;
    }
    .el-tag--small{
      height: auto;
    }
  }
</style>
