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
          <el-table-column label="车位编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车位号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dz }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否空闲" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isfull == '0' ? '空闲' : '已租' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.usePerson }}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lxfs }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到期时间" align="center">
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
    <el-dialog title="新增车位" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="车位号" :label-width="formLabelWidth" prop="dz">
          <el-input v-model="form.dz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否空闲" :label-width="formLabelWidth" prop="isfull">
          <el-cascader :options="options" v-model="form.isfull"> </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd('addRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑车位信息" :visible.sync="editDailogVisible">
      <div class="body">
        <el-form :model="editform" ref="editRef" :rules="rules">
          <el-form-item label="分配用户" :label-width="formLabelWidth">
            <el-cascader :options="user" :props="optionProps" v-model="editform.username">
            </el-cascader>
          </el-form-item>
          <el-form-item label="到期时间" :label-width="formLabelWidth" prop="dqTime">
            <el-date-picker
              v-model="editform.dqTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth" prop="lxfs">
            <el-input v-model="editform.lxfs" autocomplete="off"></el-input>
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
  adminParkingQuery,
  adminParkingAdd,
  adminParkingEdit,
  userQuery,
  adminParkingDel,
  adminParkingQueryFL
} from '@/api/superAdminLogin.js'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      tableData2: [],
      editDailogVisible: false,
      dialogFormVisible: false,
      form: {
        dz: '',
        isfull: '',
        usePerson: ''
      },
      editform: {
        username: '',
        dqTime: '',
        lxfs: ''
      },
      options: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      optionProps: {
        value: 'username',
        label: 'username'
      },
      formLabelWidth: '180px',
      //验证form规则   是否必填  提示语句  触发方式等 
      rules: {
        dz: [{ required: true, message: '请输入', trigger: 'blur' }],
        dqTime: [{ required: true, message: '请选择', trigger: 'blur' }],
        isfull: [{ required: true, message: '请选择', trigger: 'blur' }],
        usePerson: [{ required: false, message: '请选择', trigger: 'blur' }],
        lxfs: [{ required: true, message: '请选择', trigger: 'blur' }],
        username: [{ required: true, message: '请选择', trigger: 'change' }]
      },
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
    this.adminParkingQuery()
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
      adminParkingDel({ id: row.id }).then((res) => {
        this.$message.success('删除成功！')
        this.adminParkingQuery()
      })
      console.log(index, row)
    },
    changeValue(val) {
      console.log(val, val)
      this.$forceUpdate()
    },
    async userQuery() {
      let res = await userQuery()
      console.log(res)
      this.user = res.data.data
      console.log(this.user, 'user')
    },
    handleEdit(row) {
      this.curRow = row
      this.editDailogVisible = true
    },
    search() {
      if (this.searchVal) {
        this.tableData = this.tableData2.filter((item) => {
          if (item.dz.indexOf(this.searchVal) !== -1) {
            return item
          }
        })
      } else {
        this.tableData = this.tableData2
      }
    },
    editEnsure() {
      const params = {
        ...this.curRow,
        ...this.editform,
        usePerson: this.editform.username.toString(),
        isfull: '1'
      }
      adminParkingEdit(params).then((res) => {
        this.$message.success('分配成功')
        this.editDailogVisible = false
        this.adminParkingQuery()
      })
    },
    handleAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.form
          }
          adminParkingAdd(params).then((res) => {
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.adminParkingQuery()
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
    async adminParkingQuery() {
      const res = await adminParkingQuery()
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
    },
    async initEcharts() {
      let res = await adminParkingQueryFL()
      let data = [
        {
          value: res.data.data.xzNums,
          name: '车位空闲数量'
        },
        {
          value: res.data.data.fxzNums,
          name: '车位出租数量'
        }
      ]
      let option = {
        title: {
          text: '车位情况详情表',
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
            name: '车位情况详情表',
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
      this.pieEcharts = this.$echarts.init(this.$refs.pieEcharts)
      this.pieEcharts.setOption(option)
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
