const R = require('ramda')

const { rejectWithApplicationError, catalogue } = require('_domain/error')

const storage = {}

const add = tweet => {
  storage[tweet.id] = tweet
  return Promise.resolve(tweet)
}

const increment = (id, field) => {
  const tweet = storage[id]
  if (!tweet) {
    return rejectWithApplicationError({ code: catalogue.TWEET_NOT_FOUND })
  }
  const path = field.split('.')
  const currentAmount = R.path(path, tweet)
  const newTweet = R.assocPath(path, currentAmount + 1, tweet)
  storage[id] = newTweet
  return Promise.resolve(newTweet)
}

module.exports = {
  add,
  increment,
}
