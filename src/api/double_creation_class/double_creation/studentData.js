import request from "@/utils/request";
import { getDoubleCreationClass } from "@/utils/auth";

/**
 * 双创班 -> 学生信息
 */
// 添加
export function addCreationStudent(className, information, userId) {
    return request({
        url: "/api/student/addStudent",
        method: "post",
        data:information,
        params: {
            className,
            userId
        }
    });
}
// 删除
export function deleteCreationStudent(adminUserName, id) {
    return request({
        url: "/api/student/deleteStudent",
        method: "delete",
        params: {
            adminUserName,
            id
        }
    });
}
// 查找所有
export function findAllStudent(pageNumber, pageSize, className) {
    return request({
        url: "/api/student/findAllStudent",
        method: "get",
        params: {
            pageNumber,
            pageSize,
            className
        }
    });
}
// 根据姓名查找学生信息
export function findCreationStudentByname(name) {
    return request({
        url: "/api/student/findByName",
        method: "get",
        params: {
            name
        }
    });
}

//修改
export function editCreationStudent(information) {
    return request({
        url: "/api/student/updateStudent",
        method: "put",
        data:information,
       
    });
}











// export function deleteCreationStudent(data) {
//     return request({
//         url: "/api/student/deleteStudent",
//         // +`?className=${getDoubleCreationClass()}`,
//         method: "delete",
//         params: data,
//         data: data
//     });
// }

// export function editCreationStudent(data) {
//     return request({
//         url: "/api/student/updateStudent",
//         // +
//         // `?className=${getDoubleCreationClass()}`,
//         method: "PUT",
//         data: data,
//         params: data
//     });
// }

// 导入
export function importCreationStudent(data) {
    return request({
        url: "/api/student/import" + `?className=${getDoubleCreationClass()}`,
        method: "post",
        data
    });
}
// 导出
export function exportCreationStudent(data) {
    return request({
        url: "/api/student/export" + `?className=${getDoubleCreationClass()}`,
        method: "get"
    });
}

// export function searchCreationStudent(page, limit, name, doubleCreationClass) {
//     return request({
//         url: "/api/student/findByName",
//         method: "get",
//         params: {
//             className: getDoubleCreationClass(),
//             doubleCreationClass,
//             name,
//             page,
//             limit
//         }
//     });
// }
