/**
 *  签约统计
 */
import request from "@/utils/request";
// 添加
export function addSigningRate(signingRateDO) {
  return request({
    url: "/api/signingRate/addSigningRate",
    method: "post",
    data: signingRateDO, //signingRateDO
  });
}

// 删除签约信息
export function deleteSigningRate(adminUserName, id) {
  return request({
    url: "/api/signingRate/deleteSigningRate",
    method: "delete",
    params: {
      adminUserName,
      id,
    },
  });
}
// 查找签约信息
export function findSigningRate(pageNumber, pageSize, className) {
  return request({
    url: "/api/signingRate/findSigningRate",
    method: "get",
    params: {
      pageNumber,
      pageSize,
      className,
    },
  });
}
// 修改签约信息
export function updateSigningRate(adminUserName, signingRateDO) {
  return request({
    url: "/api/signingRate/updateSigningRate",
    method: "post",
    data: signingRateDO, //signingRateDO
    params: {
      adminUserName,
    },
  });
}
// 图表统计-签约情况占比
export function chartSign(className) {
  return request({
    url: "/api/signingRate/chartSign",
    method: "get",
    params: {
      className,
    }, //className
  });
}
// 图表统计-年度同比变化
export function chartYear(year) {
  return request({
    url: "/api/signingRate/chartYear",
    method: "get",
    params:{
      year
    }, //year
  });
}
