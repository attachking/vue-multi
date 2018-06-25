<template>
  <div class="list">
    <pagination :bean="pageBean" @current-change="handlePage"></pagination>
  </div>
</template>
<script>
import Pagination from '../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      searchData: {
        rowsNum: 11,
        currentPage: 1,
        countsNum: 50,
        channel_code: ''
      },
      list: [],
      pageBean: {}
    }
  },
  methods: {
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    getList() {
      const loading = this.$loading({
        target: this.$refs.list,
        fullscreen: false
      })
      this.$post('/service/business/sms/sms/getContentList', this.searchData).then(res => {
        loading.close()
        this.pageBean = res.pageBean
        this.list = res.result
      }).catch(() => {
        loading.close()
      })
    },
    handleRoute(route) {
      if (!route.query.channel_code) return
      this.searchData.channel_code = route.query.channel_code
      this.getList()
    }
  },
  watch: {
    $route(newVal) {
      this.handleRoute(newVal)
    }
  },
  mounted() {
    this.handleRoute(this.$route)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../common/style/variables";
</style>
