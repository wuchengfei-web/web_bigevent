$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
})

var form = layui.form;
form.verify({
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    rePass: function(value) { //value：表单的值、item：表单的DOM对象
        var pwd = $('.reg-box [name=password]').val();
        if (pwd !== value) {
            return '两次密码不一致';
        }
    }
});

$('#form_login').submit(function(e) {
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            localStorage.setItem('token', res.token);
            location.href = '/index.html'
        }
    })
})

$('#form_reg').submit(function(e) {
    e.preventDefault();
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.ajax({
        method: 'post',
        url: '/api/reguser',
        data: data,
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('#link_login').click();
        }
    })
})