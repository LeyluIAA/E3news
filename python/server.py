from flask import Flask, request
from pymongo import MongoClient
from flask_api import FlaskAPI

app = FlaskAPI(__name__)

# database connection
client = MongoClient('localhost', 27017)
db = client['e3news']

@app.route('/feeds/')
def get_feeds():
    feeds = []
    for feed in db.feed.find({}):
        feeds.append(feed)
    return {'Feeds': feeds}

@app.route('/feeds/<path:feedid>', methods=['GET'])
def get_feed(feedid):
    feeds = db.feed.find({'_id': feedid})
    for feed in feeds:
        return {'feed': feed}

@app.route('/feeds/search', methods=['GET'])
def say_hello():
    return {'Hello': request.args.get('query')}

app.run(port=10000,debug=True,host='37.59.37.193')
