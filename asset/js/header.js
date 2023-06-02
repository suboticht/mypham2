
var header;
let subMenuHeader02 = "";
if($(".main__page").data("child-folder")) {
    const getSubMenu02 = $(".main__page").data("child-folder");
    if(getSubMenu02 > 0) {
        for(let i = 0; i < getSubMenu02; i++) {
            subMenuHeader02 += "../";
        }
    }
}
header = `
    <div class="header__wrap">
        <div class="header_menu_sp"><div class="menu icon"></div></div>
        <div class="header--logo">
            <h1 class="header__logo--text">
                <a href="/index.html" class="header--link ele_pc">🎀  𝐸𝓂𝓂 𝒮𝓀𝒾𝓃𝒸𝒶𝓇𝑒 & 𝒞💮𝓈𝓂𝑒𝓉𝒾𝒸  🎀</a>
                <a href="/index.html" class="header--link ele_sp">𝐸𝓂𝓂<br>𝒮𝓀𝒾𝓃𝒸𝒶𝓇𝑒 & 𝒞💮𝓈𝓂𝑒𝓉𝒾𝒸</a>
            </h1>
        </div>
        <div class="header__menu">
            <div class="header__menu__wrap">
                <ul class="main__menu--list">
                    <li class="main__menu--item">
                        <a href="/index.html" class="main__menu--link">TRANG CHỦ</a>
                    </li>
                    <li class="main__menu--item">
                        <a href="/danhmuc/index.html?category_id=1" class="main__menu--link">VIJULLY</a>
                    </li>
                    <li class="main__menu--item has-dropdown">
                        <p href="#" class="main__menu--link dropdown">SON MÔI</p>
                        <ul class="main__menu__child">
                            <li class="main__menu__child--item">
                                <a href="#" class="main__menu--link">child 01</a>
                                <!-- <ul class="main__menu__child__child">
                                    <li class="main__menu__child__child--item">
                                        <a href="./content-product/index.html" class="main__menu--link">child 01</a>
                                    </li>
                                    <li class="main__menu__child__child--item">
                                        <a href="./content-product/index.html" class="main__menu--link">child 02</a>
                                    </li>
                                </ul> -->
                            </li>
                            <li class="main__menu__child--item">
                                <a href="#" class="main__menu--link">child 02</a>
                            </li>
                        </ul>
                    </li>
                    <li class="main__menu--item">
                        <a href="/news/index.html" class="main__menu--link">GÓC LÀM ĐẸP</a>
                    </li>
                </ul>
                <form action="#" class="formFilter">
                    <div class="form-group">
                        <div class="free-word-filter">
                            <input type="text" placeholder="nhập thông tin tìm kiếm" id="keyword" name="keyword">
                            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>                                
                    </div>
                </form>
            </div>
        </div>
    </div>`


$(".js_render_header").html(header);
