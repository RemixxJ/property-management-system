<template>
  <section class="super-administrator">
    <div style="width:90%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="帅不帅" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.handsome }}</span>
          </template>
        </el-table-column>
        <el-table-column label="高不高" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tall }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
     <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-sizes="[5,10]" :page-size="pageSize" background layout="sizes,prev, pager, next,total" :total="total" style="margin:20px auto;text-align:center;">
      </el-pagination>
    </div>
    <el-button class="add" size="mini" type="success" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
import { adminAdd, adminDel, adminQuery } from '@/api/superAdminLogin.js'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        nickname: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: []
    }
  },
  created() {
    this.getData()
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
    },
    async getData() {
      //请求获取全部表格数据
      let res = await adminQuery()
      console.log(res)
      //表格数据赋值给data
      this.data = res.data.data
      //表格数据总条数
      this.total = this.data.length
      //分页条件过滤 根据当前页码 curPage和每页数量pageSize 来做分页展示
      this.tableData = this.data.filter((item, i) => {
        if (i < this.pageSize) {
          return item
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
      let params = { id: row.id }
      adminDel(params).then((res) => {
        this.$message.success('删除成功')
        this.getData()
      })
    },
    handleAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          adminAdd(this.form).then((res) => {
            this.dialogFormVisible = false
            this.$message.success('新增成功')
            this.getData()
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
    }
  }
}
</script>
<style lang="less" scoped>
.super-administrator {
  display: flex;
  .add {
    width: 5%;
    height: 30px;
    display: block;
    margin: 1% 2%;
  }
}
</style>
