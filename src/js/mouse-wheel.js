

$(window).bind('mousewheel DOMMouseScroll', function(e) {

	console.log(e);
    if(event.ctrlKey == true)
    {
        event.preventDefault();
        if(event.originalEvent.detail > 0) {
             console.log('Down');
         }else {
             console.log('Up');
         }
    }
});