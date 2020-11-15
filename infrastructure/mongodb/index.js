const { MongoClient } = require('mongodb')
const config = require('_config').mongodb

const client = new MongoClient(config.url, config.connectionOptions)

const connect = () =>
  client.connect()
    .then(() => client.db(config.database))

const close = () =>
  client.close()

const isConnected = () =>
  client.isConnected()

module.exports = {
  connect,
  close,
  isConnected,
}
