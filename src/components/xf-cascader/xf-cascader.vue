<!--级联选择器组件（二次开发，带回填功能）-->
<template>
  <el-cascader
    :placeholder="placeholder"
    :options="options"
    filterable
    :change-on-select="changeOnSelect"
    :value="val"
    @change="handleChange"
    :props="cascaderFmt"
    :show-all-levels="showAllLevels"
  ></el-cascader>
</template>
<script>
import {BackCascader} from '../../common/js/utils'

export default {
  name: 'xf-cascader',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    value: {
      type: null,
      default: ''
    },
    showAllLevels: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      val: [],
      cascaderFmt: {
        value: 'id',
        label: 'text',
        children: 'children'
      }
    }
  },
  methods: {
    handleValue(value) {
      if (!value) {
        this.val = []
      } else {
        this.back = new BackCascader({
          list: this.options,
          id: value
        })
        this.val = this.back.back()
      }
    },
    handleChange(values) {
      this.$emit('input', values[values.length - 1])
    }
  },
  created() {
    this.handleValue(this.value)
    this.$watch('value', this.handleValue)
  }
}
</script>
