<template>
  <div class="invitation">
    <el-table
      :data="list"
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        label="岗位名称">
        <template slot-scope="scope">
          <a target="_blank" :href="'job.html?acb210=' + scope.row.acb210" :title="scope.row.cca113">{{scope.row.cca113 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单位名称">
        <template slot-scope="scope">
          <a target="_blank" :href="'corp.html?aab001=' + scope.row.aab001" :title="scope.row.aab004">{{scope.row.aab004 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160"
        label="面试时间">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="详细信息"
            width="300"
            trigger="hover"
            :disabled="!scope.row.ccps03">
            <el-form label-position="left" class="popover-form">
              <el-form-item label="面试时间">
                <span class="form-item">{{scope.row.ccps03 || '--'}}</span>
              </el-form-item>
              <el-form-item label="面试地点">
                <span class="form-item">{{scope.row.ccps05 || '--'}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span class="form-item">{{scope.row.ccps11 || '--'}}</span>
              </el-form-item>
            </el-form>
            <span :title="scope.row.ccps03" slot="reference">{{scope.row.ccps03 || '--'}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="面试地点">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="详细信息"
            width="300"
            trigger="hover"
            :disabled="!scope.row.ccps03">
            <el-form label-position="left" class="popover-form">
              <el-form-item label="面试时间">
                <span class="form-item">{{scope.row.ccps03 || '--'}}</span>
              </el-form-item>
              <el-form-item label="面试地点">
                <span class="form-item">{{scope.row.ccps05 || '--'}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span class="form-item">{{scope.row.ccps11 || '--'}}</span>
              </el-form-item>
            </el-form>
            <span class="ellipsis" :title="scope.row.ccps05" slot="reference">{{scope.row.ccps05 || '--'}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="备注">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="详细信息"
            width="300"
            trigger="hover"
            :disabled="!scope.row.ccps03">
            <el-form label-position="left" class="popover-form">
              <el-form-item label="面试时间">
                <span class="form-item">{{scope.row.ccps03 || '--'}}</span>
              </el-form-item>
              <el-form-item label="面试地点">
                <span class="form-item">{{scope.row.ccps05 || '--'}}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span class="form-item">{{scope.row.ccps11 || '--'}}</span>
              </el-form-item>
            </el-form>
            <span class="ellipsis" slot="reference">{{scope.row.ccps11 || '--'}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="回复状态">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            title="备注"
            width="200"
            trigger="hover"
            :disabled="!scope.row.isaccept">
            <p>{{scope.row.ccps12}}</p>
            <span slot="reference" :class="scope.row.isaccept === 2 ? 'green' : scope.row.isaccept === 1 ? 'red' : ''">{{scope.row.isaccept === 2 ? '已接受' : scope.row.isaccept === 1 ? '已拒绝' : '未回复'}}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
    <el-dialog
      title="回复"
      :visible.sync="dialogVisible"
      width="400px">
      <el-form :model="form" ref="form" label-width="75px">
        <el-form-item label="是否接受" prop="isaccept">
          <el-radio v-model="form.isaccept" :label="2">接受</el-radio>
          <el-radio v-model="form.isaccept" :label="1">拒绝</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="ccps12">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入备注信息"
            v-model.trim="form.ccps12">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary" @click="onSubmit" size="mini" :loading="formLoading">确定</el-button>
          <el-button size="mini" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      loading: false,
      searchData: {
        aac001: this.$userInfo.aac001,
        rowsNum: 10,
        currentPage: 1
      },
      list: [],
      pageBean: {},
      dialogVisible: false,
      form: {
        ccps01: '',
        isaccept: 2, // 2为接受、1为拒绝
        ccps12: ''
      },
      formLoading: false
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$post('/service/business/person/personInterviewInvitation/getPersonInvitationList.xf', this.searchData).then(res => {
        this.loading = false
        this.list = res.result
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    handlePage(page) {
      this.searchData.currentPage = page
      this.getList()
    },
    edit(val) {
      this.form.ccps01 = val.ccps01
      this.form.isaccept = val.isaccept || 2
      this.form.ccps12 = val.ccps12 || ''
      this.dialogVisible = true
    },
    onSubmit() {
      this.formLoading = true
      const form = Object.assign({}, this.form)
      form.ccps12 = encodeURIComponent(form.ccps12)
      this.$post('/service/business/person/personInterviewInvitation/updateReplay', form).then(res => {
        this.formLoading = false
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
          this.cancel()
        }
      }).catch(() => {
        this.formLoading = false
      })
    },
    cancel() {
      this.dialogVisible = false
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .page{
    text-align: center;
    padding: 15px 0;
  }
  .ellipsis{
    display: inline-block;
    max-width: 100px;
    @include ellipsis;
  }
  .popover-form{
    label{
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item{
      margin-bottom: 5px;
    }
    .form-item{
      word-break: break-all;
      display: inline-block;
      max-width: 200px;
    }
  }
  .red{
    color: red;
  }
  .green{
    color: green;
  }
</style>
