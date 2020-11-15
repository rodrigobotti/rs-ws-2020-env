const logger = require('_infrastructure/logger')
const errorTranslator = require('_application/translators/error-translator')

const handleError = ctx => error => {
  logger.error(error, 'Failed processing the request')
  const response = errorTranslator.toApplication(error)
  ctx.status = response.status
  ctx.body = response.body
  ctx.body.cause = error.cause
}

/**
 * Error handling middleware.
 * Should be mounted at the top of the application router.
 *
 * @async
 * @name error
 * @param {Object} ctx context from koa
 * @param {function(): Promise} next middleware continuation function
 * @returns {Promise}
 */
const error = (ctx, next) =>
  next()
    .catch(handleError(ctx))

module.exports = error
