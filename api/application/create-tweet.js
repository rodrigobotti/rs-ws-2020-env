const CreateTweetUsecase = require('_usecases/create-tweet')
const inMemoryTweetRepository = require('_adapters/in-memory-tweet-repository')
const { toDomainModel, toApplication } = require('./translators/tweet-translator')

const tweetCreated = ctx => tweet => {
  ctx.status = 201
  ctx.body = tweet
}

const CreateTweet = (_infrastructure) => {
  const createTweetUsecase = CreateTweetUsecase({
    tweetRepository: inMemoryTweetRepository,
  })

  const create = ctx => {
    const tweet = toDomainModel(ctx.request.body)
    return createTweetUsecase
      .create(tweet)
      .then(toApplication)
      .then(tweetCreated(ctx))
  }

  return {
    create,
  }
}

module.exports = CreateTweet
