$(function() {
    // 去注册点击事件
    $("#link_reg").on("click", function() {
            $(".login-box").hide();
            $(".reg-box").show();
            $(".loginAndRegBox").css("height", 340);
        })
        // 去登录点击事件
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
        $(".loginAndRegBox").css("height", 290);
    })

    // 从layui获取form对象
    let form = layui.form;
    let layer = layui.layer;
    // 通过form.verify()函数 自定义校验规则
    form.verify({
        // 定义一个pwd校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            // 取到密码框的值并进行比较
            let pass = $(".reg-box [name=password]").val();
            if (value !== pass) {
                return "两次密码不相同！"
            };
        }

    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax的POST请求
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功,请登录！");
            // 模拟人的点击行为
            $("#link_login").click();
        });
    })

    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            // 成功回调
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登陆成功！");
                // 将登陆成功后得到的token存到本地存储
                localStorage.setItem("token", res.token)
                    // 跳转至后台主页
                location.href = 'index.html'
            }
        })
    })
})