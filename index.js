const http = require('http');
var feed = require('feed-read');
var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('index', { title: 'E3 news', message: 'E3 2016!'});
});

app.get('/articles', function (req, res) {
	var tab = [];
	feed('http://www.jeuxvideo.com/rss/rss.xml', function(err, articles) {
		  if (err) throw err;
		  var nbArticle = articles.length;
		  for (var i = 0; i <= nbArticle - 1; i++) {
		    console.log('title:', articles[i].title);
		    console.log('published:', articles[i].published);
		    tab.push({title: articles[i].title, published: articles[i].published});
		  }
		  res.send(tab);
		  // response.push({title: articles.title, date: articles.published});
		  // Each article has the following properties:
		  //
		  //   * "title"     - The article title (String).
		  //   * "author"    - The author's name (String).
		  //   * "link"      - The original article link (String).
		  //   * "content"   - The HTML content of the article (String).
		  //   * "published" - The date that the article was published (Date).
		  //   * "feed"      - {name, source, link}
  	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
