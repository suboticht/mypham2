
var arrProducts = arr['product'];
var arrCategory = arr['category'];
var itemPerPage = 4;
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
                            <img data-original="${item.imageFolder}01.jpg" class="img_thumb lazy" alt="${item.name}">
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
        if(key < 6) {
            slide.append(value);
        } else {
            return
        }
    });
}

function renderCategory() {
    var cateHTML;
    var list = $(".section__cate .js_render_category");
    arrCategory.forEach(function(item, index) {
        if(index < 6) {
            cateHTML = index === 5 ? 
            `<li class="category__item last__category"><a href="/danhmuc/index.html"><div class="category__figure"><img data-original="${item.imageFolder}thumbnails.jpg" class="img_thumb lazy" alt="${item.name}"></div><div class="category__cat"><strong>Xem tất cả</strong></div></a></li>` 
            : 
            `<li class="category__item"><a href="/danhmuc/index.html?category_id=${item.id}"><div class="category__figure"><img data-original="${item.imageFolder}thumbnails.jpg" class="img_thumb lazy" alt="${item.name}"></div><div class="category__cat"><strong>${item.name}</strong></div></a></li>`;
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

    document.title = pd.name + " | Emm skincare & cosmetics - Mỹ phẩm chính hãng Huế";
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
    var cateProduct = [];
    const pr = getParam();
    const pd = arrProducts[pr["category_id"] - 1];
    var sale = pd.pricesale ? (((pd.pricesale - pd.price)/pd.pricesale)*100).toFixed(0) : "0";

    document.title = arrCategory[pr["category_id"] - 1].name + " | Emm skincare & cosmetics - Mỹ phẩm chính hãng Huế";
    $(".js_render_cate_name").text(arrCategory[pr["category_id"] - 1].name);

    arrProducts.forEach(function(item, index) {
        if(item.parent == pr["category_id"] ) {
            cateProduct[index] = `
            <li class="featured__item" data-productID=${item.id}>
                <div class="featured__box">
                    <a href="/products/single-product.html?product_id=${item.id}&category_id=${pr["category_id"]}">
                        <div class="product__figure">
                            <img data-original="${item.imageFolder}01.jpg" class="img_thumb lazy" alt="${item.name}">
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
    $(".js_render_ttl h6").text(arrCategory[pr["category_id"] - 1].name);
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

function renderSearchProduct() {
    const pr = getParam();
    let products = [], searchProduct = [], l;
    if(pr["keyword"]) {
        l = '/search/index.html?keyword='+pr["keyword"]+'&';
        arrProducts.forEach((product, index) => {
            if(strvn(product.name.toLowerCase()).includes(strvn(pr["keyword"].toLowerCase()))) {
                products.push(product);
            }
        });
        $(".js_render_ttl h6").text('Từ khóa tìm kiếm "'+pr["keyword"]+'"('+products.length+' sản phẩm)');
    } else {
        l = '/search/index.html?';
        products = arrProducts;
        $(".js_render_ttl h6").text('Tất cả sản phẩm ('+products.length+' sản phẩm)');
    }
    products.forEach((item, index) => {
        var cateID = item.parent;
        var parentCate = arrCategory[cateID-1].name;
        var sale = item.pricesale ? (((item.pricesale - item.price)/item.pricesale)*100).toFixed(0) : "0";
        searchProduct[index] = `<li class="featured__item">
                <div class="featured__box">
                    <a href="/products/single-product.html?product_id=${item.id}&category_id=${cateID}">
                        <div class="product__figure">
                            <img data-original="${item.imageFolder}01.jpg" class="img_thumb lazy" alt="${item.name}">
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
    })

    const page = Math.ceil(searchProduct.length/itemPerPage);
    if(page > 1) {
        
        for(var i=0; i< page; i++) {
            $(".js_render_page").append(`<li><a href="${l}page=${i+1}">${i+1}</a></li>`);
        }
    }

    const currentPage = pr["page"] ? pr["page"] : 1;

    searchProduct.forEach(function(item, index) {
        if((currentPage - 1)*itemPerPage <= index && index < currentPage*itemPerPage) {
            $(".js_render_search_product").append(item);
        }
    })
}
function match(input, obj) {
    var matched = Object.keys(obj).find(key => input.toLowerCase().search(key) > -1);
    return obj[matched] || null;
}

function strvn(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

function fixedHeader() {
    var h = $("#section__header").outerHeight();
    $(".main__page").css("padding-top", h);
    if(mediaQuery.matches) {
        $(".header__menu").css("margin-top", h);
    }
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
function formatvnd(x) {
    return Number(x).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}


function leafAnimation() {
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);

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
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < $(window).height()
    );
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
function toTop() {
    
}
$(document).ready(function() {
    //render
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
    if ($(".js_render_search_product")[0]){
        renderSearchProduct();
    }

    fixedHeader();
    if($(".main__slider")[0] || $(".featured__slider")[0] || $(".slider")[0]) {
        sliderJS();
    }
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
    //button top
    var pagetop = $('#button-top');

    if ($(window).scrollTop() > 500) {
        pagetop.fadeIn();
    } else {
        pagetop.fadeOut();
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });
    
    $(".formFilter").on("submit", function (e) {
        e.preventDefault();
        let dataFilter = $("form").serialize();
        window.location="/search/index.html?"+dataFilter;
    });
    $("img.lazy").show().lazyload();
})
$(document).load(function() {
})

