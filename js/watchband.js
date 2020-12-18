var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true, //可选选项，自动滑动
        initialSlide: 1, //设定初始化时slide的索引
        speed: 300, //切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
        autoplay: {
            delay: 3000,

        },

    })
    //页面滑动让顶部隐藏nav显示
window.onscroll = function() {
    if (scrollY >= 130) {

        $(".none").css("display", "block");
    }
    if (scrollY <= 130) {
        $(".none").css("display", "none");
    }
}


var all = document.querySelector('.productAll');
fun('../api/getband.php');

function fun(apiurl) {

    var defaultInfo = {
        len: 16,
        num: 1
    }

    pAjax({
            url: apiurl,
            data: {
                start: defaultInfo.num,
                len: defaultInfo.len
            }
        }).then(res => {
            console.log(res);

            getData()
            $('.m-style').pagination({
                pageCount: 5,
                totalData: res.total,
                showData: 16,
                coping: true,
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '末页',
                current: 1,
                jump: true,
                callback: function(nums) {

                    // api 得到是 pagination 的对象
                    defaultInfo.num = nums.getCurrent();
                    getData();
                    scrollTo(0, 0)
                }
            });


        })
        // https://www.jq22.com/yanshi5697





    // var res;
    //获取数据
    async function getData() {
        var res = await pAjax({
            url: apiurl,
            data: {
                start: 1,
                len: 30
            }

        })

        //渲染页面
        render(res.list);


    }



}

//封装一个渲染页面的函数
function render(data) {
    console.log(data);

    str = '';
    data.forEach((item, index) => {
        str += `     
            <a href="../html/particulars.html?id=${item.id}">
            <div class="product">
            <dl>
                <dt>
                            <img src="${item.img}" alt="">
                        </dt>
                <dd>
                    <p>${item.name}</p>
                    <p>${item.title}</p>
                    <p> <span class="color"><i class="${item.colourapply}"></i> ${item.color}</span>
                        <span class="price">￥${item.price}</span></p>
                    <p>已售出${item.salesVolume}笔</p>
    
                </dd>
            </dl>
        </div></a>`
    })

    all.innerHTML = str;

}