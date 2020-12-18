var none = document.querySelector(".none");
window.onscroll = function() {
    if (scrollY >= 130) {
        none.style.display = "block";
    }

    if (scrollY <= 130) {


        none.style.display = "none";
    }
}

//表单正则验证
$('#signin').validate({
    rules: {
        username: {
            required: true,
            maxlength: 14,
            minlength: 2,
        },
        tel: {
            required: true
        },

        password: {
            required: true,
            rangelength: [6, 14],

        }
    },
    messages: {
        username: "用户名不能为空",
        tel: "手机号不能为空",
        password: "密码不能为空"
    },
    submitHandler: function() {
        // 当界面中所有的表单验证都成功的时候 执行这个方法

        $.ajax({
            url: '../api/signin.php',
            type: 'post',
            data: {
                username: $('.username').val(),
                tel: $('.tel').val(),
                password: $('.password').val()
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (res.code == 1) {
                    alert("注册成功，快去登录吧")
                    $('.username').val("");
                    $('.tel').val("");
                    $('.password').val("");
                }
                if (res.code == 0) {
                    alert("用户名已存在")
                }
            }
        })
    }

})

// var redioCount = 0;
// $(document).ready(function() {

//     　　　
//     if ($(".agree").attr("checked") == "checked") redioCount = 1;
//     $("input[type='radio']").click(function() {
//         if (redioCount == 1) {
//             console.log(1);



//             $(this).removeAttr("checked");
//             redioCount = 0;
//         } else {
//             $(this).attr("checked", "checked");
//             redioCount = 1;
//         }
//     });

// })