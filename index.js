const http = require('http');
var pug = require('pug');
var feed = require('feed-read-parser');
var express = require('express');
var moment = require('moment');
var async = require('async');
moment.locale('fr');

/**
 * App declaration
 */
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

/**
 * RSS feed logic
 */
app.get('/', function (req, res) {

    var rss = [
        'http://www.jeuxvideo.com/rss/rss.xml',
        'http://www.gameblog.fr/rss.php',
        'http://www.gamekult.com/feeds/actu.html',
        'http://fr.ign.com/feed.xml',
        'https://www.indiemag.fr/feed/rss.xml',
        'http://www.gaminfo.fr/podcasts/feed'
        //'http://www.gamekyo.com/news.xml'
    ];

    // Asynchrone requests to get faster results
    async.parallel([
        function(callback) {
            feed(rss, function(err, articles) {
                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var substring = ':';
                    if (articles[i].feed.name.indexOf(substring) > -1) {
                    	var temp_tab = articles[i].feed.name.split(':');
                    	articles[i].feed.name = temp_tab.join('');
                    }

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication.format('dddd D MMM HH:mm');
                    if (i === articles_length - 1) continue;

                }
                tab = articles;
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
        /*for(var i = 0; i < tab_length; i++) {
            var new_date = tab[i].published.format('dddd D MMM HH:mm');
            tab[i].published = new_date;
        }*/
        res.render('index', {articles: tab});
    });
    /*async.each(rss, parsefeeds, function(err){
        // articles has to be a list of feeds, some treatment could be done here on these before res.send...
        //console.log(tab);
        if (err) console.log('ERROR', err);
        res.render('index', {articles: tab});
    });*/

});

/*function parsefeeds(link, callback) {
    return feed(link, function(err, articles) {
        if (err) throw err;
        var articles_length = articles.length;

        for (var i = 0; i < articles_length; i++) {
            var publication = moment(articles[i].published).subtract(1, 'hours');
            articles[i].published = publication.format('dddd D MMM HH:mm');
            if (articles[i].feed.name.indexOf(':') > -1) {
                var temp_tab = articles[i].feed.name.split(':');
                articles[i].feed.name = temp_tab.join('');
            }
        }
        tab = articles;
        //console.log(tab);
        callback(err);
    });
};*/

app.listen(app.get('port'), function() {
  console.log('E3 news is running on port', app.get('port'));
});
