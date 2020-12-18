// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4
let reg = /id=(\d+)/;
let res = reg.exec(location.search);
// console.log(res);

if (!reg.test(location.search)) {
    location.href = '../html/all.html'
}
let id = reg.exec(location.search)[1];
let container = document.querySelector('.container');
var detail = document.querySelector('.product');




//根据id获取数据
getData();
async function getData() {
    var res = await pAjax({
            url: '../api/getpar.php',
            data: {
                id
            }

        })
        // console.log(res);

    localStorage.setItem('list', JSON.stringify(res));
    //渲染商品详情页面
    render(res.detail);


    // swiper插件 轮播图相关的插件
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        initialSlide: 2,
        // autoplay: {
        //     delay: 1000,
        //     stopOnLastSlide: false,
        //     disableOnInteraction: true,
        // },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    //商品详情页tab切换
    $('.nav li').on('click', function() {
        console.log($('.nav li'));

        $(this).addClass('border').siblings().removeClass('border');
        var index = $(this).index();

        $('.tab section').eq(index).addClass('block').siblings().removeClass('block');
    })

}

var str;



//封装一个渲染商品详情页的函数
function render(data) {
    // console.log(data);

    str = "";
    str += `
    <div class="product_top clearfix">
    <div class="box ">
        <div class="show">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="${data.pic3}" alt=""></div>
                    <div class="swiper-slide"><img src="${data.pic2}" alt=""></div>
                    <div class="swiper-slide"><img src="${data.img}" alt=""></div>
                </div>
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>

            </div>
            <div class="mask"></div>
        </div>
        <div class="enlarge"></div>
        <div class="message">

        </div>



    </div>

    <div class="about">
        <h2>P E T I T E&nbsp;&nbsp;A S H S F I E L D <span>￥${data.price}</span></h2>
        <p>
            <span><i>颜色</i><i class="${data.colourapply}"></i></span>
            <span><i>尺码</i><i>${data.size}</i></span>
            <span><i>价格</i><i>￥${data.price}</i></span>
        </p>
        <p><i>+</i><i>定制贺卡</i>￥ 0</p>

        <button id="addcar">加入购物车</button>
        <ul>
            <li>顺丰包邮</li>
            <li>免息分期</li>
            <li>正品保障</li>
        </ul>
    </div>
</div>


<div class="content clearfix">
    <ul class="nav clearfix">
        <li class="border">商品展示</li>
        <li>商品参数</li>
        <li>品牌故事</li>
        <li>服务说明</li>
    </ul>
    <ul class="tab clearfix">
        <section class="pro_show block clearfix">
            <div class="pic">
                <img src="${data.pro1}" alt="">
            </div>

            <div class="pic">
                <img src="${data.pro2}" alt="">
            </div>
            <div class="pic">
            <img src="${data.pro3}" alt="">
                <div class="explain">
                    <h3>至简格调</h3>
                    <p> 沿袭经典北欧风格</p>
                    <p>以无秒针设计赋予表盘至简格调</p>
                </div>
            </div>

        </section>
        <section class="parameter clearfix">
            <div class="left">
                <h2>${data.tltle}</h2>
                <ul class="txt">
                    <li>机芯<span>日本石英机芯</span></li>
                    <li>防水性<span>30米生活防水</span></li>
                    <li>尺码<span>${data.size}</span></li>
                    <li>表扣颜色<span>${data.color}</span></li>
                    <li>商品系列<span>${data.name}</span></li>
                </ul>
            </div>

            <div class="right">
                <img src="${data.pic2}" alt="">

            </div>
        </section>
        <section class="story clearfix">
            <h2>
                DANIEl WELLINGTON品牌诞生源于一次跨越半个世界的巧遇:在旅行途中，品牌创始人FILIP TYSANDER遇见一位送人的英国绅士，他的着装风格低调简约，喜爱佩戴一款古董手表，表带则是斑驳的尼龙表带。这位迷人的绅士名字便叫DANIEL WaLLNGToN。受这位新朋友的经典格调启发，FILIP决定创建自己的腕饰品牌。其以时尚简约的腕表与配饰闻名，设计简洁优雅，经典隽永并适合各种场合穿搭，深受消费者喜爱，让品牌在业界独树一帜。


            </h2>
        </section>
        <section class="serve clearfix">

            <h2>日常保养</h2>
            <div class="details">
                <ul>
                    <li><span><img src="https://images.ctfassets.net/mv3xw5mnbbp0/6zVHCamUQYzi91FCrjO6Vi/641131adb9e71258df3cb05070b0ed14/waterproof.png" alt=""></span> <span>30米生活防水</span> </li>
                    <li><span><img src="https://images.ctfassets.net/mv3xw5mnbbp0/4vqFZRNZlAlFwswU644FF3/cfb24b1b1ca133e288dfecf6f4e32afb/___________________15897841028136.png" alt=""></span> <span>避免尖锐物体</span></li>
                    <li><span><img src="https://images.ctfassets.net/mv3xw5mnbbp0/1f3lcrjSgTSkUD2KatbIRL/b3c3c4209486af6925e7f240f7f11039/wash.png" alt=""></span> <span>可水洗</span></li>
                    <li><span><img src="https://images.ctfassets.net/mv3xw5mnbbp0/6TEil32E5fsYcmTELlrCZ5/fd92e9d5d0fb7b530c1d2dce9a7fbcb2/dry.png" alt=""></span><span>可暖风烘干</span> </li>
                </ul>

            </div>

            <div class="payexplain">
                <h2>价格说明</h2>
                <h3>划线价格</h3>
                <p>值商品的专柜价，品牌价，建议零售价或该商品曾经展示过的销售价格登，并非原价仅供您参考</p>
                <h3>未划线价格</h3>
                <p>指商品的实时标价，或因顾客使用优惠券，折扣码，积分发生变化，具体成交价格以订单结算界面为准</p>

            </div>




        </section>
    </ul>
</div>

    `
    detail.innerHTML = str
}



//加入购物车点击事件
detail.onclick = function() {
    var e = window.event;
    var login = getCookie('login');
    if (e.target.id == 'addcar') {
        addcar();
        // console.log("点击了加入购物车");
    }
}