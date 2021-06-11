export default [{
    path: '/roles',
    name: "Roles",
    component: () => import("./Roles.vue")
}, {
    path: "/rights",
    name: "Rights",
    component: () => import("./Rights.vue")
}]
// 角色列表