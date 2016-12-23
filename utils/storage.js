var express = require('express');

/* GET home page. */
var updateRSS = function() {
    console.log('dsgdgsdfshdtrsf');
    var rss = [
        'http://www.jeuxvideo.com/rss/rss.xml',
        'http://www.gameblog.fr/rss.php',
        'http://www.gamekult.com/feeds/actu.html',
        'http://fr.ign.com/feed.xml',
        'https://www.indiemag.fr/feed/rss.xml'
        //'http://www.gamekyo.com/news.xml'
    ];

    // Asynchrone requests to get faster results
    async.parallel([
        function(callback) {
            feed(rss, function(err, articles) {
                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {
                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;
                    var substring = ':';
                    if (articles[i].feed.name.indexOf(substring) > -1) {
                    	var temp_tab = articles[i].feed.name.split(substring);
                    	articles[i].feed.name = temp_tab.join('');
                    }
                 }
                tab = articles;
                //console.error('articles', articles);
                callback();
            });
        }
    ], function(err) {
        // Fix for wrong date
        var tab_length = tab.length;
        while (tab_length > 0) {
            for (var i = 0; i < tab_length - 1 ; i++) {
                if(moment(tab[i].published).isBefore(tab[i+1].published)) {
                    var temp = tab[i+1];
                    tab[i+1] = tab[i];
                    tab[i] = temp;
                }
            }
            tab_length--;
        }
        tab_length = tab.length;
        // Format the date as i want
        for(var i = 0; i < tab_length; i++) {
            var new_date = tab[i].published.format('dddd D MMM HH:mm');
            tab[i].published = new_date;
            //console.log('coucou les dates', new_date);
        }
        return {articles: tab};
    });
};
