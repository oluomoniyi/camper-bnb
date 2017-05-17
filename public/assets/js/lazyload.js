$(window).load(function(){
    $('.lazyload').each(function(index, layze) {
    console.log(layze);
        var lazy = $(layze);
        var src = lazy.attr('data-src');

        $('<img>').attr('src', src).load(function(){
            lazy.find('img.spinner').remove();
            lazy.css('background-image', 'url("'+src+'")');
        });
    });
});

