var n = document.querySelector(".none");
window.onscroll = function() {
    if (scrollY >= 130) {
        n.style.display = "block";
    }

    if (scrollY <= 130) {


        n.style.display = "none";
    }
}

// var user = $('#login .username').val();
var user = document.querySelector('.username');
var password = document.querySelector('.psd')
    // console.log(user);

// 给validate自定验证规则
//  jQuery.validator.addMethod(规则名字,函数,'验证错误的提示信息')
// $('.loginbtn').click(function() {
//     console.log(user.value);

// })

var loginbtn = $('.loginbtn');
$('#login').validate({
    rules: {
        username: {
            required: true,
            maxlength: 14,
            minlength: 2
        },

        password: {
            required: true,

        }

    },
    messages: {
        username: "用户名不能为空",

        password: "密码不能为空"
    },
    submitHandler: function() {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 

        // 注册发出的Ajax请求

        // console.log($('.password').val());
        // console.log($('.username').val());

        $.ajax({
            url: '../api/login.php',
            type: 'post',
            data: {
                username: $('.username').val(),
                password: $('.password').val()
            },
            dataType: 'json',
            success: function(res) {
                console.log(1);

                if (res.code == 1) {
                    console.log(1);
                    setCookie('login', $('.username').val());
                    let url = localStorage.getItem('url');

                    // location.href = './index.html'
                    // $.cookie('login', $('.username').val());
                    if (url) {
                        location.href = url;
                        // 登录成功的时候把url的这个cookie值清除
                        localStorage.removeItem('url');
                    } else {
                        location.href = './index.html';
                    }
                }

                if (res.code == 0) {
                    alert("用户名或密码输入错误")
                }
            }
        })

    }

})