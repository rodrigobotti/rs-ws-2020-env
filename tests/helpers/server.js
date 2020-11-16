const supertest = require('supertest')

const config = require('_config')
const app = require('_server/app')
const mongoClient = require('_infrastructure/mongodb')
const redisClient = require('_infrastructure/redis')

const { cleanDataBase, cleanCache } = require('./utils')

let _server
let _api
let _mongoDb
let _redis

before(async () => {
  [_mongoDb, _redis] = await Promise.all([mongoClient.connect(), redisClient.connect()])
  _server = app({ mongoDb: _mongoDb, redis: _redis }).listen(config.api.port)
  _api = supertest(_server)
})

after(() =>
  Promise.all([
    mongoClient.close(),
    redisClient.close(),
    _server.close(),
  ])
)

afterEach(() =>
  Promise.all([
    (_mongoDb && cleanDataBase(_mongoDb)),
    (_redis && cleanCache(_redis)),
  ])
)

/**
 * Supertest instance connected to the application server.
 * You can use it for executing integration tests.
 */
const api = () => _api

module.exports = api
