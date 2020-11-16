const TopLikedTweetsUseCase = require('_usecases/top-liked-tweets')
const TweetRepository = require('_adapters/mongodb-tweet-repository')
const Cache = require('_adapters/redis-cache')
const { toApplicationList } = require('./translators/tweet-translator')

const tweetsFound = ctx => tweets => {
  ctx.status = 200
  ctx.body = tweets
}

const TopLikedTweets = ({ mongoDb, redis }) => {
  const tweetRepository = TweetRepository({ mongoDb })
  const cache = Cache({ redis })
  const useCase = TopLikedTweetsUseCase({ tweetRepository, cache })

  const topLiked = ctx =>
    useCase
      .topLiked()
      .then(toApplicationList)
      .then(tweetsFound(ctx))

  return {
    topLiked,
  }
}

module.exports = TopLikedTweets
