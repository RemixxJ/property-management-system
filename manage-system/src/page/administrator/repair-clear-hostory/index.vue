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
            <span>{{ scope.row.wxStatus == '1' ? '维修中' : '暂无维修' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="清洁状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.qjStatus == '1' ? '清洁中' : '暂无清洁' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="历史清洁图片" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.qjimg"
              style="width: 100px; height: 100px"
              :src="`http://localhost:3000/images/${scope.row.qjimg}`"
              :preview-src-list="[`http://localhost:3000/images/${scope.row.qjimg}`]"
            ></el-image>
            <span v-else>暂无图片</span>
          </template>
        </el-table-column>
        <el-table-column label="历史维修图片" align="center">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.wximg"
              style="width: 100px; height: 100px"
              :src="`http://localhost:3000/images/${scope.row.wximg}`"
              :preview-src-list="[`http://localhost:3000/images/${scope.row.wximg}`]"
            >
            </el-image>
            <span v-else>暂无图片</span>
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
  </section>
</template>

<script>
import { getMaintainHouse, adminHouseQuery } from '@/api/superAdminLogin.js'
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
    async getMaintainHouse() {
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
