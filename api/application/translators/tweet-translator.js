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

module.exports = {
  toDomainModel,
  toApplication,
}
