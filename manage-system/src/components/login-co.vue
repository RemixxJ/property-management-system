<template>
  <section class="login-co">
    <p class="title" v-if="login">{{ loginName }}登录</p>
    <p class="title" v-if="!login">{{ loginName }}注册</p>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" v-if="login" label-width="100px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn"
          >登陆</el-button
        >
        <el-button type="primary" @click="regname()" class="submit_btn" v-if="isShowReg"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
    <div v-if="!login && isShowReg">
      <el-form :model="regForm" :rules="regRules" ref="regForm" label-width="100px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="regForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input type="text" placeholder="昵称" v-model="regForm.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码" v-model="regForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="renpassword" label="确认密码">
          <el-input type="password" placeholder="确认密码" v-model="regForm.renpassword"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login = true" class="submit_btn">返回登陆</el-button>
          <el-button type="primary" @click="submitForm('regForm')" class="submit_btn"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>

import {
  superAdminLogin,
  cleaningStaffRegister,
  cleaningStaffLogin,
  administratorRegister,
  administratorLogin,
  maintenancePersonnelRegister,
  maintenancePersonnelLogin,
  securityGuardsRegister,
  securityGuardsLogin,
  userRegister,
  userLogin
} from '@/api/superAdminLogin'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'login-co',
  props: {
    loginName: { type: String, defaut: '' },
    isShowReg: { type: Boolean, defaut: true }
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      regForm: {
        username: '',
        password: '',
        nickname: '',
        renpassword: ''
      },
      regRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        renpassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
      },
      showLogin: false,
      login: true
    }
  },
  mounted() {
    this.showLogin = true
  },
  methods: {
    ...mapActions(['getAdminData']),
    // this.$router.push('manage');
    async submitForm(formName) {
      let that = this

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (formName == 'loginForm') {
            that.Login()
          } else if (formName == 'regForm') {
            that.Register()
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          })
          return false
        }
      })
    },
    async Login() {
      let params = { username: '', password: '' }
      params.username = this.loginForm.username
      params.password = this.loginForm.password
      let role = ''
      let dataBase = ''
      let res = {}
      let routerUrl = '/superAdministrator'
      switch (this.loginName) {
        case '超级管理员':
          res = await superAdminLogin(params)
          role = '超级管理员'
          dataBase = 'superadministrator'
          routerUrl = '/superAdministrator'
          break
        case '管理员':
          res = await administratorLogin(params)
          role = '管理员'
          dataBase = 'administrator'
          routerUrl = '/administratorUser'
          break
        case '用户':
          res = await userLogin(params)
          role = '用户'
          dataBase = 'user'
          routerUrl = '/userHouseMange'
          break
        case '维修人员':
          res = await maintenancePersonnelLogin(params)
          role = '维修人员'
          dataBase = 'maintenancePersonnel'
          routerUrl = '/maintenanceTodo'
          break
        case '安保人员':
          res = await securityGuardsLogin(params)
          role = '安保人员'
          dataBase = 'securityGuards'
          routerUrl = '/secutityTodo'
          break
        case '保洁人员':
          res = await cleaningStaffLogin(params)
          role = '保洁人员'
          dataBase = 'cleaningStaff'
          routerUrl = '/cleaningTodo'
          break
        default:
          break
      }

      if (res.data.code == 200) {
        this.$message({
          type: 'success',
          message: res.data.msg
        })
        res.data.data[0] = { ...res.data.data[0], role: role, dataBase: dataBase }
        //登录成功之后缓存用户信息
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        this.$router.push(routerUrl)
      } else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    },
    async Register() {
      let params = {
        username: '',
        password: '',
        repassword: '',
        nickname: '',
        status: '1',
        create_time: new Date().toLocaleString()
      }
      params.username = this.regForm.username
      params.password = this.regForm.password
      params.repassword = this.regForm.renpassword
      params.nickname = this.regForm.nickname
      let res = {}
      switch (this.loginName) {
        // case '超级管理员':
        //   break
        case '管理员':
          res = await administratorRegister(params)
          break
        case '用户':
          res = await userRegister(params)
          break
        case '维修人员':
          res = await maintenancePersonnelRegister(params)
          break
        case '安保人员':
          res = await securityGuardsRegister(params)
          break
        case '保洁人员':
          res = await cleaningStaffRegister(params)
          break
        default:
          break
      }

      if (res.data.code == 200) {
        this.$message({
          type: 'success',
          message: res.data.msg
        })
        // this.Login()
        this.regname()
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
      } else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    },

    regname() {
      this.login = !this.login
    }
  }
}
</script>

<style lang="less" scoped>
.login-co {
  width: 40vw;
  height: 50vh;
  margin: 0 auto;
  .title {
    margin-bottom: 10px;
    color: red;
  }
}
</style>
>
