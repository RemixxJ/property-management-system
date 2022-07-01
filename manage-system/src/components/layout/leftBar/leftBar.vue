<template>
  <el-menu router unique-opened background-color="#212a44" text-color="#fff" style="height: calc(100vh - 60px)" active-text-color="#ffd04b" :default-active="location.hash.split('/')[1]">
    <blockquote v-for="item in menuData" :key="item.name">
      <el-menu-item :index="item.name" :route="item.path" v-if="!item.children">
        <i class="el-icon-location"></i>
        <span>{{ item.text }}</span>
      </el-menu-item>
      <el-submenu :index="item.name" v-else>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.text }}</span>
        </template>
        <blockquote v-for="sub in item.children" :key="sub.name">
          <el-menu-item :index="sub.name" :route="sub.path">
            {{ sub.text }}
          </el-menu-item>
        </blockquote>
      </el-submenu>
    </blockquote>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      theme2: 'dark',
      menuData: [],
      location: window.location
    }
  },
  computed: {},
  methods: {},
  created() {
    // this.menuData = this.$menuData
    localStorage.getItem('userInfo')
    const menuName = JSON.parse(localStorage.getItem('userInfo'))[0].dataBase
    this.menuData = this.$menuData.filter((item) => {
      if (item.name === menuName) {
        return item
      }
    })
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  // height: calc(100vh - 60px);
  background-color: #212a44;
  height: auto !important;
  .el-menu--inline {
    height: auto;
  }
  .el-menu-item {
    background-color: #212a44;
  }
  .el-submenu {
    background-color: #212a44;
  }
}
</style>
