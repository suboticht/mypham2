
var footer;
let subMenuFooter02 = "";
if($(".main__page").data("child-folder")) {
    const getSubMenu02 = $(".main__page").data("child-folder");
    if(getSubMenu02 > 0) {
        for(let i = 0; i < getSubMenu02; i++) {
            subMenuFooter02 += "../";
        }
    }
}
footer = `
    <div id="button-top" style=""><a href="#shoptop"><i class="fa-solid fa-chevron-up"></i></a></div>
    <div class="container">
        <div class="footer-top">
            <div class="column column-lg-3">
                <div class="footer__ttl">
                    <h4>hỗ trợ khách hàng</h4>
                </div>
                <ul class="support__list">
                    <li class="support__list__item">
                        <a href="/hotro/huongdandathang/index.html">Hướng dẫn đặt hàng</a>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/phuongthucthanhtoan/index.html">Phương thức thanh toán</a>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/phivanchuyen/index.html">Phí vận chuyển</a>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/chinhsachdoitra/index.html">Chính sách đổi trả</a>
                    </li>
                </ul>
            </div>
            <div class="column column-lg-3">
                <div class="footer__ttl">
                    <h4>Emm skincare & cosmetics</h4>
                </div>
                <ul class="support__list">
                    <li class="support__list__item">
                        Hotline: <strong>086.226.3304</strong>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/gioithieu/index.html">Giới thiệu</a>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/chinhsachbaomat/index.html">Chính sách bảo mật</a>
                    </li>
                    <li class="support__list__item">
                        <a href="/hotro/lienhe/index.html">Liên hệ</a>
                    </li>
                </ul>
            </div>
            <div class="column column-lg-3">
                <div class="footer__ttl">
                    <h4>HỢP TÁC & LIÊN KẾT</h4>
                </div>
                <div class="fb-page" data-href="https://www.facebook.com/NhuEmm04" data-tabs="" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/NhuEmm04" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/NhuEmm04">Emm Skincare &amp; Cosmetics</a></blockquote></div>
                <div class="social_element">
                    <a href="#" class="social_item" target="_blank">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/NhuEmm04/" class="social_item" target="_blank">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                    <a href="#" class="social_item" target="_blank">
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p></p>
            <p>© 2023 - Emm Skincare & Cosmetics</p>
        </div>
    </div>
`


$(".js_render_footer").html(footer);
