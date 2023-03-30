/**
 * 主页面
 */
import request from "@/utils/request";
// 总数统计
export function number() {
    return request({
        url: "/api/number/number",
        method: "get",
    });
}