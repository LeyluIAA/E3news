#!/usr/bin/python3.4

import feedparser
import uuid
from datetime import datetime
from pymongo import MongoClient

# URLS : add here a new url to support a new site
urls = ["http://www.jeuxvideo.com/rss/rss.xml","http://www.gameblog.fr/rss.php","http://www.gamekult.com/feeds/actu.html","http://fr.ign.com/feed.xml","https://www.indiemag.fr/feed/rss.xml","http://www.gaminfo.fr/podcasts/feed", "http://www.nintendo-town.fr/feed/"]

# database connection
client = MongoClient('localhost', 27017)
db = client['e3news']


for url in urls:

    response = feedparser.parse(url)
    
    # Site part
    site = ''
    try:
        site = response.feed.title
        print(site)
    except Exception:
        pass
    link_site = ''
    try:
        link_site = response.feed.link
    except Exception:
        pass
    description_site = ''
    try:
        description_site = response.feed.description
    except Exception:
        pass
    subtitle = ''
    try:
        subtitle = response.feed.subtitle
    except Exception:
        pass
    author_site = ''
    try:
        author_site = response.feed.author
    except Exception:
        pass
    category = ''
    try:
        category = response.feed.category
    except Exception:
        pass
    
    # Posts part
    for entry in response.entries:
        title = ''
        try:
            title = entry.title
        except Exception:
            pass
        description = ''
        try:
            description = entry.description
        except Exception:
            pass
        link = ''
        try:
            link = entry.link
        except Exception:
            pass
        #id = uuid.uuid5(uuid.NAMESPACE_DNS, entry.id)
        #str(id)
        id = entry.id
        published = entry.published.split(',')[1].split('+')[0]
        ts_published = int(datetime.strptime(published, " %d %b %Y %H:%M:%S ").timestamp())
        tags = []
        try:
            for tag in entry.tags:
                tags.append(tag.term)
        except Exception:
            pass
        
        # Date format
        # Use datetime.strptime(date_string, format)

        # Article construction
        article = {
            'site': site,
            'link_site': link_site,
            'description_site': description_site,
            'subtitle': subtitle,
            'author_site': author_site,
            'category': category,
            'title': title,
            'description': description,
            'link': link,
            '_id': id,
            'published': ts_published,
            'tags': tags
        }
    
        # Store information in Mongo
        try:
            db.feeds.insert(article)
        except Exception:
            pass