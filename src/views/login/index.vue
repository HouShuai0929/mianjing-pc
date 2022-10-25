<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>黑马面经运营后台</template>
      <span>表单区域</span>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  // 利用 flex 控制水平垂直居中
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    // 深度作用选择器  ::v-deep  /deep/
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>