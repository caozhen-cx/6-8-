import axios from "axios";
// 引入 axios
import store from "@/store/index.js";
// 引入vuex
import qs from "qs";
// 引入qs
import Router from "../router";
// 引入路由
import { Loading, Message } from 'element-ui';
// 引入element-ui的loading动画
import { baseURL } from "@/config/index.js";
// 引入我们的环境变量

const instance = axios.create({
    baseURL,
    timeout: 5000
})


// 创建 axios实例
let loading;
// 用于保存loading
instance.interceptors.request.use(config => { // config 就是我们一些请求的配置
    // 成功回调
    loading = Loading.service({
        background: "rgba(0, 0, 0, 0.7)",
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
    });
    // 引入element-ui loading 动画
    if (store.state.token) {
        // vuex中的token是否是空，如果不为空就设置请求头，携带token
        config.headers.Authorization = store.state.token;
    }
    return config;
    // 一定要返回config，否则报错
}, error => {
    // 失败回调
    return Promise.reject(error);
    // 失败返回一个 Promise对象
})

instance.interceptors.response.use(response => { // response 服务器返回的数据
    // 成功回调
    loading.close();
    // 关闭loading

    return response;
    // 必须返回有返回值
}, error => {
    // 失败回调
    return Promise.reject(error);
    // 必须有返回值
})
// 响应拦截


export default (url, method, params = {}, data = {}) => {
    // url请求地址
    // method 请求方式
    // params 参数
    // data 用于post传参
    return instance({
        // 返回我们的axios实例
        url,
        method,
        params,
        data: qs.stringify(data)
    }).then(res => {
        let msg = res.data.meta.msg;
        if (res.data.meta.msg === "无效token" && res.data.meta.status === 400) {
            Message({
                message: msg,
                type: "error"
            });
            Router.push("/login")
            return { data: []};
        }
        if (method !== "get" && method) {

            switch (res.data.meta.status) {
                case 200:
                    // 请求成功
                    Message({
                        message: msg,
                        type: "success"
                    });
                    break
                case 201:
                    // 创建成功
                    Message({
                        message: msg,
                        type: "success"
                    });
                    break;
                case 204:
                    // 删除成功
                    Message({
                        message: msg,
                        type: "success"
                    });
                    break;
                case 400:
                    // 参数错误
                    Message({
                        message: msg,
                        type: "error"
                    });
                    break;
                case 404:
                    // 参数错误
                    Message({
                        message: msg,
                        type: "error"
                    });
                    break;
                case 500:
                    // 服务器内部错误
                    Message({
                        message: msg,
                        type: "error"
                    });
                    break;
            }
        }
        // res 我们后端返回的数据
        if (res.status >= 200 && res.status < 300) {
            // 如果我们返回的数据状态码为200-300之间就是成功
            return res;
        } else {
            return Promise.reject(res.data);
            // 失败返回一个Promise对象
        }
    }).catch(err => {
        return Promise.reject(err);
        // 请求失败返回一个Promise对象
    })
}
