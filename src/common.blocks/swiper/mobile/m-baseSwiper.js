const swiperParams = {
    spaceBetween  : 12,
    freeMode      : true,
    grabCursor    : true
};

document.addEventListener('DOMContentLoaded', () => {
    const swiperEls = document.getElementsByClassName('base-swiper');

    for (let i = 0; i < swiperEls.length; i++) {
        swiperEls[i].querySelector('.swiper-container').classList.add(`swiper-${ i + 1 }`);

        new Swiper(`.swiper-${ i + 1 }`, swiperParams)
    }
});
