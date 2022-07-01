<template>
  <section class="super-administrator">
    <div style="width: 100%; height: 60px">
      <el-input
        clearable
        placeholder="请输入门牌号"
        v-model="searchVal"
        size="mini"
        style="width: 200px"
      ></el-input>
      <el-button class="add" size="mini" type="success" @click="search">搜索</el-button>
      <el-button class="add" size="mini" type="success" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <div class="administrator-top">
      <div style="width: 90%">
        <el-table :data="tableData" style="width: 100%" height="500" border>
       
          <el-table-column label="门牌号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dizhi }}</span>
            </template>
          </el-table-column>
          <el-table-column label="维修状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.wxStatus == '1' ? '维修中' : '暂无维修' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="清洁状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.qjStatus == '1' ? '清洁中' : '暂无清洁' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否空闲" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.xzStatus == '1' ? '已租' : '空闲' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.usePerson }}</span>
            </template>
          </el-table-column>
          <el-table-column label="物业费到期时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dqTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-sizes="[5, 10]"
          :page-size="pageSize"
          background
          layout="sizes,prev, pager, next,total"
          :total="total"
          style="margin: 20px auto; text-align: center"
        >
        </el-pagination>
      </div>
    </div>
    <div class="administrator-bottom">
      <div class="echarts" ref="pieEcharts"></div>
    </div>
    <el-dialog title="新增房屋" :visible.sync="dialogFormVisible">
      <div class="body">
        <el-form :model="form" ref="addRef" :rules="rules">
          <el-form-item label="门牌号" :label-width="formLabelWidth" prop="dizhi">
            <el-input v-model="form.dizhi" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否空闲" :label-width="formLabelWidth" prop="xzStatus">
            <el-cascader :options="options" v-model="form.xzStatus"> </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd('addRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑房屋信息" :visible.sync="editDailogVisible">
      <div class="body">
        <el-form :model="editform" ref="editRef" :rules="rules">
          <el-form-item label="分配用户" :label-width="formLabelWidth">
            <el-cascader :options="user" :props="optionProps" v-model="editform.username">
            </el-cascader>
          </el-form-item>
          <el-form-item label="物业费到期时间" :label-width="formLabelWidth" prop="dqTime">
            <el-date-picker
              v-model="editform.dqTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDailogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editEnsure">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  adminHouseQuery,
  adminHouseAdd,
  adminHouseEdit,
  userQuery,
  adminHouseDel,
  adminHouseQueryFL
} from '@/api/superAdminLogin.js'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      tableData2: [],
      dialogFormVisible: false,
      editDailogVisible: false,
      form: {
        dizhi: '',
        dqTime: '',
        xzStatus: '',
        ggqy: '0'
      },
      optionProps: {
        value: 'username',
        label: 'username'
      },
      editform: {
        username: '',
        dqTime: ''
      },
      curRow: {},
      formLabelWidth: '180px',
      rules: {
        dizhi: [{ required: true, message: '请输入', trigger: 'blur' }],
        dqTime: [{ required: true, message: '请选择', trigger: 'change' }],
        xzStatus: [{ required: true, message: '请选择', trigger: 'change' }],
        ggqy: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      options: [
        {
          value: '0',
          label: '空闲'
        },
        {
          value: '1',
          label: '已租'
        }
      ],
      options2: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      user: [],
      pieEcharts: null,
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: [],
      searchVal: ''
    }
  },
  created() {
    this.userQuery()
    this.adminHouseQuery()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.curPage = 1
      this.tableData = this.data.filter((item, i) => {
        if (i < this.pageSize) {
          return item
        }
      })
      this.tableData2 = this.tableData
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.curPage = val
      if (val >= 2) {
        this.tableData = this.data.filter((item, i) => {
          if (i > (val - 1) * this.pageSize - 1 && i < val * this.pageSize) {
            return item
          }
        })
      } else {
        this.tableData = this.data.filter((item, i) => {
          if (i < this.pageSize) {
            return item
          }
        })
      }
      this.tableData2 = this.tableData
    },
    handleDelete(index, row) {
      adminHouseDel({ id: row.id }).then((res) => {
        this.$message.success('删除成功！')
        this.adminHouseQuery()
      })
      console.log(index, row)
    },
    changeValue(val) {
      console.log(val, val)
      this.$forceUpdate()
    },
    async initEcharts() {
      //异步获取接口数据
      let res = await adminHouseQueryFL()
      //数据转换
      let data = [
        {
          value: res.data.data.xzNums,
          name: '房屋空闲数量'
        },
        {
          value: res.data.data.fxzNums,
          name: '房屋出租数量'
        }
      ]
      //echarts配置
      let option = {
        title: {
          text: '房屋情况详情表',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '房屋情况详情表',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      //初始化echarts  传入dom
      this.pieEcharts = this.$echarts.init(this.$refs.pieEcharts)
      //更新配置
      this.pieEcharts.setOption(option)
    },
    //userquery 查询所有用户
    async userQuery() {
      let res = await userQuery()
      console.log(res)
      this.user = res.data.data
      console.log(this.user, 'user')
    },
    search() {
      if (this.searchVal) {
        this.tableData = this.tableData2.filter((item) => {
          if (item.dizhi.indexOf(this.searchVal) !== -1) {
            return item
          }
        })
      } else {
        this.tableData = this.tableData2
      }
    },
    handleEdit(row) {
      this.curRow = row
      this.editDailogVisible = true
    },
    editEnsure() {
      const params = {
        ...this.curRow,
        ...this.editform,
        usePerson: this.editform.username.toString(),
        xzStatus: '1'
      }
      adminHouseEdit(params).then((res) => {
        this.$message.success('分配成功')
        this.editDailogVisible = false
        this.adminHouseQuery()
      })
    },
    handleAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.form,
            wxStatus: '',
            bxInfo: '',
            qjStatus: '',
            wximg: '',
            qjimg: '',
            wxPerson: '',
            usePerson: '',
            qjPerson: ''
          }
          adminHouseAdd(params).then((res) => {
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.adminHouseQuery()
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入用户名和密码',
            offset: 100
          })
          return false
        }
      })
    },
    async adminHouseQuery() {
      const res = await adminHouseQuery()
      console.log(res)
      this.data = res.data.data
      this.total = this.data.length
      this.tableData = this.data.filter((item, i) => {
        if (i < this.pageSize) {
          return item
        }
      })
      this.tableData2 = this.tableData
      this.initEcharts()
    }
  }
}
</script>
<style lang="less" scoped>
.super-administrator {
  .administrator-top {
    height: 60vh;
    display: flex;
  }
  .administrator-bottom {
    display: flex;
    align-items: center;
    .echarts {
      width: 400px;
      height: 300px;
    }
  }
}
</style>
