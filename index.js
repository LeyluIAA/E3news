const http = require('http');
var feed = require('feed-read');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/articles', function (req, res) {
	  feed('http://www.jeuxvideo.com/rss/rss.xml', function(err, articles) {
		  if (err) throw err;
		  res.send('coucoucoucoucou');
		  //response.push({title: articles.title, date: articles.published});
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
