<template>
  <el-pagination
    @size-change="handleSizeChange"
    :small="small"
    @current-change="handleCurrentChange"
    :current-page="bean.currentPage"
    :page-sizes="pageSizes"
    :page-size="bean.pageSize"
    :layout="layout"
    :total="bean.totalCount">
  </el-pagination>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    bean: {
      type: Object,
      default() {
        return {}
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSizeChange() {
      this.$emit('size-change', ...arguments)
    },
    handleCurrentChange() {
      this.$emit('current-change', ...arguments)
    }
  },
  watch: {
    bean(newVal, oldVal) {
      if (newVal.currentPage > newVal.totalPage) {
        if (newVal.totalPage > 0) {
          this.handleCurrentChange(newVal.totalPage)
        }
      }
    }
  }
}
</script>
