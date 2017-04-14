var async = require('async');
var feed = require('feed-read-parser');
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1/e3news');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FeedSchema = new Schema({
    site             : String,
    link_site        : String,
    description_site : String,
    subtitle         : String,
    author_site      : String,
    category         : String,
    title            : String,
    description      : String,
    link             : String,
    _id              : String,
    published        : Number,
    tags             : Array
});

var FeedModel = mongoose.model('feed', FeedSchema);

var rss = [
    //'http://www.jeuxvideo.com/rss/rss.xml',
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
                var publication = moment(articles[i].published).subtract(1, 'hours');
                articles[i].published = publication.format('x');
                var substring = ':';
                if (articles[i].feed.name.indexOf(substring) > -1) {
                    var temp_tab = articles[i].feed.name.split(':');
                    articles[i].feed.name = temp_tab.join('');
                }
            }
            tab = articles;
            callback();
        });
    }
], function(err) {
    if (err) throw err;
    console.log({articles: tab});
    process.exit();
});

