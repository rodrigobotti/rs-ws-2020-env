const HttpServer = require('./server')

const config = require('_config')
const logger = require('_infrastructure/logger')

const mongodb = require('_infrastructure/mongodb')
const redisClient = require('_infrastructure/redis')

const connectInfrastructure = () =>
  Promise
    .all([
      mongodb.connect(),
      redisClient.connect(),
    ])
    .then(([mongoDb, redis]) => ({
      mongoDb,
      redis,
    }))

const startServer = infrastructure =>
  HttpServer(infrastructure).start()

connectInfrastructure()
  .then(startServer)
  .then(() =>
    logger.info(`Application started successfully in port ${config.api.port}`)
  )
  .catch(error => {
    logger.error(error, 'Failed starting the application. Terminating process')
    process.exit(1)
  })
