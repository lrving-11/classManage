/**
 * 星级评价
 */
import request from "@/utils/request";
// 添加
export function addStarLevel(data) {
    return request({
        url: "/api/starLevel/addStarLevel",
        method: "post",
        data //levelDOS
    });
}
// 查看
export function findStarLevel(pageNumber, pageSize) {
    return request({
        url: "/api/starLevel/findStarLevel",
        method: "get",
        params: {
            pageNumber,
            pageSize
        }
    });
}

/**
 * 星级分
 */
 export function findAllStarPoint(pageNumber, pageSize) {
    return request({
        url: "/api/starPoint/findAllStarPoint",
        method: "get",
        params: {
            pageNumber,
            pageSize
        }
    });
}
 export function starPoint() {
    return request({
        url: "/api/starPoint/",
        method: "post",
    });
}
