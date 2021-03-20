$(function () {

    $('.link_reg').on('click', function () {
        $('.form-login').hide();
        $('.form-register').show();
    })

    $('#link_login').on('click', function () {
        $('.form-login').show();
        $('.form-register').hide();
    })

    // 定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value) {
            if (value !== $('.form-register input[name=password]').val()) {
                return '两次密码输入不一致';
            }
        }
    })

    // 注册功能
    let layer = layui.layer;
    $('.form-register').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('.form-register input[name=username]').val(),
                password: $('.form-register input[name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功，请登录！', { icon: 6 });
                $('#link_login').click();
                $('.form-register')[0].reset();
            }
        })
    });

    //登录功能
    $('#form_login').on('submit', function () {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('登录成功，请登录！', { icon: 6 });

                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })

})