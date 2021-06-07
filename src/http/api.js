import http from "./request";
// 封装的axios
import { Message } from 'element-ui';

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
export {
    getLogin,
    getUsers
}