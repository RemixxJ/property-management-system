<template>
  <section class="super-administrator">
    <el-table :data="tableData" style="width: 100%" height="500" border>
      <el-table-column label="门牌号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dizhi }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wxStatus=='1'?'维修中':'暂无维修' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="清洁状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qjStatus=='1'?'清洁中':'暂无清洁' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bxInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="物业费到期时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dqTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="add" size="mini" type="success" @click="handleRepair(scope.row)">报修</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-sizes="[5,10]" :page-size="pageSize" background layout="sizes,prev, pager, next,total" :total="total" style="margin:20px auto;text-align:center;">
    </el-pagination>
    <el-dialog title="新增保修" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="问题描述" :label-width="formLabelWidth" prop="bxInfo">
          <el-input v-model="form.bxInfo" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adminHouseEdit('addRef')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getUserHouse,
  adminHouseEdit,
  adminHouseDel
} from '@/api/superAdminLogin.js'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        bxInfo: ''
      },
      formLabelWidth: '180px',
      rules: {
        bxInfo: [{ required: true, message: '请选择', trigger: 'blur' }]
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
      curRow: {},
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: []
    }
  },
  created() {
    this.getUserHouse()
  },
  methods: {
    handleDelete(index, row) {
      adminHouseDel({ id: row.id }).then((res) => {
        this.$message.success('删除成功！')
        this.getUserHouse()
      })
      console.log(index, row)
    },
    adminHouseEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.curRow,
            ...this.form,
            wxStatus: '1'
          }
          adminHouseEdit(params).then((res) => {
            this.$message.success('上报成功！')
            this.dialogFormVisible = false
            this.getUserHouse()
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
    handleRepair(row) {
      this.dialogFormVisible = true
      this.curRow = row
    },
    getUserHouse() {
      let params = {
        usePerson: JSON.parse(localStorage.getItem('userInfo'))[0].username
      }
      getUserHouse(params).then((res) => {
        this.data = res.data.data
        this.total = this.data.length
        this.tableData = this.data.filter((item, i) => {
          if (i < this.pageSize) {
            return item
          }
        })
      })
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
    }
  }
}
</script>
<style lang="less" scoped>
.super-administrator {
  // display: flex;
}
</style>
