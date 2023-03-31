/**
 *  求职信息
 */
import request from "@/utils/request";
//  import { getAdminUserName, getDoubleCreationClass } from "@/utils/auth";
// 添加
export function addJobWanted(jobWantedDO, userId) {
    return request({
        url: "/api/jobWanted/addJobWanted",
        method: "post",
        data: {
            ...jobWantedDO
        }, 
        params: {
            userId
        }
      
    });
}
// 查
export function findJobWanted(
    pageNumber,
    pageSize,
    userId,
    // company = "",
    // firstWorkPlace = "",
    // graSchool = "",
    // major = ""
) {
    return request({
        url: "/api/jobWanted/findJobWanted",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId,
            // company,
            // firstWorkPlace,
            // graSchool,
            // major
        }
    });
}
// 删
export function deleteJobWanted(adminUserName, id) {
    return request({
        url: "/api/jobWanted/deleteJobWanted",
        method: "delete",
        params: {
            adminUserName,
            id
        }
    });
}
// 改
export function updateJobWanted(adminUserName, jobWantedDO) {
    return request({
        url: "/api/jobWanted/updateJobWanted",
        method: "post",
        data: {
            ...jobWantedDO
        },
        params: {
            adminUserName
        }
    });
}
