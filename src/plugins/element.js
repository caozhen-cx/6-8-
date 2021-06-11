import Vue from 'vue'
import {
    Input, Button, Menu, MenuItem, MenuItemGroup, Submenu, Breadcrumb, BreadcrumbItem, Table, TableColumn, Switch,
    Pagination,Dialog,Form,FormItem,Message,Popconfirm  ,Row,Col,Select,Option,Tag ,Tooltip,Tree 
} from "element-ui";
Vue.use(Input)
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button)
Vue.use(Menu)
// 主页左导航
Vue.use(MenuItem)
// 主页左导航每一项
Vue.use(MenuItemGroup)
// 主页左导航 下拉
Vue.use(Submenu)

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
// 面包屑
Vue.use(Table);
Vue.use(TableColumn);
// 表格
Vue.use(Switch);
// 滑块
Vue.use(Pagination);
// 分页器
Vue.use(Dialog);
// 弹框
Vue.prototype.$message = Message;
// 提示框
Vue.use(Popconfirm);
// 气泡确认框
Vue.use(Row);
Vue.use(Col);
// 


Vue.use(Select);
Vue.use(Option);
// 下拉菜单
Vue.use(Tag);
// 标签
Vue.use(Tooltip);
// 文字提示
Vue.use(Tree);
// 树形结构
