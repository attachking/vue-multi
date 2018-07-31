<template>
  <div class="job-edit">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="form" v-loading="formLoading">
      <el-button type="primary" class="show-history" @click="showHistory" v-if="!isEdit">提取历史岗位</el-button>
      <el-form-item label="岗位类别" prop="bca111">
        <xf-cascader placeholder="请选择岗位类别" :options="dictionaries.CRAFT_AS" :show-all-levels="false" v-model="form.bca111" :text.sync="form.bca112"></xf-cascader>
      </el-form-item>
      <el-form-item label="岗位名称" prop="cca113">
        <el-input v-model.trim="form.cca113" placeholder="请输入岗位名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="招聘人数" prop="acb21r">
        <el-input v-model.trim="form.acb21r" placeholder="请输入招聘人数" clearable></el-input>
      </el-form-item>
      <el-form-item label="失效日期" prop="aae031">
        <el-input v-model="form.aae031" disabled></el-input>
        <span class="tip red">默认有效期为90天</span>
      </el-form-item>
      <el-form-item label="学历要求" prop="aac011">
        <el-select v-model="form.aac011" placeholder="请选择学历要求" clearable>
          <el-option v-for="item in dictionaries.TAB_EDUCATION" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="薪资待遇" prop="acc034">
        <el-select v-model="form.acc034" placeholder="请选择薪资待遇" clearable>
          <el-option v-for="item in dictionaries.TAB_SALARY" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验" prop="acc217">
        <el-select v-model="form.acc217" placeholder="请选择工作经验" clearable>
          <el-option v-for="item in dictionaries.TAB_WORKYEARS" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业要求" prop="acc01g">
        <xf-cascader :options="dictionaries.tab_major_type" v-model="acc01g_1" placeholder="请选择专业要求(最多三个)" clearable></xf-cascader>
        <!--<span class="tip red">不选择即为无专业要求</span>-->
      </el-form-item>
      <el-form-item label="" prop="acc01g" v-if="acc01g_1">
        <xf-cascader :options="dictionaries.tab_major_type" v-model="acc01g_2" placeholder="请选择专业要求(最多三个)" clearable></xf-cascader>
      </el-form-item>
      <el-form-item label="" prop="acc01g" v-if="acc01g_2">
        <xf-cascader :options="dictionaries.tab_major_type" v-model="acc01g_3" placeholder="请选择专业要求(最多三个)" clearable></xf-cascader>
      </el-form-item>
      <el-form-item label="福利待遇" prop="acc214">
        <el-select
          v-model="form.acc214"
          multiple
          clearable
          collapse-tags
          placeholder="请选择福利待遇">
          <el-option
            v-for="item in dictionaries.TAB_WELFARE"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作地点" prop="acb202">
        <xf-cascader placeholder="请选择工作地点" :options="dictionaries.TAB_CITY3" v-model="form.acb202" :fulltext.sync="form.bcb202"></xf-cascader>
      </el-form-item>
      <el-form-item label="工作性质" prop="acb21i">
        <el-select v-model="form.acb21i" placeholder="请选择工作性质" clearable>
          <el-option v-for="item in dictionaries.TAB_NATURE" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="食宿情况" prop="acb228">
        <el-select v-model="form.acb228" placeholder="请选择食宿情况" clearable>
          <el-option v-for="item in dictionaries.TAB_SREQUIREMENT" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠政策" prop="favouredPolicy">
        <el-input v-model="form.favouredPolicy" placeholder="请输入优惠政策" clearable></el-input>
      </el-form-item>
      <el-form-item label="岗位描述" prop="cca114">
        <el-input type="textarea" :rows="6" v-model="form.cca114" placeholder="请输入岗位描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save" :loading="loading">提交</el-button>
        <el-button @click="$router.go(-1)" v-if="$route.query.acb210">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提取历史岗位"
      :visible.sync="dialogVisible"
      width="800px">
      <el-table
        :data="historyList"
        stripe
        v-loading="historyLoading"
        style="width: 100%">
        <el-table-column
          align="center"
          label="岗位名称"
          width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.cca113 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="160"
          align="center"
          label="使用日期">
          <template slot-scope="scope">
            <span>{{$dateFormat(scope.row.ccpr05, 'yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="工作经验">
          <template slot-scope="scope">
            <span>{{scope.row.acc218}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="招聘人数">
          <template slot-scope="scope">
            <span>{{scope.row.acb21r}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="90"
          label="学历">
          <template slot-scope="scope">
            <span>{{scope.row.aac012}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="110"
          label="薪资">
          <template slot-scope="scope">
            <span>{{scope.row.acc034Name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-download" size="mini" @click="pull(scope.row)" circle title="提取"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <pagination :bean="pageBean" @current-change="handleChange"></pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {echo} from '../../../../../common/js/utils'
import {mapGetters} from 'vuex'
import XfCascader from '../../../../../components/xf-cascader/xf-cascader.vue'
import Pagination from '../../../../../components/pagination/pagination.vue'

export default {
  components: {
    Pagination,
    XfCascader},
  computed: {
    ...mapGetters([
      'dictionaries'
    ])
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      formLoading: false,
      form: {
        bca111: '', // 岗位类别code
        bca112: '', // 岗位类别
        cca113: '', // 岗位名称
        acb21r: '', // 招聘人数
        aae030: '', // 发布日期
        aae031: '', // 失效日期（默认90天后失效）
        aac011: '', // 学历要求
        acc034: '', // 薪资要求
        acc217: '', // 工作经验
        acc01g: '', // 专业要求（可多选）
        acc214: [], // 福利待遇（可多选）
        acb202: '', // 工作地点code
        bcb202: '', // 工作地点
        acb21i: '', // 工作性质
        acb228: '', // 食宿情况
        cca114: '', // 岗位描述
        favouredPolicy: '' // 优惠政策
      },
      acc01g_1: '',
      acc01g_2: '',
      acc01g_3: '',
      rules: {
        bca111: [{
          required: true,
          message: '请选择岗位类别',
          trigger: 'change'
        }],
        cca113: [{
          required: true,
          message: '请输入岗位名称',
          trigger: 'blur'
        }, {
          max: 20,
          message: '最多20个字符',
          trigger: 'blur'
        }],
        acb21r: [{
          required: true,
          message: '请输入招聘人数',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (/^[1-9][0-9]{0,4}$/.test(value)) {
              callback()
            } else {
              callback(new Error('只能输入1-99999的数字'))
            }
          },
          trigger: 'blur'
        }],
        acc034: [{
          required: true,
          message: '请选择薪资待遇',
          trigger: 'change'
        }],
        acc217: [{
          required: true,
          message: '请选择工作经验',
          trigger: 'change'
        }],
        acb202: [{
          required: true,
          message: '请选择工作地点',
          trigger: 'change'
        }],
        acb21i: [{
          required: true,
          message: '请选择工作性质',
          trigger: 'change'
        }],
        acb228: [{
          required: true,
          message: '请选择食宿情况',
          trigger: 'change'
        }],
        cca114: [{
          required: true,
          message: '请输入岗位描述',
          trigger: 'change'
        }, {
          max: 500,
          message: '最多500个字符',
          trigger: 'change'
        }],
        favouredPolicy: [{
          max: 30,
          message: '最多30个字符',
          trigger: 'change'
        }]
      },
      // 提取历史岗位
      searchData: {
        rowsNum: 6,
        currentPage: 1,
        remark: 0,
        aab001: this.$userInfo.aab001
      },
      historyList: [],
      pageBean: {},
      historyLoading: false,
      isEdit: false
    }
  },
  methods: {
    handleRouter(router) {
      echo(this.form)
      if (router.query.acb210) {
        // 修改岗位
        this.getInfo(router.query.acb210)
        this.isEdit = true
      } else {
        echo(this.form)
        this.resetTime()
        this.isEdit = false
        this.form.acc214 = []
        this.acc01g_1 = ''
        this.acc01g_2 = ''
        this.acc01g_3 = ''
        setTimeout(() => {
          this.$refs.form.clearValidate()
        }, 20)
      }
    },
    // 重置开始/结束时间
    resetTime() {
      let now = new Date()
      this.form.aae030 = this.$dateFormat(now, 'yyyy-MM-dd')
      this.form.aae031 = this.$dateFormat(now.setTime(now.getTime() + 1000 * 60 * 60 * 24 * 90), 'yyyy-MM-dd')
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.query.acb210) {
            this.$confirm('编辑后需要重新审核，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(res => {
              this.onSubmit()
            })
          } else {
            this.onSubmit()
          }
        }
      })
    },
    onSubmit() {
      this.loading = true
      const form = Object.assign({
        aab001: this.$userInfo.aab001
      }, this.form)
      form.acc214 = form.acc214.sort((a, b) => a - b).join(',')
      if (this.$route.query.acb210) {
        form.acb210 = this.$route.query.acb210
      }
      if (this.$route.query.acb330) {
        form.acb330 = this.$route.query.acb330
      }
      if (this.$route.query.cczy01) {
        form.acb330 = this.$route.query.cczy01
      }
      let arr = []
      if (this.acc01g_1) {
        arr.push(this.acc01g_1)
      }
      if (this.acc01g_2) {
        arr.push(this.acc01g_2)
      }
      if (this.acc01g_3) {
        arr.push(this.acc01g_3)
      }
      form.acc01g = arr.join(',')
      this.$post('/service/business/corp/corpPositon/savePositionInfo', form).then(res => {
        this.loading = false
        if (res.error && res.error.result === 1) {
          this.$alert(res.error.message, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.go(-1)
            }
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getInfo(acb210, resetTime) {
      this.formLoading = true
      this.$post('/service/business/corp/corpPositon/editPositionInfo', {acb210}).then(res => {
        this.formLoading = false
        res.result.acc214 = res.result.acc214 ? res.result.acc214.split(',') : []
        res.result.aae031 = this.$dateFormat(res.result.aae031, 'yyyy-MM-dd')
        echo(this.form, res.result)
        if (res.result.acc01g) {
          let arr = res.result.acc01g.split(',')
          this.acc01g_1 = arr[0] || ''
          this.acc01g_2 = arr[1] || ''
          this.acc01g_3 = arr[2] || ''
        }
        if (resetTime) {
          // 如果是提取历史岗位，则重置岗位有效期
          this.resetTime()
        }
      }).catch(() => {
        this.formLoading = false
      })
    },
    showHistory() {
      this.dialogVisible = true
      this.searchData.currentPage = 1
      this.getHistoryList()
    },
    getHistoryList() {
      this.historyLoading = true
      this.$post('/service/business/corp/newPosition/getValidJobList.xf', this.searchData).then(res => {
        this.historyLoading = false
        this.pageBean = res.pageBean
        this.historyList = res.result
      }).catch(() => {
        this.historyLoading = false
      })
    },
    pull(val) {
      this.dialogVisible = false
      this.getInfo(val.acb210, true)
    },
    handleChange(page) {
      this.searchData.currentPage = page
      this.getHistoryList()
    }
  },
  created() {
    this.handleRouter(this.$route)
    this.$watch('$route', this.handleRouter)
    this.$watch('dictionaries', () => {
      setTimeout(() => {
        this.$refs.form.clearValidate()
      }, 20)
    })
  }
}
</script>
<style lang="scss" scoped>
  @import "../../../../../common/style/variables";
  .form{
    padding: 20px 0;
    position: relative;
    .el-input,.el-select,.el-cascader{
      width: 300px;
    }
    .location{
      margin: 0 0 0 10px;
    }
    .show-history{
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 5;
    }
  }
  .tip{
    margin: 0 0 0 10px;
  }
  .red{
    color: red;
  }
  .page{
    margin: 10px 0;
    text-align: center;
  }
</style>
