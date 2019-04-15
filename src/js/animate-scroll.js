const debounce = function(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var d = document;
var target = d.querySelectorAll('[data-anime]');
var img = d.querySelectorAll('[data-src]');
var animationClass = 'animate';

function animeScroll() {
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
  // var windowTop = window.pageYOffset + ((window.outerHeight) / 4);
  target.forEach(function(element) {
    if((windowTop) > $(element).offset().top) { element.classList.add(animationClass);
    } else { element.classList.remove(animationClass); }
  });
  // img.forEach((el, i) =>{
  //   var currentSrc = img[i].getAttribute('data-src');
  //   if((windowTop) > $(el).offset().top) { 
  //     el.setAttribute('src', currentSrc);
  //   } else{
  //     el.setAttribute('src','');
  //   }
  // })
}

animeScroll();

if(target.length) {
  // window.addEventListener('scroll', function(){ animeScroll()} )
  window.addEventListener('scroll', debounce(function() {
    animeScroll();
  }, 200));
}