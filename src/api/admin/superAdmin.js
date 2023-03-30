/**
 * 超级管理员
 */
import request from "@/utils/request";
// 创建普通管理员
export function adminAdd(adminInfoDO) {
  return request({
    url: "/api/superAdmin/adminAdd",
    method: "post",
    data: adminInfoDO, //adminInfoDO
  });
}
// 删除普通管理员
export function adminDelete(id) {
  return request({
    url: "/api/superAdmin/adminDelete",
    method: "post",
    params: {
      id,
    },
  });
}
// 修改普通管理员
export function adminUpdate(data) {
  return request({
    url: "/api/superAdmin/adminUpdate",
    method: "post",
    data, //adminInfoDO
  });
}
// 审核竞赛获奖信息
export function examineCompetition(achievementCompetitionDO, reason, status) {
  return request({
    url: "/api/superAdmin/examineCompetition",
    method: "post",
    data: achievementCompetitionDO,
    params: {
      reason,
      status,
    },
  });
}
// 查找所有管理员
export function findAllAdmin(pageNumber, pageSize) {
  return request({
    url: "/api/superAdmin/findAllAdmin",
    method: "get",
    params: {
      pageNumber,
      pageSize,
    },
  });
}
// 获取申请竞赛获奖信息
export function findTempCompetition(pageNumber, pageSize) {
  return request({
    url: "/api/superAdmin/findTempCompetition",
    method: "get",
    params: {
      pageNumber,
      pageSize,
    },
  });
}
