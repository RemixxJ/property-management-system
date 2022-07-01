<template>
  <section class="super-administrator">
    <div style="width: 90%">
      <el-table :data="tableData" style="width: 100%" height="700" border>
        <el-table-column label="车牌号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.card }}</span>
          </template>
        </el-table-column>
        <el-table-column label="进入时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jrtime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否公司员工" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.isgsyg == '1' ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.lxfs }}</span>
          </template>
        </el-table-column>
        <el-table-column label="安保人员" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
    <!-- <div>
      <el-button class="add" size="mini" type="success" @click="dialogFormVisible = true">添加</el-button>
    </div> -->
    <el-dialog title="新增车辆信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="车牌号" :label-width="formLabelWidth" prop="card">
          <el-input v-model="form.card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="到期时间" :label-width="formLabelWidth" prop="jrtime">
          <el-date-picker
            v-model="form.jrtime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否访客" :label-width="formLabelWidth" prop="isgsyg">
          <el-input v-model="form.isgsyg" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="lxfs">
          <el-input v-model="form.lxfs" autocomplete="off"></el-input>
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
import { carInfoQuery, carInfoAdd, carInfoDel } from '@/api/superAdminLogin'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        card: '',
        jrtime: '',
        isgsyg: '',
        lxfs: ''
      },
      formLabelWidth: '180px',
      rules: {
        card: [{ required: true, message: '请输入', trigger: 'blur' }],
        jrtime: [{ required: true, message: '请选择', trigger: 'blur' }],
        isgsyg: [{ required: true, message: '请选择', trigger: 'blur' }],
        lxfs: [{ required: false, message: '请选择', trigger: 'blur' }]
      },
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: []
    }
  },
  created() {
    this.getcarInfoQuery()
  },
  methods: {
    handleDelete(index, row) {
      carInfoDel({ id: row.id }).then((res) => {
        this.$message.success('删除成功！')
        this.getcarInfoQuery()
      })
      console.log(index, row)
    },
    handleAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.form,
            lktime: ''
          }
          carInfoAdd(params).then((res) => {
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.getcarInfoQuery()
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
    getcarInfoQuery() {
      console.log(carInfoQuery)
      carInfoQuery({}).then((res) => {
        console.log(res)
        this.data = res.data.data.filter((item, i) => {
          if (item.user) {
            return item
          }
        })
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
  display: flex;
}
</style>
