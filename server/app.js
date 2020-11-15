const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const Api = require('_api')

const HttpApp = (infrastructure) => {
  const app = new Koa()
  const router = new Router()
  const api = Api(infrastructure)

  router.use('/api', api.routes())

  app.use(bodyParser())
  app.use(router.routes())

  return app
}

module.exports = HttpApp
