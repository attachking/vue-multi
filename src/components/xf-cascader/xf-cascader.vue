<!--级联选择器组件（二次开发，带回填功能）-->
<template>
  <el-cascader
    ref="input"
    :clearable="clearable"
    :placeholder="placeholder"
    :options="options"
    filterable
    :change-on-select="changeOnSelect"
    :value="val"
    @change="handleChange"
    :props="cascaderFmt"
    :show-all-levels="showAllLevels"
    @blur="handleBlur"
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
    // 数据
    options: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否可搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 是否可选择每一级
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    // v-model绑定的值
    value: {
      type: null,
      default: ''
    },
    // 是否只显示最后一级
    showAllLevels: {
      type: Boolean,
      default: true
    },
    // 用于返回最后一级的文本（.sync绑定）
    text: {
      type: String,
      default: ''
    },
    // 用于返回完整的文本（.sync绑定）
    fulltext: {
      type: String,
      default: ''
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      val: [],
      cascaderFmt: {
        value: 'id',
        label: 'text',
        children: 'children'
      },
      currentValues: []
    }
  },
  methods: {
    handleValue(value) {
      if (!value) {
        this.val = []
      } else {
        value += ''
        this.back = new BackCascader({
          list: this.options,
          id: value
        })
        this.val = this.back.back()
        this.currentValues = this.val
        this.pullName(this.val)
      }
    },
    handleChange(values) {
      this.currentValues = values
      if (values.length < 2) {
        this.$emit('input', '')
        return
      }
      this.$emit('input', values[values.length - 1])
      this.pullName(values)
    },
    pullName(values) {
      // 如果字典表还未加载，则终止计算
      if (!this.options.length) return
      let i = 0
      let names = []
      function deep(arr) {
        if (i > values.length - 1) return
        let index = arr.findIndex(item => item.id === values[i])
        names.push(arr[index].text)
        i++
        deep(arr[index].children)
      }
      deep(this.options)
      this.$emit('update:text', names[names.length - 1])
      this.$emit('update:fulltext', names.join(' '))
    },
    handleBlur() {
      if (this.currentValues.length < 2) {
        this.val = []
      }
    }
  },
  created() {
    this.handleValue(this.value)
    this.$watch('value', this.handleValue)
    this.$watch('options', () => {
      setTimeout(() => {
        this.handleValue(this.value)
      }, 20)
    })
  }
}
</script>
