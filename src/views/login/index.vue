<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">双创班毕业生就业管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item style="border: 0; background-color: transparent">
        <el-radio-group v-model="isAdminLogin" size="small">
          <el-radio-button label="0">普通用户</el-radio-button>
          <el-radio-button label="1">公司</el-radio-button>
          <el-radio-button label="2">超级管理员</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >
      <router-link to="/register" tag="p" style="color: #ffffff"
        ><a>还没有账号？注册一个！</a></router-link
      >
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import store from "@/store/modules/user2";
import { setAdminUserName } from "@/utils/auth.js";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写用户名"));
      } else {
        callback();
      }
    };
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error("密码长度不小于6位"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 是否是管理员登录，默认为普通登录(0)
      isAdminLogin: 0,
      loginForm: {
        username: "superAdmin",
        password: "superAdmin",
        // username: "admin",
        // password: "admin",
        // username: "zjx6",
        // password: "123456",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 5, message: "长度不小于5个字符", trigger: "blur" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 普通用户登录
          if (this.isAdminLogin.toString() === "0") {
            this.loading = true;
            this.$store
              .dispatch("user/login", this.loginForm)
              .then((res) => {
                // this.$router.dynamicRouter();
                //    更新路由
                console.log("aa", res.data);
                // this.$store.state.user.adminUserName = res.data.id;
                // setAdminUserName(res.data.id);
                this.$router.dynamicRouter();
                // 跳转到之前跳转的页面或主页
                this.$router.push({
                  path: this.redirect || "/",
                });
                this.loading = false;
              })
              .catch((err) => {
                console.log(err);
                this.loading = false;
              });
            // 普通管理员登录
          } else if (this.isAdminLogin.toString() === "1") {
            console.log("管理员登录");
            this.loading = true;
            this.$store
              .dispatch("user/adminLogin", this.loginForm)
              .then((res) => {
                // store.commit(
                //     "setAdminUserName",
                //     res.data.username
                // );
                // this.$store.state.user.adminUserName =
                //   res.data.doubleCreationClass;
                // setAdminUserName(res.data.doubleCreationClass);
                this.$router.dynamicRouter();
                // console.log(this.redirect);
                this.$router.push({
                  path: this.redirect || "/",
                });
                this.loading = false;
              })
              .catch((err) => {
                console.log(err);
                this.loading = false;
              });
            //   超级管理员登录
          } else if (this.isAdminLogin.toString() === "2") {
            console.log("超级管理员登录");

            this.loading = true;
            this.$store
              .dispatch("user/superAdminLogin", this.loginForm)
              .then((res) => {
                //   console.log("aa"+res.data.username);//undefined
                // this.$store.state.user.adminUserName = res.data.adminId;
                // console.log("登录用户名",res.data.username);
                // setAdminUserName(res.data.adminId);
                // console.log(this.$store.state.user);
                this.$router.dynamicRouter();
                this.$router.push({
                  path: this.redirect || "/",
                });
                this.loading = false;
              })
              .catch((err) => {
                console.log(err);
                this.loading = false;
              });

            console.log(
              this.$store.state.user.doubleCreationClassName,
              "这超级用户"
            );
          } else {
            this.$message.error(
              "出错，请联系超级管理员修复\n" + "出错 'this.isAdminLogin'"
            );
          }
        }
      });
    },
  },
  mounted() {
    // console.log(store.getters.getIsAdmin);
    // store.commit("SET_ISADMIN", true);
    // console.log(store.getters.getIsAdmin);
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #344864;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
