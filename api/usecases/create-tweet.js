const create = tweetRepository => tweet =>
  tweetRepository.add(tweet)

const CreateTweet = ({ tweetRepository }) => ({
  /**
 * @param {Tweet} tweetRepository
 * @returns {Promise.<Tweet>} saved tweet
 */
  create: create(tweetRepository),
})

module.exports = CreateTweet
