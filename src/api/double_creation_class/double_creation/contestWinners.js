import request from "@/utils/request";

/**
 * 双创班 -> 学科竞赛
 */
// 添加学科竞赛获奖信息
export function addContestWinners(achievementCompetitionDO, userId) {
  return request({
    url: "/api/competition/addCompetition",
    method: "post",
    data: achievementCompetitionDO,
    params: {
      userId,
    },
  });
}
// 删除学科竞赛获奖信息
export function deleteContestWinners(adminUserName, id) {
  return request({
    url: "/api/competition/deleteCompetition",
    method: "delete",
    params: {
      adminUserName,
      id,
    },
  });
}
// 查找所有学科竞赛获奖信息
export function findContestWinners(className, pageNumber, pageSize) {
  return request({
    url: "/api/competition/findAllCompetition",
    method: "get",
    params: { className, pageNumber, pageSize },
  });
}
// 修改学科竞赛获奖信息
export function updateContestWinners(achievementCompetitionDO, adminUserName) {
  return request({
    url: "/api/competition/updateCompetition",
    method: "put",
    data: achievementCompetitionDO,
    params: {
      adminUserName,
    },
  });
}
// 上传
export function uploadContestWinners(
  className,
  file, //formData
  id
) {
  return request({
    url: "/api/competition/upload",
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
