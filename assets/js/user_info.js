$(function() {
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '字符长度须在1~6个字符之间';
            }
        }
    })

    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                console.log(res);
                form.val("formUserInfo", res.data);
            }
        })
    }

    $("#btnReset").on("click", function(e) {
        // 阻止默认重置行为
        e.preventDefault();
        initUserInfo();
    })

    // 表单提交的监听事件
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 调用父页面中的方法重新渲染用户头像
                window.parent.getUserInfo();
            }
        })
    })
})