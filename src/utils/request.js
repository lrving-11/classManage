import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, getAdminUserName } from "@/utils/auth";
import userDate from "@/store/modules/user2";

// create an axios instance
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    // baseURL: "http://116.62.48.128:8008/",
    baseURL: "http://42.193.219.136:8008/",
    // baseURL: "",
    timeout: 30000, // request timeout,
    // headers['Content-Type'] : "application/x-www-form-urlencoded; charset=utf-8;"
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // config.headers.post['Content-Type'] = "application/form-data; charset=utf-8;"
        console.log("请求拦截",config);
        // if (config.data) {
        //     config.data.adminUserName = getAdminUserName();
        // }

        // if (config.params) {
        //     config.params.adminUserName = getAdminUserName();
        // }

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation

            // config.params["token"] = getToken();
            config.headers["token"] = getToken();
        }
        // json 转 formdata
        // if (config.method === "post") {
        //     console.log("post 格式转换", config.data);
        //     if (config.data) {
        //         let params = new FormData();
        //         let keys = Object.keys(config.data);
        //         for (let i in keys) {
        //             if (config.data[keys[i]] != null) {
        //                 params.append(keys[i], config.data[keys[i]]);
        //             }
        //         }
        //         config.data = params;
        //     } else {
        //         let params = new FormData();
        //         config.data = params;
        //     }
        // }

        return config;
    },
    error => {
        // do something with request error
        console.log("请求拦截错误",error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        let res = response.data;
        console.log("响应拦截器", res);

        // console.log(response);
        // const res = response.data;
        // console.log(response);
        // if the custom code is not 20000, it is judged as an error.
        let code;
        if (res.code) {
            code = res.code;
        } else {
            code = response.status;
        }
        // res.code !== 200 && response.status !== 200
        if (code !== 200) {
            Message({
                message: res.msg || "Error",
                type: "error",
                duration: 5 * 1000
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 508 || res.code === 512 || res.code === 514) {
                console.log(
                    "res.code === 508 || res.code === 512 || res.code === 514"
                );
                // to re-login
                MessageBox.confirm(
                    "您已经登出，您可以取消停留在此页面，或再次登录",
                    "Confirm logout",
                    {
                        confirmButtonText: "Re-Login",
                        cancelButtonText: "Cancel",
                        type: "warning"
                    }
                ).then(() => {
                    store.dispatch("user/resetToken").then(() => {
                        location.reload();
                    });
                });
            }
            // console.log(response);
            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            // console.log(res);
            // console.log(response.data.msg);
            // console.log(response.data);
            // console.log(response.data.msg);
            return response.data;
        }
    },
    error => {
        console.log("err" + error); // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
