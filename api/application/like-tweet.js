const LikeTweetUsecase = require('_usecases/like-tweet')
const inMemoryTweetRepository = require('_adapters/in-memory-tweet-repository')
const { toApplication } = require('./translators/tweet-translator')

const tweetLiked = ctx => tweet => {
  ctx.status = 200
  ctx.body = tweet
}

const LikeTweet = (_infrastructure) => {
  const likeTweetUsecase = LikeTweetUsecase({
    tweetRepository: inMemoryTweetRepository,
  })

  const like = ctx =>
    likeTweetUsecase
      .like(ctx.params.id)
      .then(toApplication)
      .then(tweetLiked(ctx))

  return {
    like,
  }
}

module.exports = LikeTweet
