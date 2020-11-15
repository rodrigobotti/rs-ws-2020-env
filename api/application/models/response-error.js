/**
 * HTTP Response value object
 *
 * @param {String} code application error code
 * @param {Number} status http status code
 * @param {String} message text message
 */
const ErrorResponse = (code, status, message) => ({
  status,
  body: {
    statusCode: status,
    error: code,
    message,
  },
})

module.exports = ErrorResponse
