/**
 *双创班信息
 */
import request from "@/utils/request";
import { getDoubleCreationClass } from "@/utils/auth";
// 查找 所有 双创班信息
export function findAllIntroduce(pageNumber, pageSize, className) {
  return request({
    url: "/api/createdClass/findAllCreatedClass",
    method: "get",
    params: {
      pageNumber,
      pageSize,
      className,
    },
  });
}
// 删除双创班信息
export function deleteIntroduce(id, adminUserName) {
  return request({
    url: "/api/createdClass/deleteCreatedClass",
    method: "post",
    params: {
      id,
      adminUserName,
    },
  });
}
// 添加双创班信息
export function addIntroduce(createdClassDO) {
  return request({
    url: "/api/createdClass/addCreatedClass",
    method: "post",
    data: createdClassDO, //createdClassDO
  });
}

// 查找双创班信息
export function findIntroduce(
  className,
  startTime,
  endTime,
  pageNumber,
  pageSize
) {
  return request({
    url: "/api/createdClass/findCreatedClass",
    method: "get",
    params: {
      className,
      startTime,
      endTime,
      pageNumber,
      pageSize,
    },
  });
}
// 修改双创班信息
export function editIntroduce(adminUserName, createdClassDO) {
  return request({
    url: "/api/createdClass/updateCreatedClass",
    method: "post",
    params: {
      adminUserName,
    },
    data: createdClassDO,
  });
}
// 上传
export function createdClassUpload(className, file, id) {
  return request({
    url: "/api/createdClass/upload",
    method: "post",
    data: file,
    params: {
      className,
      id,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
