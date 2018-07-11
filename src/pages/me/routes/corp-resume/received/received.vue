<template>
  <div class="received">
    <el-form inline class="demo-form-inline">
      <el-form-item>
        <el-select v-model="form.bca111" placeholder="请选择岗位分类" clearable>
          <el-option :label="val.bca112" :value="val.bca111" :key="val.bca111" v-for="val in positionList"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.ccpj03" placeholder="请选择查看状态" clearable>
          <el-option label="已查看" value="1"></el-option>
          <el-option label="未查看" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="form.aac003" placeholder="请输入求职者姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
      </el-form-item>
      <el-form-item>
        <span>未查看简历数量 <span class="red">{{corpNoResumeCount}}</span> 已查看简历数量 <span class="red">{{corpResumeCount}}</span></span>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      stripe
      v-loading="loading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="姓名">
        <template slot-scope="scope">
          <a target="_blank" :href="'personalInfo.html?aac001=' + scope.row.aac001">{{scope.row.aac003 || '--'}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="应聘岗位">
        <template slot-scope="scope">
          <span>{{scope.row.cca113 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sexName || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="年龄">
        <template slot-scope="scope">
          <span>{{scope.row.age || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="学历">
        <template slot-scope="scope">
          <span>{{scope.row.eac011 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="专业名称">
        <template slot-scope="scope">
          <span>{{scope.row.aac040 || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="160px"
        label="投递时间">
        <template slot-scope="scope">
          <span>{{scope.row.ccpj02 || '--'}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        align="center"
        label="查看状态">
        <template slot-scope="scope">
          <span>{{scope.row.ccpj03Name || '&#45;&#45;'}}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span :class="scope.row.ccpj03 === 0 ? '' : scope.row.ccpj05 === 0 ? 'green' : scope.row.ccpj05 === 2 ? 'warn' : 'red'">{{scope.row.ccpj03 === 0 ? scope.row.ccpj03Name : (scope.row.ccpj05Name || '--')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="handleCommand">
            <el-button type="text">标记<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="scope.row.ccpj01 + ',' + 0">已通知</el-dropdown-item>
              <el-dropdown-item :command="scope.row.ccpj01 + ',' + 1">不合适</el-dropdown-item>
              <el-dropdown-item :command="scope.row.ccpj01 + ',' + 2">待定</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div class="edit" v-if="list.length">
      <el-dropdown @command="handleCommand2">
        <el-button type="primary" size="mini">
          标记<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">已通知</el-dropdown-item>
          <el-dropdown-item command="1">不合适</el-dropdown-item>
          <el-dropdown-item command="2">待定</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="page">
      <pagination :bean="pageBean" @current-change="handlePage"></pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {Pagination},
  data() {
    return {
      form: {
        aab001: this.$userInfo.aab001,
        rowsNum: 10,
        currentPage: 1,
        bca111: '', // 岗位分类
        ccpj03: '', // 查看状态
        aac003: '' // 求职者姓名
      },
      positionList: [],
      list: [],
      pageBean: {},
      corpNoResumeCount: '',
      corpResumeCount: '',
      loading: false,
      checked: []
    }
  },
  methods: {
    getPositionList() {
      this.$post('/service/business/corp/corpPositon/positionList.xf', {
        aab001: this.$userInfo.aab001,
        rowsNum: 1000,
        currentPage: 1,
        aab773: 1,
        acb208: 0,
        remark: 1
      }).then(res => {
        this.positionList = res.result
      })
    },
    onSubmit() {
      this.form.currentPage = 1
      this.getList()
    },
    getList() {
      this.loading = true
      this.$post('/service/business/corpResume/corpReceivedResume/getResumeList.xf', this.form).then(res => {
        this.loading = false
        this.list = res.result.list || []
        this.corpNoResumeCount = res.result.corpNoResumeCount
        this.corpResumeCount = res.result.corpResumeCount
        this.pageBean = res.pageBean
      }).catch(() => {
        this.loading = false
      })
    },
    sign(ccpj01, ccpj05) {
      this.$post('/service/business/corpResume/corpReceivedResume/getResumeSign.xf', {
        ccpj01,
        ccpj05 // 标记状态
      }).then(res => {
        if (res.error && res.error.result === 1) {
          this.$message({
            message: res.error.message,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    handleCommand(cmd) {
      const arr = cmd.split(',')
      this.sign(arr[0], arr[1])
    },
    handleCommand2(cmd) {
      if (!this.checked.length) return
      this.sign(this.checked.join(','), cmd)
    },
    handleSelectionChange(selections) {
      this.checked = selections.map(item => item.ccpj01)
    },
    handlePage(page) {
      this.form.currentPage = page
      this.getList()
    }
  },
  created() {
    this.getPositionList()
    this.onSubmit()
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .demo-form-inline{
    padding: 15px 0 0 15px;
    font-size: 14px;
  }
  .red{
    color: red;
  }
  .green{
    color: green;
  }
  .warn{
    color: #e6a23c;
  }
  .edit{
    padding: 15px 0;
  }
  .page{
    padding: 15px 0;
    text-align: center;
  }
</style>
