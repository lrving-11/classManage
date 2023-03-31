import request from "@/utils/request";
/**
 * 企业信息管理
 */

// 添加企业信息
export function addEnterprise(enterpriseDO) {
  return request({
    url: "/api/enterprise/addEnterprise",
    method: "post",
    data: {
      ...enterpriseDO,
    },
  });
}
// 删除企业信息
export function deleteEnterprise(id) {
  return request({
    url: "/api/enterprise/deleteEnterprise",
    method: "delete",
    params: {
      id,
    }, //enId
  });
}
// 查找企业信息
export function findEnterprise(pageNumber, pageSize) {
  return request({
    url: "/api/enterprise/findEnterprise",
    method: "get",
    params: {
      pageNumber,
      pageSize,
    }, // pageNumber pageSize
  });
}
// 修改企业信息
export function updateEnterprise(enterpriseDO) {
  return request({
    url: "/api/enterprise/updateEnterprise",
    method: "post",
    data: {
      ...enterpriseDO,
    }, //enterpriseDO
  });
}
// 上传二维码图片
export function uploadImg(file, id) {
  return request({
    url: "/api/enterprise/upload",
    method: "post",
    data: file,
    params: {
      id,
    },
    headers:{
        "Content-Type":"multipart/form-data"
    }
  });
}
