const R = require('ramda')

const { rejectWithApplicationError, catalogue } = require('_domain/error')

const encodeTweet = ({ id, ...tweet }) => ({
  ...tweet,
  _id: id,
})

const decodeTweet = ({ _id, ...tweet }) => ({
  ...tweet,
  id: _id,
})

const getInsertedDocument = R.path(['ops', 0])

const tweetNotFound = () =>
  rejectWithApplicationError({ code: catalogue.TWEET_NOT_FOUND })

const getUpdatedDocument = R.pipe(
  R.prop('value'),
  R.when(R.not, tweetNotFound)
)

const TweetRepository = ({ mongoDb }) => {
  const add = tweet =>
    mongoDb
      .collection('tweet')
      .insertOne(encodeTweet(tweet))
      .then(getInsertedDocument)
      .then(decodeTweet)

  const increment = (id, field) =>
    mongoDb
      .collection('tweet')
      .findOneAndUpdate(
        { _id: id },
        { $inc: { [field]: 1 } },
        { returnOriginal: false }
      )
      .then(getUpdatedDocument)
      .then(decodeTweet)

  const orderBy = (field, limit, ascending = false) =>
    mongoDb
      .collection('tweet')
      .find()
      .limit(limit)
      .sort({ [field]: ascending ? 1 : -1 })
      .toArray()
      .then(R.map(decodeTweet))

  return {
    add,
    increment,
    orderBy,
    encodeTweet,
  }
}

module.exports = TweetRepository
