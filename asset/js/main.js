
var arrProducts = arr['product'];
var arrCategory = arr['category'];
const mediaQuery = window.matchMedia('(max-width: 750px)');

function renderFeauredProduct(){
    var itemHTML = [];
    var a = [];
    var slide = $(".js_render_hot_product");
    arrProducts.forEach(function(item, index) {
        var category = item.name;
        if(item['hot']) {
            var cateID = item.parent;
            var parentCate = arrCategory[cateID-1].name;
            var sale = item.pricesale ? (((item.pricesale - item.price)/item.pricesale)*100).toFixed(0) : "0";
            itemHTML[index] = `<li class="featured__item">
                <div class="featured__box">
                    <a href="/products/single-product.html?product_id=${item.id}&category_id=${cateID}">
                        <div class="product__figure">
                            <img src="${item.imageFolder}01.jpg" class="img_thumb" alt="${item.name}">
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
            // slide.append(itemHTML)
        }
    });
    $.each( xaomang(itemHTML), function( key, value ) {
        slide.append(value);
    });
}

function renderCategory() {
    var cateHTML;
    var list = $(".section__cate .js_render_category");
    arrCategory.forEach(function(item, index) {
        if(index < 6) {
            cateHTML = index === 5 ? 
            `<li class="category__item last__category"><a href="/danhmuc/index.html"><div class="category__figure"><img src="${item.imageFolder}thumbnails.jpg" class="img_thumb lazy loaded" alt="${item.name}"></div><div class="category__cat"><strong>Xem tất cả</strong></div></a></li>` 
            : 
            `<li class="category__item"><a href="/danhmuc/index.html?category_id=${item.id}"><div class="category__figure"><img src="${item.imageFolder}thumbnails.jpg" class="img_thumb lazy loaded" alt="${item.name}"></div><div class="category__cat"><strong>${item.name}</strong></div></a></li>`;
            list.append(cateHTML)
        }
    });
}

function renderSingleProduct() {
    var productInfoHTML, productMediaHTML, productDetailsHTML;
    const pr = getParam();
    const pd = arrProducts[pr["product_id"] - 1];
    var sale = pd.pricesale ? (((pd.pricesale - pd.price)/pd.pricesale)*100).toFixed(0) : "0";
    var media_render = $(".js_render_product_media");
    var info_render = $(".js_render_product_info");
    var details_render = $(".js_render_info_details");

    document.title = pd.name + " | Mỹ phẩm chính hãng Huế";
    $(".js_render_cate_name").text(arrCategory[pd.parent - 1].name);
    $(".js_render_product_name").text(pd.name);

    pd.image.forEach(function(item, index) {
        productMediaHTML = `<li class="item">
            <img src="${pd.imageFolder}${item}.jpg" alt="combo VIJULLY">
        </li>`;
        media_render.append(productMediaHTML)
    });
    productInfoHTML = `
        <div class="product__name">
            <h5>${pd.name}</h5>
        </div>
        <div class="group-status">
            <span class="first_status status_2">
                Tình trạng: <span class="status_name availabel">Còn hàng</span>
                <span class="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            </span>
            <span class="first_status  product_sku">Mã SKU:
                <span class="status_name product-sku" itemprop="sku" content="Đang cập nhật"> Đang cập nhật</span>
            </span>
        </div>
        <div class="block_timer_deal_detail space_bottom_5">
            <div class="title_deal_brand">
                <span class="text_deal_brand">
                    <i class="fa-solid fa-bolt-lightning"></i></span>
                    FLASH SALES
                <div class="time_finish right">
                    
                </div>
                <div class="clearfix"></div>
            </div>
        </div>  
        <div class="price-box">
            <span class="special-price"><span class="price product-price">${formatvnd(pd.price)}</span> 
            </span>
            <span class="old-price">
                <del class=" product-price-old sale">${pd.pricesale ? pd.pricesale : ""}</del> 
            </span>
            <div class="label_product">${sale}% </div>
            <div class="save-price">
                (Tiết kiệm: <span>${formatvnd(pd.price*sale)}</span>)
            </div>
        </div>`;
    info_render.append(productInfoHTML);
    details_render.append(pd.description ? pd.description : '<p class="cos_line_ttl">ĐANG CẬP NHẬT</p>');
}

function renderCateProduct() {
    var itemPerPage = 4;
    var cateProduct = [];
    const pr = getParam();
    const pd = arrProducts[pr["category_id"] - 1];
    var sale = pd.pricesale ? (((pd.pricesale - pd.price)/pd.pricesale)*100).toFixed(0) : "0";

    document.title = arrCategory[pr["category_id"] - 1].name + " | Mỹ phẩm chính hãng Huế";
    $(".js_render_cate_name").text(arrCategory[pr["category_id"] - 1].name);

    arrProducts.forEach(function(item, index) {
        if(item.parent == pr["category_id"] ) {
            cateProduct[index] = `
            <li class="featured__item" data-productID=${item.id}>
                <div class="featured__box">
                    <a href="/products/single-product.html?product_id=${item.id}&category_id=${pr["category_id"]}">
                        <div class="product__figure">
                            <img src="${item.imageFolder}01.jpg" class="img_thumb" alt="${item.name}">
                        </div>
                        <div class="product__price">
                            <strong class="price-sale">${formatvnd(item.price)}</strong>
                            <span class="price">${item.pricesale ? item.pricesale : ""}</span>
                            <span class="deal">${sale}%</span>
                        </div>
                        <div class="product__cat">
                            <strong>${arrCategory[pr["category_id"] - 1].name}</strong>
                        </div>
                        <div class="product__name">
                            <p>${item.name}</p>
                        </div>
                    </a>
                </div>
            </li>`;
        }
    });
    const page = Math.ceil(cateProduct.length/itemPerPage);
    if(page > 1) {
        for(var i=0; i< page; i++) {
            $(".js_render_page").append(`<li><a href="/danhmuc/index.html?category_id=${pr["category_id"]}&page=${i+1}">${i+1}</a></li>`);
        }
    }

    const currentPage = pr["page"] ? pr["page"] : 1;

    cateProduct.forEach(function(item, index) {
        if((currentPage - 1)*itemPerPage <= index && index < currentPage*itemPerPage) {
            $(".js_render_cate_product").append(item);
        }
    })
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
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }
      ]
    });
    $('.product__media__slider .slider').slick({
        infinite: true,
        speed: 500,
        fade: true,
        arrows: false,
        cssEase: 'linear',
        dots: true,
        customPaging: function(slick,index) {
            var targetImage = slick.$slides.eq(index).find('img').attr('src');
            return '<img src=" ' + targetImage + ' "/>';
        }
    });
}

function toggleMenu() {
$('.header_menu_sp .icon')
.toggleClass('menu')
.toggleClass('close');
  $('html').toggleClass("overflow-hidden");
  $('.header__menu').toggleClass("open");
}
$('.header__menu .main__menu--item .dropdown').on('click', function() {
    if(mediaQuery.matches) {
        const $item = $(this).next('.main__menu__child');
        if($item.css("display") === "block" || $item.css("display") === "flex") {
            $(this).removeClass('open');
        } else {
            $(this).addClass('open');
        }
        $item.stop(true,true).slideToggle();
    }
});
var xaomang = function (array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
function formatvnd(n) {
    return Number(n).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " VND";
}

var getParam = function(){
    var queryString = window.location.search;
    var queryObject = new Object();
    if(queryString){
      queryString = queryString.substring(1);
      var parameters = queryString.split('&');
    
      for (var i = 0; i < parameters.length; i++) {
        var element = parameters[i].split('=');
    
        var paramName = decodeURIComponent(element[0]);
        var paramValue = decodeURIComponent(element[1]);
        queryObject[paramName] = paramValue;
      }
    }
    return queryObject;
}

function leafAnimation() {
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);

    TweenMax.from(".logo", 1, {
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    TweenMax.staggerFrom(".menu-links ul li", 1, {
      opacity: 0,
      x: -20,
      ease: Power3.easeInOut
    }, 0.08)

    TweenMax.from(".search", 1, {
      delay: .5,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".account", 1, {
      delay: .6,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".cart", 1, {
      delay: .7,
      opacity: 0,
      x: -20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".juice", 1, {
      delay: 2,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".leaves .layer:nth-child(1)", 2, {
      delay: 2,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".leaves .layer:nth-child(2)", 2, {
      delay: 2.1,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".leaves .layer:nth-child(3)", 2, {
      delay: 2.2,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".leaves .layer:nth-child(4)", 2, {
      delay: 2.3,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".leaves .layer:nth-child(5)", 2, {
      delay: 2.5,
      opacity: 0,
      y: -800,
      ease: Expo.easeInOut
    })

    TweenMax.from(".title", 1, {
      delay: 1,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".tagline", 1, {
      delay: 1.3,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".pages", 1, {
      delay: 1.3,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".more", 1, {
      delay: 1.4,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".desc", 1, {
      delay: 1.4,
      opacity: 0,
      y: 20,
      ease: Expo.easeInOut
    })

    TweenMax.from(".arrows", 1, {
      delay: 2,
      opacity: 0,
      ease: Expo.easeInOut
    })
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < $(window).height()
    );
}

$(document).ready(function() {
    fixedHeader();
    if ($(".js_render_hot_product")[0]){
        renderFeauredProduct();
    }
    if ($(".js_render_category")[0]){
        renderCategory();
    }
    if ($(".js_render_product_media")[0]){
        renderSingleProduct()
    }
    if ($(".js_render_cate_product")[0]){
        renderCateProduct();
    }
    sliderJS();
    //logic menu
    $('.header_menu_sp').click(toggleMenu);
    if ($(".vijully__animation")[0]) {
        leafAnimation();
    }
    $('.FadeInDelay').each(function () {
        if (isInViewport(this)) {
            $(this).addClass('FadeIn')
        }
    })
    $(window).on('scroll', function () {
        $('.FadeInDelay').each(function () {
            if (isInViewport(this)) {
                $(this).addClass('FadeIn')
            }
        })
    })
})
$(document).load(function() {
})
