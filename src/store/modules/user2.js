import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from "@/utils/auth";

Vue.use(Vuex);

function getState() {
    return {
        isAdmin: getUserInfo().isisAdmin,
        isSuperAdmin: getUserInfo().isisSuperAdmin,
        // 属性值为空字符串表示未验证，为company表示为企业，为student表示为学生
        isApprove: "",
        /*属性值为空字符串表示未验证，为enterprise表示为企业，为student表示为学生，
        unsure是正在认证，fasle是认证失败*/
        role: "",
        // name当用户为学生时为学生实名，当用户为企业时，为企业名,未认证时为null,取值title
        name: getUserInfo().title,
        adminUserName: "",
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
        getIdentify(state) {
            if (state.isApprove === "student") {
                return "student";
            } else if (state.isApprove === "company") {
                return "company";
            } else if (state.isApprove === "") {
                return "";
            } else {
                console.log("出现错误，store/modules/user2");
            }
        },
        getName(state) {
            return state.name;
        },
        getRole(state) {
            return state.role;
        },
    },
    mutations: {
        // 设置管理员开关
        SET_ISADMIN(state, bool) {
            state.isAdmin = bool;
        },
        // 设置超级管理员开关
        SET_ISSUPERADMIN(state, bool) {
            state.isSuperAdmin = bool;
        },
        SET_APPROVE(state, sRole) {
            state.isApprove = sRole;
        },
        SET_NAME(state, str) {
            state.name = str;
        },
        SET_ROLE(state, str) {
            state.role = str;
        },
        setAdminUserName(state, adminUserName) {
            state.adminUserName = adminUserName;
        },
    },
});
export default store;
