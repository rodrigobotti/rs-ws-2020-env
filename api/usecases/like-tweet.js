const like = tweetRepository => id =>
  tweetRepository.increment(id, 'likes.amount')

const LikeTweet = ({ tweetRepository }) => ({
  /**
   * @param {String} id
   * @returns {Promise.<Tweet>}
   */
  like: like(tweetRepository),
})

module.exports = LikeTweet
