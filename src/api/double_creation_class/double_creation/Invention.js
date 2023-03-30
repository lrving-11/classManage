import request from "@/utils/request";
import { getDoubleCreationClass } from "@/utils/auth";

// 双创班 

export function getInvention(page, limit, className) {
    return request({
        url: "/api/patent/findAllPatent",
        method: "get",
        params: {
            page,
            limit,
            className
        }
    });
}
export function getInventionByName(className, patentName) {
    return request({
        url: "/api/patent/findPatentByName",
        method: "get",
        params: {
            className,
            patentName
        }
    });
}

export function addInvention(data) {
    return request({
        url: "/api/patent/addPatent?className=" + `${getDoubleCreationClass()}`,
        method: "post",
        data
    });
}

export function deleteInvention(id) {
    return request({
        url:
            "/api/patent/deletePatent" +
            `?className=${getDoubleCreationClass()}`,
        method: "post",
        data: {
            id
        }
    });
}

export function editInvention(data) {
    return request({
        url:
            "/api/patent/updatePatent?className=" +
            `${getDoubleCreationClass()}`,
        method: "post",
        data
    });
}

export function searchInvention(
    page,
    limit,
    className,
    patentCategory,
    patentName,
    startTime,
    endTime
) {
    return request({
        url: "/api/patent/findPatent",
        method: "get",
        params: {
            page,
            limit,
            className,
            patentCategory,
            patentName,
            startTime,
            endTime
        }
    });
}
