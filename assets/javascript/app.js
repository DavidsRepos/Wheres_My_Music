$(document).ready(function () {

    var count = 0, bg;
    var $body = $("body");
    var imageArray = ["http://i65.tinypic.com/1e98qp.jpg",
        "http://i66.tinypic.com/2wemlbr.jpg",
        "http://i63.tinypic.com/29bj5p3.jpg",
        "http://i68.tinypic.com/73gfmr.jpg", 
        "http://i65.tinypic.com/eb95eg.jpg",
        "http://i67.tinypic.com/2m7eosl.jpg",
        "http://i67.tinypic.com/2nl8d44.jpg",
        "http://i63.tinypic.com/24lob6a.jpg",
        "http://i68.tinypic.com/9kbktu.jpg",
        "http://i64.tinypic.com/i5qjpy.jpg",
        "http://i67.tinypic.com/25almrl.jpg",
        "http://i66.tinypic.com/33ogv0p.jpg",
        "http://i68.tinypic.com/jj6we9.jpg",
        "http://i68.tinypic.com/dpwm12.jpg",
        "http://i64.tinypic.com/1075ld2.jpg",
        "http://i63.tinypic.com/sc6qvc.jpg",
        "http://i67.tinypic.com/ntdsz.jpg",
        "http://i66.tinypic.com/2zsuypy.jpg",
        "http://i68.tinypic.com/1pte21.jpg",
        "http://i64.tinypic.com/1075ld2.jpg"
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