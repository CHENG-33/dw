//页面滑动让顶部隐藏nav显示
window.onscroll = function() {
    if (scrollY >= 130) {

        $(".none").css("display", "block");
    }
    if (scrollY <= 130) {
        $(".none").css("display", "none");
    }
}

var watches = document.querySelector('.new');
var ring = document.querySelector('.ringcontent');
var band = document.querySelector('.band');


//封装一个渲染页面的函数
function render2(data) {
    console.log(data);


    var str1 = '';
    data.forEach((item, index) => {
        str1 += `     
        <a href="../html/particulars.html?id=${item.id}">
        <div class="product">
                    <dl>
                        <dt>
                                        <img src="${item.img}" alt="">
                                    </dt>
                        <dd>
                            <p>全新上市</p>
                            <p>${item.name}</p>
                            <p>${item.title}</p>
                            <p> <span class="color"><i class="${item.colourapply}"></i> ${item.color}</span>
                                <span class="price">￥${item.price}</span></p>
                            <p>已售出${item.salesVolume}笔</p>

                        </dd>
                    </dl>
                </div></a>`
    })

    watches.innerHTML = str1;

}

//渲染首页戒指
function renderring(datas) {

    console.log(datas);

    var str2 = '';
    datas.forEach((item, index) => {
        str2 += `  
        <a href="../html/particulars.html?id=${item.id}">   
        <div class="product">
                    <dl>
                        <dt>
                                        <img src="${item.img}" alt="">
                                    </dt>
                        <dd>
                            <p>全新上市</p>
                            <p>${item.name}</p>
                            <p>${item.title}</p>
                            <p> <span class="color"><i class="${item.colourapply}"></i> ${item.color}</span>
                                <span class="price">￥${item.price}</span></p>
                            <p>已售出${item.salesVolume}笔</p>

                        </dd>
                    </dl>
                </div></a>`
    })

    ring.innerHTML = str2;

}
//渲染首页表带
function renderband(datas) {

    console.log(datas);

    var str3 = '';
    datas.forEach((item, index) => {
        str3 += `  
        <a href="../html/particulars.html?id=${item.id}">   
        <div class="product">
                    <dl>
                        <dt>
                                        <img src="${item.img}" alt="">
                                    </dt>
                        <dd>
                            <p>全新上市</p>
                            <p>${item.name}</p>
                            <p>${item.title}</p>
                            <p> <span class="color"><i class="${item.colourapply}"></i> ${item.color}</span>
                                <span class="price">￥${item.price}</span></p>
                            <p>已售出${item.salesVolume}笔</p>

                        </dd>
                    </dl>
                </div></a>`
    })

    band.innerHTML = str3;

}


pAjax({
    url: '../api/getall.php',
    data: {
        start: 1,
        len: 30
    }
}).then(res => {
    console.log(res);

    if (res.code) {
        // 获取本地存储中的数据
        localStorage.setItem('list', JSON.stringify(res.list));
        //删除本地存储的数据

        //拿出所有商品列表中的戒指渲染页面
        let res3 = res.list.filter(item => {
            return item.name == "RING";
        });
        renderring(res3);

        //拿出所有商品列表中的戒指渲染页面
        let arrband = res.list.slice(26);
        console.log(arrband);
        renderband(arrband)



        let arr = res.list.slice(0, 4);
        console.log(arr);
        render2(arr)

    }

})