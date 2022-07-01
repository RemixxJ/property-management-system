<template>
  <section class="super-administrator">
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
          <span>{{ scope.row.wxStatus == '1' ? '维修中' : '暂无维修' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="add" size="mini" type="success" @click="handleRepair(scope.row)"
            >维修上报</el-button
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
    <el-dialog title="维修上报" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="addRef" :rules="rules">
        <el-form-item label="维修状态" :label-width="formLabelWidth" prop="wxStatus">
          <el-cascader :options="optionswx" v-model="form.wxStatus"> </el-cascader>
        </el-form-item>
        <el-form-item label="清洁状态" :label-width="formLabelWidth" prop="qjStatus">
          <el-cascader :options="optionsqj" v-model="form.qjStatus"> </el-cascader>
        </el-form-item>
        <el-form-item label="维修图片上传" :label-width="formLabelWidth" prop="wximg">
          <el-upload
            action="/upload"
            :auto-upload="false"
            list-type="picture-card"
            :on-change="uploadImg"
            :on-remove="handleRemove"
            :on-success="fileSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { getMaintainHouse, adminHouseEdit } from '@/api/superAdminLogin.js'
import axios from 'axios'
export default {
  name: 'super-administrator',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        wxStatus: '',
        qjStatus: '',
        wximg: []
      },
      formLabelWidth: '180px',
      rules: {
        wxStatus: [{ required: true, message: '请输入', trigger: 'blur' }],
        qjStatus: [{ required: true, message: '请选择', trigger: 'blur' }],
        wximg: [{ required: false, message: '请上传', trigger: 'change' }]
      },
      optionsqj: [
        {
          value: '0',
          label: '暂无清洁'
        },
        {
          value: '1',
          label: '待清洁'
        }
      ],
      optionswx: [
        {
          value: '0',
          label: '维修完成'
        },
        {
          value: '1',
          label: '维修中'
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
    this.getMaintainHouse()
  },
  methods: {
    adminHouseEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.form = { ...this.form, wximg: this.form.wximg.toString() }
          const params = {
            ...this.curRow,
            ...this.form
          }
          adminHouseEdit(params).then((res) => {
            this.$message.success('更新成功！')
            this.dialogFormVisible = false
            this.getMaintainHouse()
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
    },
    handleRemove(file) {},
    fileSuccess(res, file) {
      this.form.wximg = this.form.wximg.push(res.data.data.fileId)
    },
    uploadImg(file) {
      console.log(file)
      let formData = new FormData()
      formData.append('file', file.raw)
      axios({
        method: 'post',
        url: '/upload',
        data: formData
      }).then((res) => {
        this.form.wximg.push(res.data.fileId)
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.super-administrator {
  // display: flex;
}
</style>
