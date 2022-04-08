$(function() {
    getUserInfo();

    let layer = layui.layer;

    // 点击按钮实现退出功能
    $("#btnLogout").on("click", function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            // 1.清除本地存储的token
            localStorage.removeItem("token")

            // 2.重新跳转回login页
            location.href = "login.html";

            // 关闭提示框
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // 请求头配置文件
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取信息失败！");
            }
            // 调用renderavatar函数渲染用户头像
            renderAvatar(res.data);
        },
        // 无论成功还是失败都会调用complete回调函数
    })
}

function renderAvatar(user) {
    // 获取用户名
    let name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
        $(".layui-nav-img").hide();
    }
}