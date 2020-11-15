const { catalogue: errors } = require('_domain/error')
const ErrorResponse = require('_application/models/response-error')

/**
 * Table that maps error codes to their respectve responses.
 *
 * @name responses
 */
const responsesTable = {
  [errors.INVALID_REQUEST]: ErrorResponse(errors.INVALID_REQUEST, 400, 'Invalid request parameters'),
  [errors.INTERNAL]: ErrorResponse(errors.INVALID_REQUEST, 500, 'Internal server error'),
  [errors.TWEET_NOT_FOUND]: ErrorResponse(errors.TWEET_NOT_FOUND, 404, 'Tweet not found'),
}

/** @typedef {{code: string}} ApplicationError */

/**
 * @param {ApplicationError} applicationError
 * @returns serialized response error
 */
const toApplication = applicationError =>
  responsesTable[applicationError.code] || responsesTable[errors.INTERNAL]

module.exports = {
  responsesTable,
  toApplication,
}
