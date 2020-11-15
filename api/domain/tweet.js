const uuid = require('uuid')
const moment = require('moment')

/**
 * @param {Number} amount number of likes
 * @returns Like value object
 */
const Like = amount => ({
  amount,
})

/** @typedef {String} UUID */

/**
 * @param {Object} options
 * @param {UUID} options.id
 * @param {String} options.text
 * @param {Number} options.likes
 * @returns Tweet entity
 */
const Tweet = ({ id, text, likes, createdAt }) => ({
  text,
  likes: Like(likes || 0),
  createdAt: createdAt || moment.utc().toISOString(),
  id: id || uuid.v4(),
})

module.exports = {
  Tweet,
  Like,
}
