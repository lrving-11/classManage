import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";
// token
export function getToken() {
    return Cookies.get(TokenKey);
}
export function setToken(token) {
    return Cookies.set(TokenKey, token);
}
export function removeToken() {
    return Cookies.remove(TokenKey);
}
// 管理员双创班身份
export function setDoubleCreationClass(className) {
    Cookies.set("doubleCreationClass", className);
}
export function getDoubleCreationClass() {
    return Cookies.get("doubleCreationClass");
}
export function removeDoubleCreationClass() {
    return Cookies.remove("doubleCreationClass");
}
// 管理员学院身份
export function setUserCollege(userCollege) {
    Cookies.set("userCollege", userCollege);
}
export function getUserCollege() {
    return Cookies.get("userCollege");
}
export function removeUserCollege() {
    return Cookies.remove("userCollege");
}
// 超级管理员
export function getAdminUserName() {
    return Cookies.get("adminUserName");
}
export function setAdminUserName(adminUserName) {
    return Cookies.set("adminUserName", adminUserName);
}
export function removeAdminUserName() {
    return Cookies.remove("adminUserName");
}




export function setUserInfo(
    username,
    isisAdmin,
    isisSuperAdmin,
    doubleCreationClass,
    userCollege
) {
    Cookies.set("username", username);
    Cookies.set("isisAdmin", isisAdmin);
    Cookies.set("isisSuperAdmin", isisSuperAdmin);
    Cookies.set("doubleCreationClass", doubleCreationClass);
    Cookies.set("userCollege", userCollege);
}

export function getUserInfo() {
    let username = Cookies.get("username");
    let isisAdmin = Cookies.get("isisAdmin");
    let isisSuperAdmin = Cookies.get("isisSuperAdmin");
    let doubleCreationClass = Cookies.get("doubleCreationClass");
    let userCollege = Cookies.get("userCollege");
    return {
        username,
        isisAdmin,
        isisSuperAdmin,
        doubleCreationClass,
        userCollege,
    };
}

export function removeUserInfo() {
    Cookies.remove("doubleCreationClass");
    Cookies.remove("isisAdmin");
    Cookies.remove("isisSuperAdmin");
    Cookies.remove("username");
    Cookies.remove("userCollege");
    Cookies.remove("adminUserName");

}
