/**
 * 审核通知
 */
import request from "@/utils/request";
// 添加
export function addJobExamine(jobExamineDO) {
  return request({
    url: "/api/jobExamine/addJobExamine",
    method: "post",
    data: jobExamineDO,
  });
}
// 删除
export function deleteJobExamine(id) {
  return request({
    url: "/api/jobExamine/deleteJobExamine",
    method: "delete",
    params: {
      id,
    },
  });
}
// 查找
export function findJobExamine(pageNumber, pageSize, wantedId) {
  return request({
    url: "/api/jobExamine/findJobExamine",
    method: "get",
    params: {
      pageNumber,
      pageSize,
      wantedId,
    },
  });
}
// 修改
export function updateJobExamine(jobExamineDO) {
  return request({
    url: "/api/jobExamine/updateJobExamine",
    method: "post",
    data:jobExamineDO
  });
}
