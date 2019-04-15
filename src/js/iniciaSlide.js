// $(function() {
    var swiper = new Swiper('#teste', {
        // effect: 'fade',
        pagination: {
            el: '#pgteste',
            type: 'progressbar',
        },
        navigation: {
          nextEl: '#nextteste',
          prevEl: '#prevteste',
        },
        slidesPerView: 1,
        loop: true,
        // autoplay: {
        //   delay: 5000,
        // },
    });



    var swiper = new Swiper('#slideDepoimentos', {
        pagination: '#slideDepoimentosPagination',
        paginationClickable: true,
        speed: 300,
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });

    var galleryTop = new Swiper('#gallery-top', {
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        spaceBetween: 10,
    });
    var galleryThumbs = new Swiper('#gallery-thumbs', {
        // spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
// });