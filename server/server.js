const HttpApp = require('./app')
const config = require('_config').api

const HttpServer = infrastructure => {
  const app = HttpApp(infrastructure)

  const start = () =>
    new Promise((resolve, reject) =>
      app.listen(config.port)
        .once('listening', () => resolve(app))
        .once('error', reject)
    )

  return {
    start,
  }
}

module.exports = HttpServer
