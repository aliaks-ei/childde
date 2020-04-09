const personages = new Swiper('#personagesSwiper .swiper-container', {
    slidesPerView : 2.8,
    spaceBetween  : 20,
    freeMode      : true,
    grabCursor    : true,
    navigation    : {
        nextEl : '.swiper-button-next',
        prevEl : '.swiper-button-prev',
    }
});
