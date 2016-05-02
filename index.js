const http = require('http');
var feed = require('feed-read');
var express = require('express');
var moment = require('moment');

var app = express();

app.use('/static', express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {

    var rss = ['http://www.jeuxvideo.com/rss/rss.xml', 'http://www.gameblog.fr/rss.php', 'http://www.eurogamer.net/?format=rss', 'http://www.gamekult.com/feeds/actu.html', 'http://fr.ign.com/feed.xml'],
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

          //sortBy(tab, 'published');
          //tab.reverse();
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
