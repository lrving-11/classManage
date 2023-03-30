/**
 *  简历信息
 */
import request from "@/utils/request";
// 增
export function addResume(resumeDO, userId) {
    return request({
        url: "/api/resume/addResume",
        method: "post",
        data: {
            ...resumeDO
        },
        params: {
            userId
        }
    });
}
// 删
export function deleteResume(adminUserName, id) {
    return request({
        url: "/api/resume/deleteResume",
        method: "delete",
        params: {
            id,
            adminUserName,
        }
    });
}
// 改
export function updateResume(adminUserName, resumeDO) {
    return request({
        url: "/api/resume/updateResume",
        method: "post",
        data: {
            // adminUserName,
            ...resumeDO
        },
        params: {
            adminUserName
        }
    });
}
// 查
export function findResume(pageNumber, pageSize, userId) {
    return request({
        url: "/api/resume/findResume",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId
        }
    });
}
