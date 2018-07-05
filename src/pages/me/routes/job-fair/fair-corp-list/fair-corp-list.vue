<template>
  <div class="fair-corp-list">
    <fair-corps :fair="$route.query.acb330"></fair-corps>
  </div>
</template>
<script>
import FairCorps from '../../../../../components/fair-corps/fair-corps.vue'

export default {
  components: {FairCorps},
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .fair-corp-list{
    padding: 20px 0 0 0;
  }
</style>
