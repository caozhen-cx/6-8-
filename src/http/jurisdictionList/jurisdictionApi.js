import http from "../request";
async function getRole() {
    let res = await http("roles");
    return res.data;
}
// 角色列表
async function getAddRole(data) {
    let res = await http("roles", "post", {}, data);
    return res.data;
}
// 添加角色列表
async function getRights(type) {
    let res = await http("rights/"+type);
    return res.data;
}
// 所有权限列表
async function getDel(id) {
    let res = await http("roles/" + id, "delete");
    return res.data;
}
// 删除角色
async function getRoles(id, data) {
    let res = await http("roles/" + id, "put", {},data);
    return res;
}
// 编辑提交角色
async function getModifyRole(id,data){
    let res = await http(`roles/${id}/rights`,"post",{},data);
    return res.data;
}
// 角色授权
export {
    getRole,
    getAddRole,
    getRights,
    getDel,
    getRoles,
    getModifyRole
}