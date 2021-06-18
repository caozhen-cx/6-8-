export default [{
    path: "/goods",
    name: "Goods",
    component: () => import("./Goods.vue")
    // 商品列表
}, {
    path: "/params",
    name: "Params",
    component: () => import("./Params")
    // 分类参数
}, {
    path: "/categories",
    name: "Categories",
    component: () => import('./Categories')
    // 商品分类
}, 
{
    path: "/goods/add",
    name: "GppdsAdd",
    component: () => import('./Add.vue')
    // 添加商品
}
]