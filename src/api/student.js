/**
 * 用户  /api/user/
 */
import request from "@/utils/request";
// 删除审核中竞赛信息
export function deleteCompetition(id, userId) {
    return request({
        url: "/api/user/deleteCompetition",
        method: "get",
        params: {
            id,
            userId
        }
    });
}
// 查看学科竞赛被拒绝理由
export function findAllRefuse(userId) {
    return request({
        url: "/api/user/findAllRefuse",
        method: "get",
        params: {
            userId
        }
    });
}
// 查找竞赛信息
export function findCompetition(pageNumber, pageSize, userId) {
    return request({
        url: "/api/user/findCompetition",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId
        }
    });
}
// 查找双创班级
export function findCreatedClass(pageNumber, pageSize, className) {
    return request({
        url: "/api/user/findCreatedClass",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            className
        }
    });
}
// 查看审核中竞赛信息
export function findExCompetition(pageNumber, pageSize, userId) {
    return request({
        url: "/api/user/findExCompetition",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId
        }
    });
}
// 查找毕业生信息
export function findGraStudent(pageNumber, pageSize, userId) {
    return request({
        url: "/api/user/findGraStudent",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId
        }
    });
}
// 查找学生信息
export function findStudent(pageNumber, pageSize, userId) {
    return request({
        url: "/api/user/findStudent",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId
        }
    });
}
// 修改审核中竞赛信息
export function updateCompetition(achievementCompetitionDO, userId) {
    return request({
        url: "/api/user/updateCompetition",
        method: "get",
        data:achievementCompetitionDO,
        params: {
            userId
        }
    });
}
// 修改审核中文件 upload
export function upload(file, id) {
    return request({
        url: "/api/user/upload",
        method: "post",
        data:file,
        params: {
            id
        }
    });
}
