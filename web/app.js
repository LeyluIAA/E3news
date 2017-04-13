const http = require('http');
var express = require('express');
var moment = require('moment');
var mongoose = require('mongoose');
var async = require('async');
mongoose.Promise = require('bluebird');

var app = express();

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

app.set('port', (process.env.PORT || 10000));
app.set('hostname', (process.env.HOSTNAME || '37.59.37.193'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/feeds', function (req, res) {
    feeds = [];
    var promise = FeedModel.find({}, function (err, docs) {
        docs.forEach(function(doc) {
            feeds.push(doc);
        });
    }).exec();
    promise.then(function (feeds) {
        res.send(feeds);
    });
});

app.listen(app.get('port'), app.get('hostname'), function() {
  console.log('E3 news is running at', app.get('hostname'), ':',app.get('port'));
});
