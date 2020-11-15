const supertest = require('supertest')

const config = require('_config')
const app = require('_server/app')

let _server
let _api

before(async () => {
  // TODO: connect infrastructure
  const infrastructure = {}
  _server = app(infrastructure).listen(config.api.port)
  _api = supertest(_server)
})

after(async () => {
  // TODO: disconnect infrastructure
  _server.close()
})

/**
 * Supertest instance connected to the application server.
 * You can use it for executing integration tests.
 */
const api = () => _api

module.exports = api
