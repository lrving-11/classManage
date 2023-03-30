import request from "@/utils/request";
/**
 * 动态字段
 */
// 查找字段
export function getField(surface) {
  return request({
    url: "/api/newField/findField",
    method: "get",
    params: {
      surface,
    },
  });
}
// 添加字段
export function addField(data) {
  return request({
    url: "/api/newField/addField",
    method: "post",
    data, //newFieldDO
  });
}
// 删除字段
export function deleteField(id) {
  return request({
    url: "/api/newField/deleteField",
    method: "delete",
    params: {
      id,
    }, //id
  });
}
// 修改字段
export function updateField(newFieldDO) {
  return request({
    url: "/api/newField/updateField",
    method: "post",
    data:newFieldDO, //newFieldDO
  });
}
