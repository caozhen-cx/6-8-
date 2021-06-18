import Vue from 'vue'
import {
    Input, Button, Menu, MenuItem, MenuItemGroup, Submenu, Breadcrumb, BreadcrumbItem, Table, TableColumn, Switch,
    Pagination,Dialog,Form,FormItem,Message,Popconfirm  ,Row,Col,Select,Option,Tag ,Tooltip,Tree,MessageBox,Carousel,CarouselItem
,Cascader,Alert,Steps,Step,Tabs,TabPane,Checkbox,CheckboxGroup,Upload,Timeline,TimelineItem} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
// 引入element 样式
Vue.use(Input)
Vue.use(Form);
Vue.use(FormItem);
// 表单
Vue.use(Button)
// 按钮

Vue.use(Timeline)
Vue.use(TimelineItem);
// 时间线

Vue.use(Upload);
// 上传图片

Vue.use(Alert);
// 警告

Vue.use(Tabs);
Vue.use(TabPane);
// 标签页

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
// 复选框组

Vue.use(Steps)
Vue.use(Step)
// 步骤条

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
// 导航

Vue.use(Cascader);
// 级联选择器 下拉框的三级联动

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
// 面包屑

Vue.use(Table);
Vue.use(TableColumn);
// 表格

Vue.use(Switch);
// 开关
Vue.use(Pagination);
// 分页器
Vue.use(Dialog);
// 弹框
Vue.use(Popconfirm);
// 气泡确认框

Vue.use(Row);
Vue.use(Col);
// element 的 Layout 布局

Vue.use(Select);
Vue.use(Option);
// 下拉菜单

Vue.use(Tag);
// 标签
Vue.use(Tooltip);
// 文字提示
Vue.use(Tree);
// 树形结构
Vue.prototype.$message = Message;
// 提示框
Vue.prototype.$confirm = MessageBox.confirm
// MessageBox的确认消息弹窗
// 弹框类的都需要挂载在原型上，否则进入页面就会弹出


Vue.use(Carousel);
Vue.use(CarouselItem)
// 轮播