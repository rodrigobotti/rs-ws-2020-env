const R = require('ramda')
const Redis = require('ioredis')

const config = require('_config').redis

const redis = new Redis(
  config.port,
  config.host,
  {
    lazyConnect: true,
    keyPrefix: config.keyPrefix,
    db: config.db,
  }
)

const connect = () =>
  redis
    .connect()
    .then(R.always(redis))

const close = () =>
  redis.quit()

const isConnected = () =>
  redis.status === 'ready'

module.exports = {
  connect,
  close,
  isConnected,
}
