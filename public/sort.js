$(document).ready(function(){
    window.setInterval(function(){refresh()}, 120000);
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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
                if (id.match('xbox') === null && id.match('microsoft') === null) {
                    $row.hide();
                }
                else {
                    $row.show();
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
                if (id.match('playstation') === null && id.match('sony') === null && id.match('ps4') === null) {
                    $row.hide();
                }
                else {
                    $row.show();
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
                if (id.match('nintendo') === null && id.match('switch') === null && id.match('3ds') === null && id.match('2ds') === null) {
                    $row.hide();
                }
                else {
                    $row.show();
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
            if (id.match('') === null) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
};
