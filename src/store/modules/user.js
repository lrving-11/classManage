import { login, adminLogin, superAdminLogin } from "@/api/login&register";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  getDoubleCreationClass,
  removeUserInfo,
  setDoubleCreationClass,
  setUserCollege,
  getUserCollege,
  getAdminUserName,
  setAdminUserName,
} from "@/utils/auth";
import router, { resetRouter } from "@/router";
import user2 from "@/store/modules/user2";

import store from "@/store";
import { push } from "echarts/src/component/dataZoom/history";
import fa from "element-ui/src/locale/lang/fa";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUserInfo().username,
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    doubleCreationClassName: getDoubleCreationClass(),
    userCollege: getUserCollege(),
    adminUserName: getAdminUserName(),
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 用户名
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  set_adminUserName(state, adminUserName) {
    state.adminUserName = adminUserName;
  },
};

const actions = {
  // user login(普通用户登录)
  login({ commit }, userInfo) {
    console.log("开始登陆");
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login(password, username.trim())
        .then((res) => {
          console.log("res", res.data);
          // 关闭管理员权限,动态路由
          user2.commit("SET_ISSUPERADMIN", false);
          user2.commit("SET_ISADMIN", false);
          // 更新路由
          router.dynamicRouter();
          // setAdminUserName(res.data.doubleCreationClass);
          // 为user2添加name属性
          // user2.commit("SET_NAME", res.data.title);
          // 为user2添加role属性
          // user2.commit("SET_ROLE", res.data.role);
          // console.log(user2.getters.getRole);
          // console.log(res);
          // const { data } = res;

          commit("SET_TOKEN", res.data.userInfoToken);
          commit("SET_NAME", res.data.userInfoUserName);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          setToken(res.data.userInfoToken);

          // 将数据存储在cookie中
          setUserInfo(
            res.data.userInfoUserName,
            res.data.userInfoIsAdmin,
            res.data.userInfoIsSuperAdmin,
            // res.data.title,
            // res.data.role,
            res.data.userInfoCreatedClass,
            res.data.userInfoCollege
          );
          resolve(res);
        })
        .catch((error) => {
          console.log(400);
          reject(error);
        });
    });
  },

  // user login(管理员用户登录)
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      adminLogin(password, username.trim())
        .then((res) => {
          // 给与管理员权限
          console.log("管理员res",res);
          user2.commit("SET_ISADMIN", true);
          user2.commit("SET_ISSUPERADMIN", false);
          // 更新路由
          router.dynamicRouter();
          //
          setAdminUserName(res.data.adminUserName);

          commit("set_adminUserName", res.data.adminUserName);
          commit("SET_TOKEN", res.data.adminToken);
          commit("SET_NAME", res.data.adminName);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          setToken(res.data.adminToken);
          // console.log("userinfo");
          // 将数据存储在cookie中
          setUserInfo(
            // res.data.id, //?????
            res.data.adminUserName,
            res.data.adminIsAdmin,
            res.data.adminIsSuperAdmin,
            // res.data.title,
            // res.data.role,
            res.data.adminCreatedClass,
            res.data.adminCollege
          );
          // console.log(getDoubleCreationClass());
          // console.log(getUserCollege());

          resolve(res);
        })
        .catch((error) => {
          console.log(400);
          reject(error);
        });
    });
  },

  // user login(超级管理员用户登录)
  superAdminLogin({ commit }, userInfo) {
    const { username, password } = userInfo;
    // console.log(username,password,"username   password");
    return new Promise((resolve, reject) => {
      
      superAdminLogin(password, username)
        .then((res) => {
          // 给与管理员权限
          console.log(res,"超管登录res");
          if (res.data.adminIsSuperAdmin === true) {
            user2.commit("SET_ISSUPERADMIN", true);
            user2.commit("SET_ISADMIN", true);
          }
          // 更新路由
          router.dynamicRouter();
          //
          setAdminUserName("superAdmin");

          commit("set_adminUserName", res.data.adminUserName);
          commit("SET_TOKEN", res.data.adminToken);
          commit("SET_NAME", res.data.adminUserName);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          setToken(res.data.adminToken);
          // console.log("userinfo");
          // 将数据存储在cookie中
          setUserInfo(
            // res.data.adminId,
            "superAdmin",
            res.data.adminIsAdmin,
            res.data.adminIsSuperAdmin,
            // res.data.title,
            // res.data.role,
            res.data.userInfoCreatedClass,
            res.data.userInfoCollege
          );

          // 双创班设置为超级管理员 (放到底部，避免被res覆盖)
          setDoubleCreationClass("superAdmin");
          setUserCollege("superAdmin");
          // ↑↑↑↑↑这是什么
          resolve(res);
        })
        .catch((error) => {
          console.log(400);
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then((res) => {
    //       const { data } = res;

    //       if (!data) {
    //         return reject("Verification failed, please Login again.");
    //       }

    //       const { name, avatar } = data;

    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token)
      //     .then(() => {
      //         removeToken(); // must remove  token  first
      //         resetRouter();
      //         commit("RESET_STATE");
      //         resolve();
      //     })
      //     .catch((error) => {
      //         reject(error);
      //     });
      removeToken(); // must remove  token  first
      removeUserInfo();
      resetRouter();
      router.options.routes = [];
      // commit("SET_NAME", "");
      // commit("SET_AVATAR", "");
      // commit("RESET_STATE");
      // // 清理权限，并更新路由
      // user2.commit("SET_ISSUPERADMIN", false);
      // user2.commit("SET_ISADMIN", false);
      // router.dynamicRouter();
      //
      router.push("/login");
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

const getters = {
  getIsSuperAdmin(state) {
    return 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
