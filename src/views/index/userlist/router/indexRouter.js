export default [
    {
        path: "/",
        name: "Index",
        component: () => import('@/views/index/Index.vue'),
        redirect: "/welcome",
        children: [{
            path: "/user",
            name: "User",
            component: () => import("@/views/index/userlist/User.vue")
        }, {
            path: "/welcome",
            name: "Welcome",
            component: () => import("@/views/index/userlist/Welcome.vue")
        }]
    }
]