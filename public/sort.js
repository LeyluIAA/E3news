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
