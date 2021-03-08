$(document).ready(function () {

    var count = 0, bg;
    var $body = $("body");
    var imageArray = [ 
        assets/images/c0.jpg,
        assets/images/c1.jpg
    ];

    setInterval(function () {
        if (count == 20)
            count = 0;
        bg = "url('" + imageArray[count] + "')";
        count++;
        $body.css({
            "background-image": bg,
            "background-size": "cover",
            "transition": "1s",
            "delay": "1s" 
        });
        
    }, 6000);

}); //END document.ready
