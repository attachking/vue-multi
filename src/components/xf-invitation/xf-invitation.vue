<!--面试邀请组件-->
<template>
  <el-dialog
    title="面试邀请"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="480px">
    <el-form ref="form" class="form" :rules="rules" :model="form" label-width="100px" v-loading="formLoading">
      <el-form-item label="选择岗位" prop="acb210">
        <el-select v-model="form.acb210" placeholder="请选择岗位" filterable>
          <el-option v-for="item in list" :key="item.acb210" :label="item.cca113" :value="item.acb210"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间" prop="ccps03">
        <el-date-picker
          v-model="form.ccps03"
          editable
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面试地点" prop="ccps05">
        <el-input v-model="form.ccps05" placeholder="请输入面试地点"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="ccps11">
        <el-input type="textarea" rows="5" v-model="form.ccps11" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">确定</el-button>
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import event from '../../common/js/event'
const SUCCESS_EVENT = 'invitation success'
const ERROR_EVENT = 'invitation error'

export default {
  name: 'xf-invitation',
  data() {
    return {
      dialogVisible: false,
      form: {
        acb210: '', // 岗位
        ccps03: '', // 面试时间
        ccps05: '', // 面试地点
        ccps11: '' // 面试备注
      },
      rules: {
        acb210: [{
          required: true,
          message: '请选择岗位',
          trigger: 'change'
        }],
        ccps03: [{
          required: true,
          message: '请选择面试时间',
          trigger: 'change'
        }],
        ccps05: [{
          required: true,
          message: '请输入面试地点',
          trigger: 'change'
        }, {
          max: 30,
          message: '最多30个字符',
          trigger: 'change'
        }],
        ccps11: [{
          max: 100,
          message: '最多100个字符',
          trigger: 'change'
        }]
      },
      list: [],
      formLoading: false,
      aac001: '',
      loading: false
    }
  },
  methods: {
    getPositionList() {
      this.formLoading = true
      this.$post('/service/business/corp/corpPositon/positionList.xf', {
        aab001: this.$userInfo.aab001,
        rowsNum: 1000,
        currentPage: 1,
        aab773: 1,
        acb208: 0
      }).then(res => {
        this.formLoading = false
        this.list = res.result
      }).catch(() => {
        this.formLoading = false
      })
    },
    show(aac001) {
      event.$off(SUCCESS_EVENT)
      event.$off(ERROR_EVENT)
      this.aac001 = aac001
      this.getPositionList()
      this.dialogVisible = true
      return new Promise((resolve, reject) => {
        event.$on(SUCCESS_EVENT, () => {
          event.$off(SUCCESS_EVENT)
          event.$off(ERROR_EVENT)
          resolve()
        })
        event.$on(ERROR_EVENT, err => {
          event.$off(SUCCESS_EVENT)
          event.$off(ERROR_EVENT)
          reject(err)
        })
      })
    },
    handleClose(done) {
      event.$emit(ERROR_EVENT)
      done()
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = Object.assign({
            aab001: this.$userInfo.aab001,
            aac001: this.aac001
          }, this.form)
          this.loading = true
          this.$post('/service/business/search/stuApplyJob/corpInterviewInvitation.xf', form).then(res => {
            this.loading = false
            if (res.error && res.error.result === 1) {
              this.$message({
                message: res.error.message,
                type: 'success'
              })
              this.dialogVisible = false
              event.$emit(SUCCESS_EVENT)
            } else {
              event.$emit(ERROR_EVENT)
            }
          }).catch(() => {
            this.loading = false
            event.$emit(ERROR_EVENT)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../common/style/variables";
  .form{
    width: 385px;
  }
  .el-input,.el-select{
    width: 100%;
  }
</style>
