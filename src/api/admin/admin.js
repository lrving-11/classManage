/**
 *  管理员
 */
import request from "@/utils/request";
// 查看学科竞赛被拒绝理由
export function findAllRefuse(pageNumber, pageSize, className) {
    return request({
        url: "/api/admin/findAllRefuse",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            className
        }
    });
}
// 查看审核中竞赛信息
export function findCompetition(pageNumber, pageSize, className) {
    return request({
        url: "/api/admin/findCompetition",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            className
        }
    });
}
// 修改审核中竞赛信息
export function updateCompetition(achievementCompetitionDO) {
    return request({
        url: "/api/admin/updateCompetition",
        method: "put",
        data:achievementCompetitionDO, //achievementCompetitionDO
    });
}
// 修改审核中文件
export function uploadDoc(file, id) {
    return request({
        url: "/api/admin/upload",
        method: "post",
        data:file,
        params: {
            id
        }
    });
}
