<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>黑马面经运营后台</template>
      <!-- model：指定一个数据对象，对象中的属性都会和表单元素双向绑定 -->
      <!-- rules：指定校验规则对象 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <!-- prop：指定该表单验证哪个值 -->
        <el-form-item label="用户名" prop="username">
          <!-- v-model：指定表单双向绑定的数据，来自于 model 指定的对象中的某个属性 -->
          <el-input
            placeholder="输入用户名"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="输入用户密码"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item class="tc">
          <el-button type="primary">登 录</el-button>
          <el-button>重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {},
    };
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