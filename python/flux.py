#!/usr/bin/python3.4

import feedparser
from pymongo import MongoClient

urls = ["http://www.jeuxvideo.com/rss/rss.xml","http://www.gameblog.fr/rss.php","http://www.gamekult.com/feeds/actu.html","http://fr.ign.com/feed.xml","https://www.indiemag.fr/feed/rss.xml","http://www.gaminfo.fr/podcasts/feed"]

client = MongoClient('localhost', 27017)

for url in urls:

    response = feedparser.parse(url)
    
    # Site part
    site = response.feed.title.encode('utf8')
    link_site = response.feed.link.encode('utf8')
    description_site = response.feed.description.encode('utf8')
    subtitle = response.feed.subtitle.encode('utf8')
    try:
        author_site = response.feed.author.encode('utf8')
    except Exception:
        print('error in author attribute')
    try:
        category = response.feed.category.encode('utf8')
    except Exception:
        print('error in category attribute')
    
    # Posts part
    for entry in response.entries:
        title = entry.title.encode('utf8')
        description = entry.description.encode('utf-8')
        link = entry.link.encode('utf8')
        id = entry.id.encode('utf8')
        published = entry.published.encode('utf8')
        tags = []
        try:
            for tag in entry.tags:
                tags.append(tag.term.encode('utf8'))
        except Exception:
            pass
        
        # Article construction
        article = {
            'site': site,
            'link_site': link_site,
            'description_site': description_site,
            'subtitle': subtitle,
            'author_site': author_site,
            'category': category
            'title': title,
            'description': description,
            'link': link,
            'id': id,
            'published': published,
            'tags': tags
        })
    
        # Store information in Mongo
