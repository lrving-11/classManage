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
