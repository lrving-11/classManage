import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, getUserInfo } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import user2 from "@/store/modules/user2";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.meta.title);

    // determine whether the user has logged in
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === "/login") {
            // if is logged in, redirect to the home page
            next({ path: "/" });
            NProgress.done();
        } else {
            // next();
            // NProgress.done();

            // console.log(hasGetUserInfo);
            // if (hasGetUserInfo)

            const hasGetUserInfo = store.getters.name;
            if (hasGetUserInfo) {
                // 刷新路由(没必要，会造成路由堆栈溢出，下面这条注释不要开，否则返回和前进功能用不了)
                // router.dynamicRouter();
                // console.log("hasGetUserInfo");
                next();
                NProgress.done();
                // console.log("hasGetUserInfo");
            } else {
                try {
                    console.log("get user info");
                    // get user info
                    // await store.dispatch("user/getInfo");

                    next();
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch("user/resetToken");
                    // 报错，注释掉，暂不知道原因
                    Message.error(error || "Has Error");
                    console.log("permission/catch", error);
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        // console.log("has no token");
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.

            // 未登录时，可以去注册界面
            if (to.path === "/register") {
                next();
            } else {
                next(`/login?redirect=${to.path}`);
                NProgress.done();
            }
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
