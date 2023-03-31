/**
 *  职位信息
 */
import request from "@/utils/request";
// 添加
export function addPosition(positionInfoDO) {
    return request({
        url: "/api/position/addPosition",
        method: "post",
        data:positionInfoDO,
    });
}
// 删除
export function deletePosition(id) {
    return request({
        url: "/api/position/deletePosition",
        method: "delete",
        params: {
            id
        }
    });
}
// 查找
export function findPosition(
    pageNumber,
    pageSize,
    payEnd,
    payStart,
    // address = "",
    // corporate = "",
    // position = ""
) {
    return request({
        url: "/api/position/findPosition",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            payEnd,
            payStart,
            // address,
            // corporate,
            // position
        }
    });
}
// 改
export function updatePosition(positionInfoDO) {
    return request({
        url: "/api/position/updatePosition",
        method: "post",
        data:positionInfoDO,
    });
}
