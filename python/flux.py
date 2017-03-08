#!/usr/bin/python3.4

import feedparser

# urls = ["http://www.jeuxvideo.com/rss/rss.xml","http://www.gameblog.fr/rss.php","http://www.gamekult.com/feeds/actu.html","http://fr.ign.com/feed.xml","https://www.indiemag.fr/feed/rss.xml","http://www.gaminfo.fr/podcasts/feed"]

url = "http://www.jeuxvideo.com/rss/rss.xml"
response = feedparser.parse(url)

for entry in response.entries:
    title = entry.title.encode('utf8')
    description = entry.description.encode('utf-8')
    link = entry.link.encode('utf8')
    id = entry.id.encode('utf8')
    published = entry.published.encode('utf8')
    tags = []
    for tag in entry.tags:
        tags.append(tag.term)

site = response.feed.title.encode('utf8')
link_site = response.feed.link.encode('utf8')
description_site = response.feed.description.encode('utf8')
subtitle = response.feed.subtitle.encode('utf8')
author_site = response.feed.author.encode('utf8')
category = response.feed.category.encode('utf8')
