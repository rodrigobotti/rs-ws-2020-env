require('./env-loader').load(process.env.NODE_ENV)

module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  logging: {
    name: 'rs-ws-env',
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.LOG_PRETTY === 'true',
  },
}
