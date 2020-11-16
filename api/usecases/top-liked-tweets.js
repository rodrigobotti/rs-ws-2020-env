const R = require('ramda')

const CACHE_KEY = 'TOP_LIKED_TWEETS'
const CACHE_EXPIRATION_SECONDS = 60

const serialize = R.unary(JSON.stringify)

const deserialize = R.unary(JSON.parse)

const deserializeCacheValue = R.ifElse(
  R.not,
  R.always([]),
  deserialize
)

const TopLikedTweets = ({ tweetRepository, cache }) => {
  const getFromCache = () =>
    cache
      .get(CACHE_KEY)
      .then(deserializeCacheValue)

  const putInCache = data =>
    cache
      .put(CACHE_KEY, serialize(data), CACHE_EXPIRATION_SECONDS)
      .then(R.always(data))

  const fetchAndCache = () =>
    tweetRepository
      .orderBy('likes.amount', 5)
      .then(putInCache)

  const topLiked = () =>
    getFromCache()
      .then(R.when(R.isEmpty, fetchAndCache))

  return {
    topLiked,
  }
}

module.exports = TopLikedTweets
