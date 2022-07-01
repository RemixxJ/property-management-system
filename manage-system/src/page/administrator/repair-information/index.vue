<template>
  <section class="super-administrator">
    <div style="width:100%;height:60px">
      <el-input clearable placeholder="请输入门牌号" v-model="searchVal" size="mini" style="width:200px"></el-input>
      <el-button class="add" size="mini" type="success" @click="search">搜索</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" height="500" border>
        <el-table-column label="房屋编号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门牌号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dizhi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="维修状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.wxStatus=='1'?'维修中':'暂无维修' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="清洁状态" align="center">
          <template slot-scope="scope">
            <span>{{  scope.row.qjStatus=='1'?'清洁中':'暂无清洁' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否空闲" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.xzStatus=='1'?'已租':'空闲' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物业费到期时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dqTime }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-sizes="[5,10]" :page-size="pageSize" background layout="sizes,prev, pager, next,total" :total="total" style="margin:20px auto;text-align:center;">
      </el-pagination>
    </div>
    <el-dialog title="新增房屋" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="门牌号" :label-width="formLabelWidth" prop="dizhi">
          <el-input v-model="form.dizhi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否空闲" :label-width="formLabelWidth" prop="xzStatus">
          <el-input v-model="form.xzStatus" autocomplete="off"></el-input>
          <!-- <el-select v-model="form.xzStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="物业费到期时间" :label-width="formLabelWidth" prop="dqTime">
          <el-date-picker v-model="form.dqTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否公共区域" :label-width="formLabelWidth" prop="ggqy">
          <el-input v-model="form.ggqy" autocomplete="off"></el-input>
          <!-- <el-select v-model="form.ggqy" placeholder="请选择">
            <el-option label="否" value="0"> </el-option>
            <el-option label="是" value="1"> </el-option>
          </el-select> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd('addRef')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getMaintainHouse } from '@/api/superAdminLogin.js'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      tableData2: [],
      dialogFormVisible: false,
      form: {
        dizhi: '',
        dqTime: '',
        xzStatus: '',
        ggqy: ''
      },
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
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: [],
      searchVal: ''
    }
  },
  created() {
    this.getMaintainHouse()
  },
  methods: {
    // handleDelete(index, row) {
    //   adminHouseDel({ id: row.id }).then((res) => {
    //     this.$message.success('删除成功！')
    //     this.adminHouseQuery()
    //   })
    //   console.log(index, row)
    // },
    // handleAdd(formName) {
    //   this.$refs[formName].validate(async (valid) => {
    //     if (valid) {
    //       const params = {
    //         ...this.form,
    //         wxStatus: '',
    //         bxInfo: '',
    //         qjStatus: '',
    //         wximg: '',
    //         qjimg: ''
    //       }
    //       adminHouseAdd(params).then((res) => {
    //         this.$message.success('添加成功！')
    //         this.dialogFormVisible = false
    //         this.adminHouseQuery()
    //       })
    //     } else {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '请输入用户名和密码',
    //         offset: 100
    //       })
    //       return false
    //     }
    //   })
    // },
    async getMaintainHouse() {
      const res = await getMaintainHouse()
      console.log(res)
      this.data = res.data.data
      this.total = this.data.length
      this.tableData = this.data.filter((item, i) => {
        if (i < this.pageSize) {
          return item
        }
      })
      this.tableData2 = this.tableData
    },
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
    }
  }
}
</script>
<style lang="less" scoped>
.super-administrator {
  // display: flex;
}
</style>
