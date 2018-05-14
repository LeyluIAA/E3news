$(document).ready(function(){
    window.setInterval(function(){refresh()}, 120000);
});

$(".overlay__menu").click(function(){
    $(".overlay__menu").toggle();
    $(".vertical__pages").toggle();
});

$(".vertical__link").click(function(){
    $(".overlay__menu").toggle();
    $(".vertical__pages").toggle();
});

$(".navbar__burger").click(function(){
    $(".overlay__menu").toggle();
    $(".vertical__pages").toggle();
});

$("#search").keyup(function() {
    var value = $(this).val();
    value = value.toLowerCase();

    $("table tr").each(function(index) {
        if (index !== 0) {

            $row = $(this);

            var id = $row.find("td:first").text();
            id = id.toLowerCase();
            if (id.match(value) === null) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
});

$('.expand').click(function(){
    $('.expand-content').slideToggle('slow');
});

$('.expand-video').click(function(){
    $('.expanded-video').slideToggle('slow');
});

var refresh = function(){
    window.location.reload(true);
}

$('#xbox').click(function(){
    if (!window.xboxfilter){
        $("table tr").each(function(index) {
            if (index !== 0) {

                $row = $(this);

                var id = $row.find("td:first").text();
                id = id.toLowerCase();
                if (id.match('xbox') || id.match('microsoft')) {
                    $row.show();
                }
                else {
                    $row.hide();
                }
            }
        });
        window.xboxfilter = true;
    } else {
        reset();
        window.xboxfilter = false;
    }
});

$('#playstation').click(function(){
    if (!window.playstationfilter){
        $("table tr").each(function(index) {
            if (index !== 0) {

                $row = $(this);

                var id = $row.find("td:first").text();
                id = id.toLowerCase();
                if (id.match('playstation') || id.match('sony') || id.match('ps4')) {
                    $row.show();
                }
                else {
                    $row.hide();
                }
            }
        });
        window.playstationfilter = true;
    } else {
        reset();
        window.playstationfilter = false;
    }
});

$('#nintendo').click(function(){
    if (!window.nintendofilter){
        $("table tr").each(function(index) {
            if (index !== 0) {

                $row = $(this);

                var id = $row.find("td:first").text();
                id = id.toLowerCase();
                if (id.match('nintendo') || id.match('switch') || id.match('3ds') || id.match('2ds')) {
                    $row.show();
                }
                else {
                    $row.hide();
                }
            }
        });
        window.nintendofilter = true;
    } else {
        reset();
        window.nintendofilter = false;
    }
});

var reset = function(){
    $("table tr").each(function(index) {
        if (index !== 0) {

            $row = $(this);

            var id = $row.find("td:first").text();
            id = id.toLowerCase();
            if (id.match('')) {
                $row.show();
            }
            else {
                $row.hide();
            }
        }
    });
};
