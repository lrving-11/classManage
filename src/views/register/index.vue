<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="userInfoUserName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.userInfoUserName"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="userInfoCreatedClass">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-select
          name="doubleCreationClass"
          tabindex="4"
          auto-complete="on"
          v-model="registerForm.userInfoCreatedClass"
          placeholder="请选择"
          style="width: 93%"
        >
          <el-option
            v-for="item in doubleCreation"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="userInfoPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.userInfoPassword"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 确认密码-->
      <el-form-item prop="passwordCheck">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.passwordCheck"
          :type="passwordType"
          placeholder="确认密码"
          name="passwordCheck"
          tabindex="2"
          auto-complete="off"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleRegister"
        >注册</el-button
      >
      <div class="tips">
      </div>
      <router-link to="/login" tag="p" style="color: #ffffff"
        ><a>已有账号？登录！</a></router-link
      >
    </el-form>
  </div>
</template>

<script>
import { userRegister } from "@/api/login&register";
import DoubleCreation from "@/json/DoubleCreation.json";
// import { setUserId } from "@/utils/auth";

export default {
  // created() {
  //   console.log(setUserId,"uesrid");
  // },
  data() {
    const validateUserid = (rule, value, callback) => {
      console.log("userid", value);
      if (!value) {
        callback(new Error("请设置用户ID"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      console.log("username", value);
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validateDoubleCreationClass = (rule, value, callback) => {
      console.log(value, this.registerForm);
      if (!value) {
        callback(new Error("请选择班级名称"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      console.log("value", value);
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    const validatePasswordCheck = (rule, value, callback) => {
      console.log("value", value);
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        if (value !== this.registerForm.userInfoPassword) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      doubleCreation: DoubleCreation,
      registerForm: {
        userInfoCollege: "", //学院
        userInfoCreatedClass: "", //双创班
        userInfoId: 0,
        userInfoIsAdmin: false,
        userInfoIsFrozen: false,
        userInfoIsSuperAdmin: false,
        userInfoName: "", //姓名(弃用)
        userInfoPassword: "123456", //密码
        userInfoPhone: "", //电话
        userInfoTime: "",
        userInfoTimes: 0,
        userInfoToken: "",
        userInfoUserName: "", //用户名
        passwordCheck: "123456",
      },
      registerRules: {
        userInfoUserName: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        userInfoPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
        passwordCheck: [
          {
            required: true,
            trigger: "blur",
            validator: validatePasswordCheck,
          },
        ],
        userInfoCreatedClass: [
          {
            required: true,
            trigger: "change",
            validator: validateDoubleCreationClass,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      // redirect: undefined,
    };
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect;
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          userRegister(this.registerForm)
            .then((res) => {
              console.log("注册res", res);
              if (res.code === 200) {
                this.$message.success("注册成功!");
                setTimeout(() => {
                  this.$router.push("/login");
                }, 1000);
              } else {
                this.$message.error(`${res.msg}`);
              }
              this.loading = false;
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        } else {
          this.$message.error("注册失败,请检查用户名,密码和班级！");
          return false;
        }
      });
    },
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
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
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
