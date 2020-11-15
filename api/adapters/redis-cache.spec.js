const faker = require('faker')

const Cache = require('./redis-cache')
const redisClient = require('_infrastructure/redis')

const { cleanCache } = require('_tests/helpers/utils')

describe('redis-cache test', () => {
  let redis

  before(async () => {
    redis = await redisClient.connect()
  })
  afterEach(() =>
    cleanCache(redis)
  )
  after(() =>
    redisClient.close()
  )

  describe('#put test', () => {
    context('When given a key and a value', () => {
      it('Sets the key value entry in redis without expiration', async () => {
        const cache = Cache({ redis })
        const key = faker.lorem.word()
        const value = faker.lorem.word()

        await cache.put(key, value)

        const [savedValue, keyTTL] = await Promise.all([
          redis.get(key),
          redis.ttl(key),
        ])
        expect(savedValue).to.equal(value)
        expect(keyTTL > 0).to.be.false
      })
    })
    context('When given a key, a value and a positive expiration time', () => {
      it('Sets the key value entry in redis with expiration', async () => {
        const cache = Cache({ redis })
        const key = faker.lorem.word()
        const value = faker.lorem.word()
        const expiration = faker.random.number({ min: 60, max: 120, precision: 1 })

        await cache.put(key, value, expiration)

        const [savedValue, keyTTL] = await Promise.all([
          redis.get(key),
          redis.ttl(key),
        ])
        expect(savedValue).to.equal(value)
        expect(keyTTL > 0).to.be.true
        expect(keyTTL <= expiration).to.be.true
      })
    })
  })
  describe('#get test', () => {
    context('When given a key that was not set', () => {
      it('Resolves null', async () => {
        const cache = Cache({ redis })
        const key = faker.lorem.word()

        const result = await cache.get(key)

        expect(result).to.be.null
      })
    })
    context('When given a key that was set', () => {
      it('Resolves its value', async () => {
        const cache = Cache({ redis })
        const key = faker.lorem.word()
        const value = faker.lorem.word()
        await redis.set(key, value)

        const result = await cache.get(key)

        expect(result).to.equal(value)
      })
    })
  })
})
