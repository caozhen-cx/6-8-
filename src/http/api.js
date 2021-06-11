import http from "./request";
// 封装的axios

async function getLogin(data) {
    let res = await http("login", "post", data);
    return res.data;
}
// 登录
async function getUsers(data) {
    let res = await http("users", "get", data);
    return res.data
};
// 用户数据列表
async function getNav (){
    let res = await http("menus","get");
    return res.data;
}
// 左侧导航数据
export {
    getLogin,
    getUsers,
    getNav
}