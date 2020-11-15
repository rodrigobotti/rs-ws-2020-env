const R = require('ramda')

/**
 * Enumeration of possible application errors.
 *
 * @name catalogue
 */
const catalogue = {
  INVALID_REQUEST: 'INVALID_REQUEST',
  INTERNAL: 'INTERNAL',
  TWEET_NOT_FOUND: 'TWEET_NOT_FOUND',
}

/**
 * Custom Error class representing an application error i.e. the result of capturing a runtime error and handling it.
 *
 * @name ApplicationError
 * @class
 */
class ApplicationError extends Error {
  /**
   * @constructor
   * @param {Object} config
   * @param {String} config.code error code
   * @param {String} config.message error message
   * @param {Array.<String>} config.cause error message
   */
  constructor ({ code, message, cause }) {
    super(message || code)
    this._code = code
    this._cause = R.or(cause, [])
    Error.captureStackTrace(this, ApplicationError)
  }

  get code () {
    return this._code
  }

  get cause () {
    return this._cause
  }
}

/**
 * @name rejectWithApplicationError
 *
 * @param {Object} config
 * @param {String} config.code error code
 * @param {String} config.message error message
 * @param {Array.<String>} config.cause error message
 * @returns {Promise<ApplicationError>} promise rejected with an instance of ApplicationError
 */
const rejectWithApplicationError = ({ code, message, cause }) =>
  Promise.reject(new ApplicationError({ code, message, cause }))

module.exports = {
  catalogue,
  ApplicationError,
  rejectWithApplicationError,
}
