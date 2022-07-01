<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>写字楼物业管理系统</p>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="超级管理员" name="first">
            <div class="login-form">
               <LoginCo :loginName="'超级管理员'" :isShowReg="false" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="管理员" name="second">
             <LoginCo :loginName="'管理员'" :isShowReg="true" />
          </el-tab-pane>
          <el-tab-pane label="用户" name="third">
             <LoginCo :loginName="'用户'" :isShowReg="true" />
          </el-tab-pane>
          <el-tab-pane label="维修人员" name="fourth">
             <LoginCo :loginName="'维修人员'" :isShowReg="true" />
          </el-tab-pane>
          <el-tab-pane label="安保人员" name="five">
             <LoginCo :loginName="'安保人员'" :isShowReg="true" />
          </el-tab-pane>
          <el-tab-pane label="保洁人员" name="six">
             <LoginCo :loginName="'保洁人员'" :isShowReg="true" />
          </el-tab-pane>
        </el-tabs>

      
      </section>
    </transition>
  </div>
</template>

<script>
import LoginCo from '../../components/login-co.vue'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    LoginCo
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.login_page {
  background-color: #324057;
  width: 100vw;
  height: 100vh;
  padding-top: 30vh;
  box-sizing: border-box;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  // .wh(70vw, 40vh);
  // .ctp(320px, 210px);
  width: 70vw;
  height: 50vh;
  // padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  .submit_btn {
    width: 100%;
    font-size: 16px;
    margin-left: 0 !important;
    margin-bottom: 20px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
