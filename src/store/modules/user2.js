import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from "@/utils/auth";

Vue.use(Vuex);

function getState() {
  return {
    isAdmin: getUserInfo().isisAdmin,
    isSuperAdmin: getUserInfo().isisSuperAdmin,
  };
}
const store = new Vuex.Store({
  state: getState(),
  getters: {
    getIsAdmin(state) {
      return state.isAdmin;
    },
    getSuperAdmin(state) {
      return state.isSuperAdmin;
    },
  },
  mutations: {
    SET_ISADMIN(state, bool) {
      state.isAdmin = bool;
    },
    SET_ISSUPERADMIN(state, bool) {
      state.isSuperAdmin = bool;
    },
  },
});
export default store;
