<template>
  <div class="item">
    <div class="con" v-if="question.fkmsg">{{ question.fkmsg }}</div>
    <div class="action" v-else>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="text"> </el-input>
      <el-button type="success" @click="submit" size="mini">提交反馈</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'answer',
  props: {
    question: {
      type: Object,
      default: () => {
        return { fkmsg: '' }
      }
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submit() {
      console.log(this.text)
      let params = { ...this.question, fkmsg: this.text }
      this.$emit('submit', JSON.stringify(params))
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  .con {
    padding-left: 20px;
  }
  .action {
    display: flex;
    align-items: center;
    padding-left: 20px;
    .el-input {
      // width: 70%;
      flex: 1;
    }
    .el-button {
      width: 100px;
      height: 30px;
      margin: 0 10px;
    }
  }
}
</style>
