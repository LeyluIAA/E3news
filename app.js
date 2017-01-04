const http = require('http');
var feed = require('feed-read-parser');
var express = require('express');
var moment = require('moment');
var async = require('async');

//var storage = require('./utils/storage');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0seLbRMDYAtOBEPJUBcQvGMdt6rFdL2Q",
    authDomain: "e3news-9f6f1.firebaseapp.com",
    databaseURL: "https://e3news-9f6f1.firebaseio.com",
    storageBucket: "e3news-9f6f1.appspot.com",
    messagingSenderId: "104817982342"
};
//firebase.initializeApp(config);

// Get a reference to the database service
//var database = firebase.database();

/**
 * App declaration
 */
var app = express();

// Set port app
app.set('port', (process.env.PORT || 5000));

//app.use('/', index);

/**
 * RSS feed logic
 */
app.get('/', function (req, res) {
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
                console.error(articles[0]);
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
        res.status(200).send({articles: tab});
    });
    /*var articles = storage.updateRSS();
    res.status(200).send(articles);*/

});

/*app.get('/charts', function(req, res){

    res.send('hello world: this is the charts page. Not available for the moment');
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('mauvaise page');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), function() {
  console.log('E3 news is running on port', app.get('port'));
});

module.exports = app;
