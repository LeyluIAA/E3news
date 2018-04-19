<template>
  <div class="container">
    <h1>This is the Huawei p Smart</h1>
    {{feeds}}
  </div>
</template>

<script>
/*export default {
    async asyncData({ params }) {
        var rss = ['http://www.jeuxvideo.com/rss/rss.xml', 'http://www.gameblog.fr/rss.php']
        var promisesTab = []
        var result = []
        rss.forEach(function (feed) {
            promisesTab.push(
                Promise.resolve(feed(feed, function (err, articles) {
                    if (err) throw err

                    var articles_length = articles.length

                    for (var i = 0; i < articles_length; i++) {
                        articles[i].published = moment(articles[i].published)
                        if (articles[i].feed.name.indexOf(':') > -1) {
                            articles[i].feed.name = articles[i].feed.name.split(':').join('')
                        }
                    }
                    result.push(articles)
                }))
            )
        })
        await Promise.all(promisesTab).then(function (values) {
            console.log(values, result)
            return {feeds: result}
        });
        // let { data } = await axios.get(`https://my-api/posts/${params.id}`)
        //return { title: data.title }
    }
}*/
export default {
  asyncData ({ params }) {
    var rss = ['http://www.jeuxvideo.com/rss/rss.xml', 'http://www.gameblog.fr/rss.php']
    var promisesTab = []
    var result = []
    rss.forEach(function (feed) {
        promisesTab.push(
            Promise.resolve(feed(feed, function (err, articles) {
                if (err) throw err

                var articles_length = articles.length

                for (var i = 0; i < articles_length; i++) {
                    articles[i].published = moment(articles[i].published)
                    if (articles[i].feed.name.indexOf(':') > -1) {
                        articles[i].feed.name = articles[i].feed.name.split(':').join('')
                    }
                }
                result.push(articles)
            }))
        )
    })
    Promise.all(promisesTab).then((values) => {
        console.log(values, result)
        return {feeds: result}
    })
  }
}
</script>

<style scoped>

</style>