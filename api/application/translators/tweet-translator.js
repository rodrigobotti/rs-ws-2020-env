const R = require('ramda')

const { Tweet } = require('_domain/tweet')

/**
 * @param {Object} tweet
 * @param {String} tweet.text
 */
const toDomainModel = ({ text }) =>
  Tweet({ text })

const toApplication = ({ id, text, likes: { amount } }) => ({
  id,
  text,
  likes: amount,
})

const toApplicationList = R.map(toApplication)

module.exports = {
  toDomainModel,
  toApplication,
  toApplicationList,
}
