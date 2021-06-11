import http from "../request";
async function getList(data){
    let res = await http("orders","get",data);
    return res.data;
}
// 订单数据列表
export {
    getList
}