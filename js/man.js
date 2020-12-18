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
fun('../api/getMan.php');

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
                start: defaultInfo.num,
                len: defaultInfo.len
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