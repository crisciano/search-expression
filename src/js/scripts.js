$(function() {
    $("input[type=tel]").mask("(99) 9999-99999");
});

$(window).resize(function() {
    // var d = document;
    // var img = d.querySelectorAll('[data-src]');
    // if(img) { src();}
});

// element .charts
var d = document;
var img = d.querySelector('.charts');

/** layzload **/
var debounce = false;
window.onscroll = function(){
    var d       = document;
    var w       = window;
    var ww      = window.innerWidth;
    var imgs    = d.querySelectorAll('img[data-src]');

    if (debounce) return;
    debounce = true;
    setTimeout(() => debounce = false, 100);

    if (imgs) {
        imgs.forEach((el, i) => {
            if( imgs[i].getBoundingClientRect().top < w.innerHeight + 200 ){ src(); }
        });
    }
};


/** otimização de desenpenho nas imagens... **/
function src(){
    let w = window.innerWidth;
    var d = document;
    var img = d.querySelectorAll('[data-src]');
    var currentSrc;
    img.forEach((el, i)=>{
        var dataSrc;
        var dataSrcDefault = img[i].getAttribute('data-src');
        if(w<575.98) { 
            dataSrc = img[i].getAttribute('data-src-xs'); 
            if (dataSrc) { currentSrc = dataSrc; }else{ currentSrc = dataSrcDefault; }
        }
        if(w>576 && w<767.98) { 
            dataSrc = img[i].getAttribute('data-src-sm'); 
            if (dataSrc) { currentSrc = dataSrc; }else{ currentSrc = dataSrcDefault; }
        }
        if(w>768 && w<991.98) { 
            dataSrc = img[i].getAttribute('data-src-md');
            if (dataSrc) { currentSrc = dataSrc; }else{ currentSrc = dataSrcDefault; }
        }
        if(w>992 && w<1199.98) { currentSrc = img[i].getAttribute('data-src'); }
        if(w>1200) {  currentSrc = img[i].getAttribute('data-src');  }
        if(currentSrc) el.setAttribute('src', currentSrc);
    });
}


// Video Modals
//$('section').closest('body').find('.local-video-container .play-button').click(function() {
$('section').closest('body').find('.play-button').click(function() {
    let $this = $(this);
    console.log(this);
    $this.css('opacity', 0);
    // $this.siblings('video').get(0).play();
    $('.fs-video-wrapper').children('video').get(0).play();
    //$this.parents('section').children('video').get(0).play();
    $('#video').css('background-color','initial');
});

$('#vd').on('ended', function(event) {
    let $this = $(this);
    let el    = $('.play-button');
    console.log('test');
    el.css('opacity', 1);
    $('#video').css('background-color','rgba(0, 0, 0, 0.6)');
});

//hover home materiais
$('#produtos').children('.materiais').hover(function() {
    let $this = $(this);
    $this.find('.box').stop().slideDown('slow');
}, function() {
    let $this = $(this);
    $this.find('.box').stop().slideUp('slow');
});

// slider
let $window         = $(window);
let windowWidth     = $window.outerWidth();
let windowSize      = $window.outerWidth() -18;
let slider          = $('.slide');
let children        = $('.materiais');
let parent          = slider.parent();
let items           = slider.find(children);
let qtdSlider       = items.length;
let nSlideLg        = slider.attr('data-lg');
let nSlideMd        = slider.attr('data-md');
let nSlideSm        = slider.attr('data-sm');
let nSlideXl        = slider.attr('data-xl');
var nSlide;
if(windowWidth >= 769 && windowWidth <= 1024) { nSlide = nSlideLg;}
else if(windowWidth >= 426 && windowWidth <= 768){ nSlide = nSlideMd;}
else if(windowWidth >= 320 && windowWidth <= 425){ nSlide = nSlideSm;}
else { nSlide = nSlideXl;}

//let sizeSlider      = items.outerWidth();
let sizeSlider      = parseInt(windowSize/nSlide);
let total           = parseInt(qtdSlider * sizeSlider);
let indicatorsLeft  = $('#indicators-left');
let indicatorsRight = $('#indicators-right');
let min             = 1;
let max             = qtdSlider;
let interval        = qtdSlider - nSlide;
//let sliderLeft  = parseInt(slider.css('left'),10);

// 1366 - 1348 
function slide(){
    // indicador left inicia none; 
    indicatorsLeft.hide();
    // slide do tamanho de todos os itens * o tamanho deles
    slider.outerWidth(total);
    // section do tamanho da janela
    parent.outerWidth(windowSize);
    // confirma 
    items.outerWidth(sizeSlider);

    indicatorsLeft.click(function(event) {
        // right + sizeSlider
        slider.css('left', getLeft() + sizeSlider);
        indicatorsRight.show();
        if (getLeft() >= -(sizeSlider)){ indicatorsLeft.hide(); }
    });
    indicatorsRight.click(function(event) {
        // left - sizeSlider
        slider.css('left', getLeft() - sizeSlider);
        indicatorsLeft.show();
        if (getLeft() <= -((interval * sizeSlider)-sizeSlider)){ indicatorsRight.hide(); }
    });
    // interval de -672 ~ 0 
    function getLeft(){
        let sliderLeft  = parseInt(slider.css('left'),10);
        return sliderLeft;
    }
}

// form
$('form.form-contato').submit(function(e){
    var dados = jQuery( this ).serialize();
    $('.form-contato').find('input[type="submit"]').hide();

    console.log(dados);

    var thisForm = $(this).closest('form.form-contato');

    jQuery.ajax({
        type: "POST",
        dataType: 'html',
        url: "php/send.php",
        data: dados,
        success: function(data) {
            console.log(data);
            
            $(thisForm).find('input[type="submit"]').show();
            $(thisForm).append('<div class="sucesso">' + thisForm.attr('data-success') + '</div>');
            $(thisForm).find('.sucesso').fadeOut(4000);
            $(thisForm)[0].reset();
        }
    });
    return false;
});