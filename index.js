const http = require('http');
var feed = require('feed-read');
var express = require('express');
var moment = require('moment');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	
    var rss = ['http://www.jeuxvideo.com/rss/rss.xml', 'http://www.gameblog.fr/rss.php'],
        tab = [];

    feed(rss, function(err, articles) {
		  
          if (err) throw err;
		  
          var articles_length = articles.length;
		  
          for (var i = 0; i < articles_length; i++) {

            var publication = moment(articles[i].published).subtract(1, 'hours');
		  	articles[i].published = publication.format("DD/MM/YYYY HH:mm:ss");

		  }
          console.log('articles', articles);
          tab = articles;
          res.render('index', {articles: tab});
          // Each article has the following properties:
          //   * "title"     - The article title (String).
          //   * "author"    - The author's name (String).
          //   * "link"      - The original article link (String).
          //   * "content"   - The HTML content of the article (String).
          //   * "published" - The date that the article was published (Date).
          //   * "feed"      - {name, source, link}
    });
});



app.listen(3000, function () {
  console.log('E3 News listening on port 3000!');
});
