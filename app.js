var express = require('express')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var app = express(),
    port = process.env.PORT || 10000,
    hostname = process.env.HOSTNAME || '37.59.37.193'

mongoose.connect('mongodb://127.0.0.1/e3news')
var Schema = mongoose.Schema

var FeedSchema = new Schema({
    site: String,
    link_site: String,
    description_site: String,
    subtitle: String,
    author_site: String,
    category: String,
    title: String,
    description: String,
    link: String,
    _id: String,
    published: Number,
    tags: Array
})

var FeedModel = mongoose.model('feed', FeedSchema)

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/feeds', function (req, res) {
    var limit = parseInt(req.query.limit) || 1000

    var promise = FeedModel.find()
        .sort({published: -1})
        .limit(limit).exec()

    promise.then(function (feeds) {
        res.send(feeds)
    })
})

app.listen(port, hostname)

console.log('E3 news is running at ' + hostname + ':' + port)
