import rolesRouter from "@/views/index/Management/router.js";
// 角色列表
import commodity from "@/views/index/commodity/router.js";
// 商品管理
import orders from "@/views/index/orders/router.js";
// 订单列表
import reports from "@/views/index/reports/router";
// 数据统计
export default [
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/index/Index.vue'),
        redirect: "/welcome",
        children: [{
            path: "/users",
            name: "User",
            component: () => import("@/views/index/userlist/User.vue")
            // 用户列表
        }, {
            path: "/welcome",
            name: "Welcome",
            component: () => import("@/views/index/userlist/Welcome.vue")
        },
        // 视图
        ...rolesRouter,
        // 角色列表
        ...commodity,
        // 商品管理
        ...orders,
        // 订单列表
        ...reports,
            // 数据报表
            {
            path: "/goods/adds",
            compoennt: () => import('../commodity/Adds.vue')
        }

        ]
    }
]