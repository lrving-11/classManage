/**
 * 下载接口
 */
import request from "@/utils/request";
// 删除
export function deleteFile(data) {
    return request({
        url: "/api/deleteFile",
        method: "post",
        data //fileName
    });
}
// 下载
export function downLoad(data) {
    return request({
        url: "/api/download",
        method: "get",
        data //fileName
    });
}
// 图片
export function image(data) {
    return request({
        url: "/api/image",
        method: "get",
        data //fileName
    });
}
