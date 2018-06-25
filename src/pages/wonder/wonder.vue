<template>
  <div class="wonder">
    <xf-header></xf-header>
    <div></div>
    <xf-footer></xf-footer>
    <right-menu></right-menu>
  </div>
</template>
<script>
import XfHeader from '../../components/xf-header/xf-header.vue'
import XfFooter from '../../components/xf-footer/xf-footer.vue'
import RightMenu from '../../components/right-menu/right-menu.vue'

export default {
  components: {
    RightMenu,
    XfFooter,
    XfHeader},
  data() {
    return {}
  }
}
</script>
<style lang="scss">
  .module{
    width: 100%;
  }
</style>
