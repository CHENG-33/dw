let carlist = document.querySelector('.carlist');
var login = getCookie('login');
var sum = document.querySelector('.sum')
console.log(sum);

pAjax({
    url: '../api/getcar.php',
    data: {
        username: login
    }
}).then(res => {
    // console.log(res);
    localStorage.setItem('list', JSON.stringify(res));
    render(res);

})


function render(data) {
    carlist.innerHTML = '';
    // 计算选中商品的总价格

    let total = shopNum(data);

    data.forEach((item, index) => {
        var sum = item.price * item.num;
        // console.log(sum);

        carlist.innerHTML += `    <tr class="content" index=${index}>
   
    <td class="img"><img class="imgs" src="${item.img}" alt=""></td>
    <td class="type"><span>${item.name}</span></td>
    <td class="price">￥<span>${item.price}</span></td>
    <td class="num">
        <button class="reduce" pro_id="${item.id}">-</button>
        <input type="text" value="${item.num}" class="count">
        <button class="add" pro_id="${item.id}">+</button>
    </td>
    <td class="total">￥<span>${sum}</span></td>
    <td class="delpro"><button class="del" pro_id="${item.id}">×</button></td>
</tr>`
    })
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
                    // console.log(res1);

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
            render(res2);
            // console.log(res2);


        }

    })

}

function shopNum(res) {

    var num = res.reduce((pre, item) => {
        return pre + item.num * 1
    })

    let totalPrice = res.reduce((pre, item) => {
        return pre + item.price * item.num
    }, 0);

    console.log(totalPrice);
    sum.innerHTML = totalPrice



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
            render(data);
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
            render(data);
        }
    })

}
//购物车里的点击事件
$('.carlist').click(function() {
    var e = window.event;
    var login = getCookie('login');

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