
var arrProducts = arr['product'];
var arrCategory = arr['category'];

function renderFeauredProduct(){
    var itemHTML;
    var slide = $(".featured__product .js_render_product");
    arrProducts.forEach(function(item, index) {
        var category = item.name;
        if(item['hot']) {
            var cateID = item.parent-1;
            var parentCate = arrCategory[cateID].name;
            var sale = item.pricesale ? (((item.pricesale - item.price)/item.pricesale)*100).toFixed(0) : "0";
            itemHTML = `<li class="featured__item">
                <div class="featured__box">
                    <a href="">
                        <div class="product__figure">
                            <img src="${item.imageFolder}01.jpg" class="img_thumb lazy loaded" alt="${item.name}">
                        </div>
                        <div class="product__price">
                            <strong class="price-sale">${formatvnd(item.price)}</strong>
                            <span class="price">${item.pricesale ? item.pricesale : ""}</span>
                            <span class="deal">${sale}%</span>
                        </div>
                        <div class="product__cat">
                            <strong>${parentCate}</strong>
                        </div>
                        <div class="product__name">
                            <p>${item.name}</p>
                        </div>
                    </a>
                </div>
            </li>`;
            slide.append(itemHTML)
        }
    });
}

function renderCategory() {
    var cateHTML;
    var list = $(".section__cate .js_render_category");
    arrCategory.forEach(function(item, index) {
        console.log('1')
        cateHTML = `<li class="category__item"><a href="javascript:void(0)"><div class="category__figure"><img src="${item.imageFolder}${item.thumbnails}" class="img_thumb lazy loaded" alt="${item.name}"></div><div class="category__cat"><strong>${item.name}</strong></div></a></li>`;
        list.append(cateHTML)
    });
}

function fixedHeader() {
    var h = $("#section__header").outerHeight();
    $(".main__page").css("padding-top", h);
}
function sliderJS() {
    $('.main__slider').not('.slick-initialized').slick({
      dots: true,
      autoplay: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplaySpeed: 5000,
    });
    $('.featured__slider').not('.slick-initialized').slick({
      autoplay: false,
      infinite: true,
      speed: 300,
      adaptiveHeight: true,
      autoplaySpeed: 5000,
      slidesToShow: 4,
      slidesToScroll: 4
    });
}

function xaomang(arr) {
    arr.sort(function() {
        return 0.5 - Math.random();
    });
}
function formatvnd(n) {
    return Number(n).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " VND";
}

$(document).ready(function() {
    fixedHeader();
    renderFeauredProduct();
    renderCategory();
    sliderJS();
})
$(document).load(function() {
})
