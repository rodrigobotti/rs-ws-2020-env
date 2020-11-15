const CreateTweetUsecase = require('_usecases/create-tweet')
const TweetRepository = require('_adapters/mongodb-tweet-repository')
const { toDomainModel, toApplication } = require('./translators/tweet-translator')

const tweetCreated = ctx => tweet => {
  ctx.status = 201
  ctx.body = tweet
}

const CreateTweet = ({ mongoDb }) => {
  const tweetRepository = TweetRepository({ mongoDb })
  const createTweetUsecase = CreateTweetUsecase({ tweetRepository })

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
