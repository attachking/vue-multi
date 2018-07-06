<template>
  <div class="stalls">
    <xf-talls :acb330="acb330"></xf-talls>
  </div>
</template>
<script>
import XfTalls from '../../../../../components/xf-talls/xf-talls.vue'

export default {
  components: {XfTalls},
  data() {
    return {
      acb330: ''
    }
  },
  methods: {},
  created() {
    this.acb330 = this.$route.query.acb330
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
</style>
