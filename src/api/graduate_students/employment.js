/**
 *  毕业生就业
 */
import request from "@/utils/request";
//  import { getAdminUserName, getDoubleCreationClass } from "@/utils/auth";
// 添加
export function addEmployment(employmentInfoDO, userId) {
    return request({
        url: "/api/employment/addEmployment",
        method: "post",
        data: {
            ...employmentInfoDO
        }, 
        params: {
            userId
        }
    });
}

// 删除毕业生就业信息
export function deleteEmployment(adminUserName, id) {
    return request({
        url: "/api/employment/deleteEmployment",
        method: "delete",
        params: {
            // adminUserName,
            id
        }
    });
}
// 查找毕业生就业信息
export function findEmployment(
    pageNumber,
    pageSize,
    userId,
) {
    return request({
        url: "/api/employment/findEmployment",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            userId,
        }
    });
}
// 修改
export function updateEmployment(adminUserName, employmentInfoDO) {
    return request({
        url: "/api/employment/updateEmployment",
        method: "post",
        data: {
            // adminUserName,
            ...employmentInfoDO
        }
    });
}

//图表展示-所有专业对口情况
export function chartAll() {
    return request({
        url: "/api/employment/chartAll",
        method: "get",
    });
}
// 图表展示-根据所属专业展示就业占比率
export function chartCity() {
    return request({
        url: "/api/employment/chartCity",
        method: "get",
    });
}
// 图表展示-薪酬展示
export function chartPay() {
    return request({
        url: "/api/employment/chartPay",
        method: "get",
    });
}
