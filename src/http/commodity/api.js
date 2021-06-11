import http from "../request";

async function getList (data){
    let res = await http("goods","get",data);
    return res.data;
}
// 商品列表数据
async function getCategories(data){
    let res = await http("categories","get",data);
    return res.data;
}
//商品分类数据列表

export {
    getList,
    getCategories,
}