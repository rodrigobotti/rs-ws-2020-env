const { join } = require('path')

const DEV_ENVIRONMENTS = ['dev', 'development', 'local', 'debug']
const TEST_ENVIRONMENTS = ['test']
const PRODUCTION_ENVIRONMENTS = ['prod', 'production']

const includeIgnoresCase = (list, value) =>
  list.some(e =>
    Boolean(value) && e.toUpperCase() === value.toUpperCase())

const loadDotEnv = nodeEnv => {
  const dotenv = require('dotenv')

  if (includeIgnoresCase(DEV_ENVIRONMENTS, nodeEnv)) {
    return dotenv.config({
      path: join(__dirname, 'environments', 'dev.env'),
    })
  }
  if (includeIgnoresCase(TEST_ENVIRONMENTS, nodeEnv)) {
    return dotenv.config({
      path: join(__dirname, 'environments', 'test.env'),
    })
  }
}

const load = nodeEnv => {
  if (PRODUCTION_ENVIRONMENTS.includes(nodeEnv)) {
    return
  }
  loadDotEnv(nodeEnv)
}

module.exports = {
  load,
}
