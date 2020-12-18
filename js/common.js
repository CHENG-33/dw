//页面滑动让顶部隐藏nav显示
window.onscroll = function() {
    if (scrollY >= 130) {

        $(".none").css("display", "block");
    }
    if (scrollY <= 130) {
        $(".none").css("display", "none");
    }
}

//让购物车隐藏出现
function none() {
    var h = $(window).height() + "px";

    $('.carnone').css({ "height": h, "display": "block" });
    $('body').css({ "height": h, "overflow": "hidden" });

}

function open() {
    $('.carnone').css("display", "none");
    $('body').css({ "height": "", "overflow": "" });

}
$('.car').click(function() {

    opencar();
    none();
})

$('.close').click(function() {
    open();
})
$('.shop').click(function() {

    open();

    location.href = '../html/all.html';
})



//封装一个渲染购物车页面的函数
function rendercar(data) {
    // console.log(data);

    var login = getCookie('login');
    var carlist = document.querySelector('.carlist');
    if (!login) {
        var or = document.querySelector(".or");
        or.innerHTML = `   <h2>您还没有登录哦</h2>
        <div class="btn">
        <a href="./login.html"><button>立即登录</button></a>
        </div>`

        // <a href="./login.html"><button>立即登录</button></a>
        // location.href = '../html/login.html';
        localStorage.setItem('url', 'http://dw.com/html/particulars.html?id=' + id);
        return
    }

    if (data.length == 0) {
        carlist.innerHTML = `<h2>您的购物车中没有商品</h2>
        <div class="btn">
        <a href="./all.html"><button>继续选购</button></a>
        </div>`;
        return
    }
    carlist.innerHTML = '';
    data.forEach((item, index) => {
        carlist.innerHTML += `      <tr class="content" index=${index}>
        <td class="img"><img class="imgs" src="${item.img}" alt=""></td>
        <td class="type"><span>${item.name}</span><span class="price">￥<i>${item.price}</i></span></td>
        
        <td class="num">
            <button class="reduce" pro_id="${item.id}">-</button>
            <input type="text" value="${item.num}" class="count">
            <button class="add" pro_id="${item.id}">+</button>
        </td>
        <td class="delpro"><button class="del" pro_id="${item.id}">×</button></td>
    </tr>`
    })

    var pay = document.querySelector(".pay");
    pay.innerHTML = ` <a href="./car.html"><button class="gopay">前往结账</button></a>`;


}

//封装一个打开购物车的函数
function opencar() {
    var login = getCookie('login');
    if (!login) {
        var or = document.querySelector(".or");
        or.innerHTML = `   <h2>您还没有登录哦</h2>
        <div class="btn">
        <a href="./login.html"><button>立即登录</button></a>
        </div>`



        // <a href="./login.html"><button>立即登录</button></a>
        // location.href = '../html/login.html';
        localStorage.setItem('url', 'http://dw.com/html/particulars.html?id=' + id);
        return
    }
    pAjax({
        url: '../api/getcar.php',
        data: {
            username: login
        }
    }).then(res => {
        // console.log(res);
        localStorage.setItem('list', JSON.stringify(res));
        rendercar(res);

    })
    none();
}

//封装点击加入购物车的函数
function addcar() {
    var login = getCookie('login');
    if (!login) {

        var or = document.querySelector(".or");
        or.innerHTML = `   <h2>您还没有登录哦</h2>
        <div class="btn">
        <a href="./login.html"><button>立即登录</button></a>
        </div>`

        // <a href="./login.html"><button>立即登录</button></a>
        // location.href = '../html/login.html';
        localStorage.setItem('url', 'http://dw.com/html/particulars.html?id=' + id);
        none();
        return
    }

    //把用户名和id添加到数据库
    pAjax({
            url: '../api/addcar.php',
            data: {
                username: login,
                pro_id: id
            }
        }).then(res => {
            if (res.code) {
                pAjax({
                    url: '../api/getcar.php',
                    data: {
                        username: login
                    }
                }).then(res1 => {
                    // console.log(res);
                    localStorage.setItem('list', JSON.stringify(res1));
                    rendercar(res1);
                    console.log(res1);

                })
            }

        })
        // 获取用户购物车中的数据

    none();
}

//封装一个删除商品的函数
function del() {
    var e = window.event;
    var login = getCookie('login');
    let id = e.target.getAttribute("pro_id")
        // console.log(id);
        // console.log(login);
        //删除数据库中的数据
    pAjax({
        url: '../api/delpro.php',
        data: {
            username: login,
            pro_id: id
        }
    }).then(res => {
        console.log(res);

        if (res.code) {
            // 获取本地存储中的数据
            let data = JSON.parse(localStorage.getItem('list'));
            //删除本地存储的数据
            // console.log(data);

            let res2 = data.filter(item => {
                return item.id != id;
            });

            localStorage.setItem('list', JSON.stringify(res2));
            rendercar(res2);
            console.log(res2);


        }

    })

}

//封装一个数量减法的函数
function reduce() {
    // 进行数量减法
    var e = window.event;
    var login = getCookie('login');
    let data = JSON.parse(localStorage.getItem('list'));
    let id = e.target.getAttribute('pro_id');

    let obj = data.filter(item => {
        return item.id == id
    })[0];
    let num = obj.num * 1;
    if (num <= 1) {
        num = 1
    } else {
        num--
    }
    pAjax({
        url: '../api/upnum.php',
        data: {
            username: login,
            pro_id: id,
            num: num
        }
    }).then(res => {
        if (res.code) {
            obj.num = num;
            localStorage.setItem('list', JSON.stringify(data));
            rendercar(data);
        }
    })

}

//封装一个数量加法的函数
function addnum() {
    // 进行数量减法
    var e = window.event;
    var login = getCookie('login');
    let data = JSON.parse(localStorage.getItem('list'));
    let id = e.target.getAttribute('pro_id');

    console.log(data);


    let obj = data.filter(item => {
        return item.id == id
    })[0];
    let num = obj.num * 1;
    num = num + 1;
    console.log(num);

    pAjax({
        url: '../api/upnum.php',
        data: {
            username: login,
            pro_id: id,
            num: num
        }
    }).then(res => {
        if (res.code) {
            obj.num = num;
            localStorage.setItem('list', JSON.stringify(data));
            rendercar(data);
        }
    })

}
//购物车里的点击事件
$('.carnone').click(function() {
    var e = window.event;
    var login = getCookie('login');

    if (e.target.id == 'shop') {
        if (!login) {
            location.href = '../html/login.html';
            localStorage.setItem('url', 'http://dw.com/html/particulars.html?id=' + id);
            return
        }
    }
    if (e.target.className == 'del') {
        del();
    }
    if (e.target.className == 'reduce') {
        reduce();


    }
    if (e.target.className == 'add') {
        addnum();


    }


})