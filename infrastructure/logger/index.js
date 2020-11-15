const pino = require('pino')
const config = require('_config').logging

module.exports = pino(config)
