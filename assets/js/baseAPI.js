// 每次发送请求的时候都会先调用ajaxprefilter函数
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3007" + options.url;

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 全局统一挂载complete 回调函数
    options.complete = function(res) {
        // 在complete回调中通过res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem("token");
            // 强制跳转至login页
            location.href = 'login.html';
        }
    }
})