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
  mongodb: {
    url: process.env.MONGODB_URL,
    database: process.env.MONGODB_DATABASE,
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: parseInt(process.env.MONGODB_POOL_SIZE || 10),
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    db: parseInt(process.env.REDIS_DB),
    keyPrefix: process.env.REDIS_KEY_PREFIX || `${process.env.NODE_ENV}:`,
  },
}
