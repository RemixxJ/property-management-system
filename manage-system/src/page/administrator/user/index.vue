<template>
  <section class="user">
    <div style="width:100%;height:60px">
      <el-input clearable  placeholder="请输入用户名" v-model="searchVal" size="mini" style="width:200px"></el-input>
      <el-button class="add" size="mini" type="success" @click="search">搜索</el-button>
      <el-button class="add" size="mini" type="success" @click="dialogFormVisible = true">添加</el-button>
    </div>

    <div style="display:flex;">
      <div style="width:45%;">
        <el-table :data="tableData">
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="action">
                <!-- <el-button size="mini" type="primary" @click="handleViews(scope.$index, scope.row)"
              >查看</el-button
            > -->
                <el-button align="center" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="curPage" :page-sizes="[5,10]" :page-size="pageSize" background layout="sizes,prev, pager, next,total" :total="total" style="margin:20px auto;text-align:center;">
        </el-pagination>
      </div>
      <div class="info">
        <div class="opinion">
          <el-collapse v-model="activeNames">
            <el-collapse-item class="item" v-for="(item, index) in opinion" :key="index" :title="index + 1 + '、' + item.lymsg" :name="index + 1">
              <Answer :question="item" :key="index" @submit="submit" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
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
    <el-dialog title="用户信息" :visible.sync="infoDialogVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import Answer from './answer.vue'
import {
  userAdd,
  userDel,
  userQuery,
  messageQuery,
  messageAdd,
  messageUpdata
} from '@/api/superAdminLogin.js'
export default {
  name: 'user',
  components: { Answer },
  data() {
    return {
      tableData: [],
      tableData2: [],
      dialogFormVisible: false,
      infoDialogVisible: false,
      searchVal: '',
      form: {
        username: '',
        password: '',
        nickname: '',
        status: '1',
        create_time: new Date().toLocaleString()
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
      },
      activeNames: ['1'],
      opinion: [
       
      ],
      total: 0,
      curPage: 1,
      pageSize: 5,
      data: []
    }
  },
  created() {
    this.getData()
    this.messageQuery()
  },
  watch: {},
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
    search() {
      if (this.searchVal) {
        this.tableData = this.tableData2.filter((item) => {
          if (item.username.indexOf(this.searchVal) !== -1) {
            return item
          }
        })
      } else {
        this.tableData = this.tableData2
      }
    },
    async messageQuery() {
      let res = await messageQuery()
      this.opinion = res.data.data
    },
    handleViews(index, row) {
      this.infoDialogVisible = true
    },
    async getData() {
      let res = await userQuery()
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
    handleDelete(index, row) {
      console.log(index, row)
      let params = { id: row.id ,user:row.username}
      userDel(params).then((res) => {
        this.$message.success('删除成功')
        this.getData()
      })
    },
    handleAdd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          userAdd(this.form).then((res) => {
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
    },
    submit(row) {
      let params = {
        ...JSON.parse(row)
      }
      messageUpdata(params).then((res) => {
        this.$message.success('反馈成功！')
        this.$nextTick(() => {
          this.messageQuery()
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  width: 100%;
  height: 100%;
  // display: flex;
  // justify-content: flex-start;
  // flex-wrap: nowrap;
  .el-table {
    width: 100%;
    .action {
      display: flex;
    }
  }
  .info {
    width: 50%;
    height: 100%;
    .add {
      width: 100px;
      height: 30px;
      display: block;
      margin: 1% 2%;
    }
    .opinion {
      padding: 0 10px;
      box-sizing: border-box;
      .item {
        // padding: 0 20px;
        // box-sizing: border-box;
      }
    }
  }
}
</style>
