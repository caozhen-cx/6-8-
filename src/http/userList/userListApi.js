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
export {
    getUserListDel,
    getAdduserList
}