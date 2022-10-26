<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>黑马面经运营后台</template>
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <el-form-item label="用户名" prop="username">
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
          <el-button type="primary" @click="login">登 录</el-button>
          <el-button @click="reset">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"],
          },
          {
            min: 5,
            max: 11,
            message: "用户名必须是5-11位的字符",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^\w{5,11}$/,
            message: "密码必须是5-10位的数字字母下划线",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginRef.resetFields();
    },
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (valid) {
          const res = await login(this.loginForm);
          this.$message.success("登陆成功");
          this.$store.commit("user/setToken", res.data.token);
          this.$router.push("/");
        } else {
        }
      });
    },
  },
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