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

async function getDel(id){
    let res = await http(`goods/${id}`,"delete");
    return res.data;
}
// 商品列表删除

async function getRemove(id){
    let res = await http("categories/"+id,"delete");
    return res.data;
}
// 商品分类删除

async function getAddList(data){
    let res = await http('categories',"post",{},data);
    return res.data;
}
//商品分类添加分类

async function getEdit(data){
    let res = await http("categories/"+data.cat_id,"put",{},{cat_name:data.cat_name});
    return res.data;
}
// 商品分类编辑

async function getAttributes(id,sel){
    let res = await http(`categories/${id}/attributes`,"get",{sel:sel});
    return res.data;
}
// 商品参数数据

async function getAdd(data){
    let res = await http('goods',"post",{},data);
    return res.data;
}
// 添加商品
export {
    getList,
    getCategories,
    getDel,
    getRemove,
    getAddList,
    getEdit,
    getAttributes,
    getAdd
}