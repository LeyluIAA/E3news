# E3news

E3news is an RSS aggregator to feed news about several video games sources.

# Prerequisites

- debian 8.7
- Mongo 3.4
- Python 3.4
- Flask

# configure MongoDB

```
 $ mongo
 > use e3news
 > db.feed.insert({'name': 'feed1'})
 > db.createUser({user:"admin",pwd:"admin", roles:[{role:"root",db:"admin"}]})
 > db.createUser({user:"leyluiaa",pwd:"leyluiaa", roles:[{role:"readWrite",db:"e3news"}]})
```
