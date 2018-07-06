<!--级联选择器组件（二次开发，带回填功能）-->
<template>
  <el-cascader
    :clearable="clearable"
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
      }
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
      }
    },
    handleChange(values) {
      this.$emit('input', values[values.length - 1])

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
