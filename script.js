var $body = $('body'),
    $tile = $('#tile'),
    $layer = $('div[class*="layer-"]'),
    $bird = $('.bird'),
    $frame = $('.frame'),
    $shadowClip = $('#shadow-clip');

var index = 0,
    templates = [
        [0, [4]],
        [1, [2, 4, 5]],
        [2, []]
    ],
    template = templates[index];

$('.change').click(function() {
    index++;
    if (index > templates.length - 1) {
        index = 0;
    }
    template = templates[index];
    loadScene();
});

function loadScene() {
    var $scene = template[0],
        $frameURL = "img/b-" + $scene + ".svg",
        $clipClass = "clip" + $scene,
        $bgClass = "bg" + $scene,
        $animation = template[1];

    // set frame image; add image clip shape, shadow clip shape, and background
    $frame.css('background-image', 'url(' + $frameURL + ')');
    $tile.removeClass();
    $tile.addClass($clipClass);
    $shadowClip.removeClass();
    $shadowClip.addClass($clipClass);
    $body.removeClass();
    $body.addClass($bgClass);
    $layer.removeClass("anim");

    // add scene images and animations
    $layer.each(function(n) {
        var $this = $(this),
            $imgURL = "img/" + $scene + "-" + n + ".svg";
        $this.css('background-image', 'url(' + $imgURL + ')');
    });

    $.each($animation, function(index, value) {
        $animLayerClass = "layer-" + value;
        $animLayer = $("." + $animLayerClass).addClass("anim");
    });
}

loadScene();

//add mouse interaction
// $(window).on('mousemove', function(ev) {
//     var w = $(window).width(),
//         h = $(window).height(),
//         offsetX = 0.5 - ev.pageX / w,
//         offsetY = 0.5 - ev.pageY / h,
//         offsetTile = $tile.data('offset'),
//         transformTile = 'translateY(' + -offsetX * offsetTile + 'px) rotateX(' + (-offsetY * offsetTile) + 'deg) rotateY(' + (offsetX * (offsetTile * 2)) + 'deg)';

//     $tile.css('-webkit-transform', transformTile);
//     $tile.css('transform', transformTile);

//     $layer.each(function() {
//         var $this = $(this),
//             offsetLayer = $this.data('offset') || 0,
//             transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
//         $this.css('-webkit-transform', transformLayer);
//         $this.css('transform', transformLayer);
//     });

//     $bird.each(function() {
//         var $this = $(this),
//             offsetLayer = $this.data('offset') || 0,
//             transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
//         $this.css('-webkit-transform', transformLayer);
//         $this.css('transform', transformLayer);
//     });
// });

// headtrack control
var videoInput = document.getElementById('inputVideo'),
    canvasInput = document.getElementById('inputCanvas'),
    htracker = new headtrackr.Tracker();

$('.start').click(function() {
    htracker.init(videoInput, canvasInput);
    htracker.start();

});

$('.stop').click(function() {
    htracker.stopStream();
    htracker.stop();
    $('.start').show();
    $('.stop').hide();
});

// head interaction
document.addEventListener('facetrackingEvent', function(event) {
    var faceX = 1 - event.x / 320,
        faceY = 1 - event.y / 240;

    $layer.each(function() {
        var $this = $(this),
            offsetLayer = $this.data('offset') || 0,
            transformLayer = 'translateX(' + faceX * offsetLayer * 1 + 'px) translateY(' + faceY * offsetLayer * 1 + 'px)';
        $this.css('-webkit-transform', transformLayer);
        $this.css('transform', transformLayer);
    });

    $bird.each(function() {
        var $this = $(this),
            offsetLayer = $this.data('offset') || 0,
            transformLayer = 'translateX(' + faceX * offsetLayer * 1 + 'px) translateY(' + faceY * offsetLayer * 1 + 'px)';
        $this.css('-webkit-transform', transformLayer);
        $this.css('transform', transformLayer);
    });
});