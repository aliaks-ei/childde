const swiperParams = {
    freeMode    : true,
    grabCursor  : true,
    breakpoints : {
        1280: {
            slidesPerView : 2.8,
            spaceBetween  : 20
        },
        600: {
            slidesPerView : 2.4,
            spaceBetween  : 15
        },
        375: {
            slidesPerView      : 1.5,
            slidesOffsetBefore : 12,
            slidesOffsetAfter  : 12,
            spaceBetween       : 12
        },
        320: {
            slidesPerView      : 1.25,
            slidesOffsetBefore : 12,
            slidesOffsetAfter  : 12,
            spaceBetween       : 12
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const swiperEls = document.getElementsByClassName('base-swiper');

    for (let i = 0; i < swiperEls.length; i++) {
        swiperEls[i].querySelector('.swiper-container').classList.add(`swiper-${ i + 1 }`);
        swiperEls[i].querySelector('.swiper-button-prev').classList.add(`btn-prev-${ i + 1 }`);
        swiperEls[i].querySelector('.swiper-button-next').classList.add(`btn-next-${ i + 1 }`);

        new Swiper(`.swiper-${ i + 1 }`, {
            ...swiperParams,
            navigation: {
                nextEl : `.btn-next-${ i + 1 }`,
                prevEl : `.btn-prev-${ i + 1 }`,
            }
        })
    }
});
