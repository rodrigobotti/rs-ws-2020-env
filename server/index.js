const HttpServer = require('./server')

const config = require('_config')
const logger = require('_infrastructure/logger')

// TODO: import infrastructure connectors and config

const connectInfrastructure = _config =>
  Promise
    .all([
      // TODO: connect to external infrastructure elements
    ])
    .then(([]) => ({
      // TODO: return connected clients as a single dependency object
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
