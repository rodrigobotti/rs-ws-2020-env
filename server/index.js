const HttpServer = require('./server')

const config = require('_config')
const logger = require('_infrastructure/logger')

const mongodb = require('_infrastructure/mongodb')

const connectInfrastructure = () =>
  Promise
    .all([
      mongodb.connect(),
    ])
    .then(([mongoDb]) => ({
      mongoDb,
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
