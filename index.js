const http = require('http');
var feed = require('feed-read');
var express = require('express');
var moment = require('moment');
var async = require('async');

var app = express();

app.use('/static', express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {

    var rss = ['http://www.jeuxvideo.com/rss/rss.xml', 'http://www.gameblog.fr/rss.php', 'http://www.eurogamer.net/?format=rss', 'http://www.gamekult.com/feeds/actu.html', 'http://fr.ign.com/feed.xml'],
        tab = {jv: [], gb: [], eg: [], gk:[], in:[]};

    async.parallel([
        function(callback) {
            feed(rss[0], function(err, articles) {
                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;
                }
                tab.jv = articles;
                callback();
            });
        },
        function(callback) {
            feed(rss[1], function(err, articles) {

                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;

                }
                tab.gb = articles;
                callback();
            });
        },
        function(callback) {
            feed(rss[2], function(err, articles) {

                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;

                }
                tab.eg = articles;
                callback();
            });
        },
        function(callback) {
            feed(rss[3], function(err, articles) {

                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;

                }
                tab.gk = articles;
                callback();
            });
        },
        function(callback) {
            feed(rss[4], function(err, articles) {

                if (err) throw err;

                var articles_length = articles.length;

                for (var i = 0; i < articles_length; i++) {

                    var publication = moment(articles[i].published).subtract(1, 'hours');
                    articles[i].published = publication;

                }
                tab.in = articles;
                callback();
            });
        }
    ], function(err) {
        var array = tab.jv.concat(tab.gb);
        array = array.concat(tab.eg);
        array = array.concat(tab.gk);
        array = array.concat(tab.in);
        var array_length = array.length;
        while (array_length > 0) {
            for (var i = 0; i < array_length - 1 ; i++) {
                if(moment(array[i].published).isBefore(array[i+1].published)) {
                    var temp = array[i+1];
                    array[i+1] = array[i];
                    array[i] = temp;
                }
            }
            array_length--;
        }
        array_length = array.length;
        for(var i = 0; i < array_length; i++) {
            var new_date = array[i].published.format('DD/MM/YYYY HH:mm:ss');
            array[i].published = new_date;
        }
        res.render('index', {articles: array});
    });


});



app.listen(3000, function () {
  console.log('E3 News listening on port 3000!');
});

//format("DD/MM/YYYY HH:mm:ss");