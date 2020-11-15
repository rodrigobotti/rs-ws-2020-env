const R = require('ramda')

const commons = require('_api/commons')

const deleteCollection = collection =>
  collection.deleteMany({})

const deleteCollections = R.pipe(
  R.map(deleteCollection),
  commons.awaitAll
)

const cleanDataBase = mongoDb =>
  mongoDb
    .collections()
    .then(deleteCollections)

const cleanCache = redis =>
  redis.flushdb()

module.exports = {
  ...commons,
  cleanDataBase,
  cleanCache,
}
