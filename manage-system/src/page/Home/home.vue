<template>
  <el-container>
    <el-header>
      <navBar></navBar>
      <div class="user-info">
        <i class="el-icon-user-solid"></i>
        <span>{{ user.sys_name != undefined ? user.sys_name : '' }}</span>
        <i class="el-icon-caret-bottom"></i>
        <div class="info-detail">
          <div class="box">
            <span class="title">用户信息</span>
            <div class="box-wrap">
              <i class="el-icon-user-solid"></i>
              <div class="i">
                <p>用户名：{{ user.username != undefined ? user.username : '' }}</p>
                <p>角色: {{ user.role != undefined ? user.role : '' }}</p>
              </div>
            </div>
          </div>
          <div class="btns">
            <el-button type="primary" @click="updatePaw" size="small">修改密码</el-button>
            <el-button type="primary" @click="loginout" size="small">退出登录</el-button>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px">
        <leftBar></leftBar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-dialog
      class="update-password-dialog"
      title="修改密码"
      :visible.sync="visible"
      width="30%"
      top="50px"
      @close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="password" label-width="120px" size="small">
        <el-form-item label="旧密码" prop="old">
          <el-input v-model="password.old" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new">
          <el-input v-model="password.new" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="conf">
          <el-input v-model="password.conf" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100px" @click="handleSave('form')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import leftBar from '@/components/layout/leftBar/leftBar'
import navBar from '@/components/layout/navBar/navBar'
import { changePassWord } from '@/api/superAdminLogin'
export default {
  data() {
    return {
      value: '',
      user: {
        ...JSON.parse(localStorage.getItem('userInfo'))[0]
      },
      visible: false,
      password: {
        old: '',
        new: '',
        conf: ''
      },
      rules: {
        old: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        new: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        conf: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    leftBar,
    navBar
  },
  methods: {
    clearAllCookie() {
      var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    },
    loginout() {
      localStorage.removeItem('userInfo')
      this.$router.replace('/login')
    },
    updatePaw() {
      this.visible = true
    },
    handleClose() {
      this.password = {
        old: '',
        new: '',
        conf: ''
      }
      this.visible = false
    },
    handleSave(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.password.old !== _this.user.password) {
            _this.$message.error('旧密码错误')
            return false
          }
          if (_this.password.new !== _this.password.conf) {
            _this.$message.error('两次新密码不一致')
            return false
          }

          if (_this.password.new.length < 6) {
            _this.$message.error('新密码位数未达到六位数')
            return false
          }
          _this.ajaxSavePaw()
        } else {
          return false
        }
      })
    },
    ajaxSavePaw() {
      const params = { ...this.user, password: this.password.new }
      let _this = this
      changePassWord(params)
        .then((res) => {
          _this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          _this.handleClose()
          _this.$router.replace('/login')
        })
        .catch((err) => {
          _this.$message({
            message: res.message,
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;

  .el-header {
    height: 58px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #202742;

    .nav-bar {
      height: 100%;
      display: flex;
      align-items: center;
      color: #fff;

      img {
        width: 60px;
        height: 60px;
      }
    }

    .user-info {
      height: 58px;
      display: flex;
      align-items: center;
      color: #fff;
      position: relative;

      span,
      i {
        margin-left: 8px;
      }

      .info-detail {
        display: none;
        position: absolute;
        width: 320px;
        padding: 10px;
        color: #333;
        background-color: #fff;
        top: 58px;
        right: 10px;
        border: 1px solid #eaeaea;
        z-index: 99999;
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px 0 15px 0;
        .box {
          .title {
            font-size: 16px;
          }
          .box-wrap {
            display: flex;
            align-items: flex-start;
            margin-top: 10px;
            .i {
              margin-left: 10px;
              p {
                font-size: 14px;
                margin: 4px;
              }
            }
          }
        }
        .btns {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 15px;
          .el-button {
            margin: 0 10px 0;
          }
        }
      }

      &:hover {
        .info-detail {
          display: block;
        }
      }
    }
  }
  .el-container {
    height: calc(100% - 60px);
    display: flex;
  }
  .el-aside {
    width: 260px;
    height: 100%;
    background-color: #212a44;
    overflow-x: hidden;
  }

  .el-main {
    width: 100%;
    height: 100%;
    background: #f1f2f5;
    padding: 10px;
  }
}

.update-password-dialog {
  .el-form {
    padding-right: 50px;
  }
}
</style>
