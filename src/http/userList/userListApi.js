import http from "../request";



async function getUserListDel(id) {
    console.log(id);
    let res = await http("users/" + id, "delete");
    return res.data;
}
// 用户列表删除

async function getAdduserList(data) {
    let res = await http("users", "post", {}, data);
    
    return res.data;
}
// 添加用户列表
async function getSosu (id){
    let res = await http("users"+id);
    return res.data;
}
// 搜素
async function getState(data){
    let res = await http(`users/${data.uid}/state/${data.flag}`,"put");
    return res.data;
}
// 改变用户状态
async function getEdit (id,data){
    let res = await http("users/"+id,"put",{},data);
    return res.data;
}
// 修改
async function getModifyRole(id,rid){
    let res = await http(`users/${id}/role`,"put",{},{rid});
    return res.data;
}
// 分配用户角色

export {
    getUserListDel,
    getAdduserList,
    getSosu,
    getState,
    getEdit,
    getModifyRole
}