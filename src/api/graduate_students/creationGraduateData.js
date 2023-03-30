/**
 *双创班 -> 毕业生信息
 */
import request from "@/utils/request";
// 添加
export function addCreationGraduate(information,userId,className) {
    return request({
        url: "/api/graduateStudent/addGraduateStudent",
        method: "post",
        data:information,
        params: {
            userId,
            className
        }
    });
}
// 删除
export function deleteCreationGraduate(adminUserName, id) {
    return request({
        url: "/api/graduateStudent/deleteGraduateStudent",
        method: "post",
        params: {
            adminUserName,
            id
        }
    });
}
// 查找所有毕业生信息
export function findCreationGraduate(pageNumber, pageSize,className) {
    return request({
        url: "/api/graduateStudent/findAllGraduateStudent",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            className,
        }
    });
}
// 根据姓名查找毕业生信息
export function findByNameCreationGraduate(name) {
    return request({
        url: "/api/graduateStudent/findByName",
        method: "get",
        params: {
            name
        }
    });
}
// 修改
export function editCreationGraduate(information) {
    return request({
        url: "/api/graduateStudent/updateGraduateStudent",
        method: "put",
        data:information,
       
    });
}

// export function getGraduate(page, limit) {
//     return request({
//         url: "/api/user/findGraStudent",
//         method: "get",
//         params: {
//             userId: getAdminUserName(),
//             pageNumber: page,
//             pageSize: limit
//         }
//     });
// }

// export function getCreationGraduateByStuNum(page, limit, className, key) {
//     return request({
//         url: "/api/graduateStudent/findGraduateStudent",
//         method: "get",
//         params: {
//             page,
//             limit,
//             className,
//             stuNum: key
//         }
//     });
// }

// export function editCreationGraduate(data) {
//     return request({
//         url:
//             "/api/graduateStudent/updateGraduateStudent" +
//             `?className=${getDoubleCreationClass()}`,
//         method: "post",
//         data
//     });
// }

// export function searchExportCreationGraduate(
//     name,
//     stuNum,
//     doubleCreationClass
// ) {
//     return request({
//         url: "/api/graduateStudent/findExport",
//         method: "get",
//         params: {
//             className: getDoubleCreationClass(),
//             name,
//             stuNum,
//             doubleCreationClass
//         }
//     });
// }
