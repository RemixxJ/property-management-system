<template>
  <section class="super-administrator">
    <div style="width: 90%">
      <el-table :data="tableData" style="width: 100%" height="500" border>
        <el-table-column label="问题编号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问题" align="center">
          <template slot-scope="scope">
            <span style="margin-right: 10px">{{ scope.row.lymsg }}</span>
            <span
              class="el-icon-success"
              v-if="scope.row.fkmsg"
              style="color: #20e70e"
              >已读</span
            >
            <span class="el-icon-warning" v-else>未读</span>
          </template>
        </el-table-column>
        <el-table-column label="反馈" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fkmsg }}</span>
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
    <div>
      <el-button
        class="add"
        size="mini"
        type="success"
        @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <el-dialog title="新增问题" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="问题" :label-width="formLabelWidth" prop="lymsg">
          <el-input v-model="form.lymsg" autocomplete="off"></el-input>
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
import { messageQuery, messageAdd, messageUpdata } from '@/api/superAdminLogin'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        lymsg: ''
      },
      formLabelWidth: '180px',
      rules: {
        lymsg: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: []
    }
  },
  created() {
    this.messageQuery()
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
            username: JSON.parse(localStorage.getItem('userInfo'))[0].username
          }
          messageAdd(params).then((res) => {
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
            this.messageQuery()
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
    async messageQuery() {
      let res = await messageQuery()
      this.data = res.data.data.filter((item)=>{
        if(item.username == JSON.parse(localStorage.getItem('userInfo'))[0].username){
            return item
        }
      })
      this.total = this.data.length
      this.tableData = this.data.filter((item, i) => {
        if (i < this.pageSize) {
          return item
        }
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
