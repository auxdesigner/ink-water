var $body = $('body'),
    $tile = $('#tile'),
    $glare = $('.glare'),
    $layer = $('div[class*="layer-"]'),
    $frame = $('.frame'),
    $shadowClip = $('.shadow-clip'),
    scenes = ["0", "1"],
    scene = scenes[Math.floor(Math.random() * scenes.length)],
    frames = ["0", "1"],
    frame = frames[Math.floor(Math.random() * frames.length)],
    frameURL = "img/b-" + frame + ".svg",
    clipClass = "clip" + frame,
    bgClass = "bg" + scene;

$frame.css('background-image', 'url(' + frameURL + ')');
$tile.addClass(clipClass);
$shadowClip.addClass(clipClass);
$body.addClass(bgClass);

//$tile.removeClass();

$layer.each(function(n) {
    var $this = $(this),
        imgURL = "img/" + scene + "-" + n + ".svg";
    $this.css('background-image', 'url(' + imgURL + ')');
});



$(window).on('mousemove', function(ev) {
    var w = $(window).width(),
        h = $(window).height(),
        offsetX = 0.5 - ev.pageX / w,
        offsetY = 0.5 - ev.pageY / h,
        offsetTile = $tile.data('offset'),
        transformTile = 'translateY(' + -offsetX * offsetTile + 'px) rotateX(' + (-offsetY * offsetTile) + 'deg) rotateY(' + (offsetX * (offsetTile * 2)) + 'deg)',
        dy = ev.pageY - h / 2,
        dx = ev.pageX - w / 2,
        theta = Math.atan2(dy, dx),
        angle = theta * 180 / Math.PI;

    if (angle < 0) {
        angle = angle + 360;
    }
    $glare.css('background', 'linear-gradient(' + (angle - 90) + 'deg, rgba(255,255,255,' + ev.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');
    $tile.css('-webkit-transform', transformTile);
    $tile.css('transform', transformTile);

    $layer.each(function() {
        var $this = $(this),
            offsetLayer = $this.data('offset') || 0,
            transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
        $this.css('-webkit-transform', transformLayer);
        $this.css('transform', transformLayer);

    });
});