import { login, adminLogin, superAdminLogin } from "@/api/login&register";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
} from "@/utils/auth";
import router, { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUserInfo().username,
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    doubleCreationClassName: getUserInfo().doubleCreationClass,
    userCollege: getUserInfo().userCollege,
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
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // (普通用户登录)
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login(password, username.trim())
        .then((res) => {
          let userData=res.data;
          console.log("普通用户登录",userData);
          // 关闭管理员权限,动态路由
          user2.commit("SET_ISSUPERADMIN", false);
          user2.commit("SET_ISADMIN", false);
          // 更新路由
          router.dynamicRouter();
          //存在store
          commit("SET_TOKEN", userData.userInfoToken);
          commit("SET_NAME", userData.userInfoUserName);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          // 将数据存储在cookie中
          setToken(userData.userInfoToken);
          setUserInfo(
            userData.userInfoUserName,
            userData.userInfoIsAdmin,
            userData.userInfoIsSuperAdmin,
            userData.userInfoCreatedClass,
            userData.userInfoCollege
          );
          resolve(res);
        })
        .catch((error) => {
          console.log(400);
          reject(error);
        });
    });
  },
  // (管理员用户登录)
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      adminLogin(password, username.trim())
        .then((res) => {
          let userData=res.data;
          console.log("管理登录",userData);
          // 给与管理员权限
          user2.commit("SET_ISADMIN", true);
          user2.commit("SET_ISSUPERADMIN", false);
          // 更新路由
          router.dynamicRouter();
          //存在store
          commit("SET_TOKEN", userData.adminToken);
          commit("SET_NAME", userData.adminUserName);
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          // 将数据存储在cookie中
          setToken(userData.adminToken);
          setUserInfo(
            userData.adminUserName,
            userData.adminIsAdmin,
            userData.adminIsSuperAdmin,
            "Admin",
            "Admin",
          );
          resolve(res);
        })
        .catch((error) => {
          console.log(400);
          reject(error);
        });
    });
  },
  // (超级管理员用户登录)
  superAdminLogin({ commit }, userInfo) {
    const { username, password } = userInfo;
    // console.log(username,password,"username   password");
    return new Promise((resolve, reject) => {
      superAdminLogin(password, username)
        .then((res) => {
          let userData=res.data;
          // 给与管理员权限
          console.log("超管登录",userData);
          if (userData.adminIsSuperAdmin === true) {
            user2.commit("SET_ISSUPERADMIN", true);
            user2.commit("SET_ISADMIN", true);
          }
          // 更新路由
          router.dynamicRouter();
          //存在store
          commit("SET_TOKEN", userData.adminToken);
          commit("SET_NAME", "superAdmin");
          commit(
            "SET_AVATAR",
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
          );
          // 将数据存储在cookie中
          setToken(userData.adminToken);
          setUserInfo(
            "superAdmin",
            userData.adminIsAdmin,
            userData.adminIsSuperAdmin,
            "superAdmin",
            "superAdmin",
          );
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

  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      removeUserInfo();
      resetRouter();
      router.options.routes = [];
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
