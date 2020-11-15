const supertest = require('supertest')

const config = require('_config')
const app = require('_server/app')
const mongoClient = require('_infrastructure/mongodb')

const { cleanDataBase } = require('./utils')

let _server
let _api
let _mongoDb

before(async () => {
  _mongoDb = await mongoClient.connect()
  _server = app({ mongoDb: _mongoDb }).listen(config.api.port)
  _api = supertest(_server)
})

after(async () => {
  await mongoClient.close()
  await _server.close()
})

afterEach(async () => {
  if (_mongoDb) {
    await cleanDataBase(_mongoDb)
  }
})

/**
 * Supertest instance connected to the application server.
 * You can use it for executing integration tests.
 */
const api = () => _api

module.exports = api
