const swiperParams = {
    slidesPerView : 2.8,
    spaceBetween  : 20,
    freeMode      : true,
    grabCursor    : true,
    navigation    : {
        nextEl : '.swiper-button-next',
        prevEl : '.swiper-button-prev',
    }
};

const personages      = new Swiper('#personagesSwiper .swiper-container', swiperParams);
const questionsSlider = new Swiper('#questionsSlider .swiper-container', swiperParams);
