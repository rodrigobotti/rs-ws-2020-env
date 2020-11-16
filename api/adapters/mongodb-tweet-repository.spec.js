const R = require('ramda')
const faker = require('faker')
const uuid = require('uuid')

const Repository = require('./mongodb-tweet-repository')
const mongoClient = require('_infrastructure/mongodb')
const { Tweet } = require('_domain/tweet')
const { catalogue: { TWEET_NOT_FOUND }, ApplicationError } = require('_domain/error')

const { cleanDataBase } = require('_tests/helpers/utils')
const { expect } = require('chai')

describe('mongodb-tweet-repository test', () => {
  let mongoDb

  before(async () => {
    mongoDb = await mongoClient.connect()
  })
  afterEach(() =>
    cleanDataBase(mongoDb)
  )
  after(() =>
    mongoClient.close()
  )

  describe('#add test', () => {
    context('When given a tweet', () => {
      it('Inserts it into the database', async () => {
        const repository = Repository({ mongoDb })
        const tweet = Tweet({ text: faker.lorem.sentence() })

        const result = await repository.add(tweet)

        expect(result.id).to.equal(tweet.id)
        const savedTweet = await mongoDb.collection('tweet').findOne({ _id: tweet.id })
        expect(savedTweet).to.not.be.null
        expect(savedTweet).to.not.be.undefined
      })
    })
  })
  describe('#increment test', () => {
    context('When tweet with matching id is not found', () => {
      it('Rejects with not found error', async () => {
        const repository = Repository({ mongoDb })
        const id = uuid.v4()

        const promise = repository.increment(id, 'likes.amount')

        await expect(promise)
          .to.eventually.be.rejectedWith(ApplicationError)
          .with.property('code', TWEET_NOT_FOUND)
      })
    })
    context('When document with matching id is found', () => {
      it('Increments the field by 1', async () => {
        const repository = Repository({ mongoDb })
        const currentFieldValue = faker.random.number({
          min: 1,
          max: 100,
          precision: 1,
        })
        const id = uuid.v4()
        const savedTweet = {
          _id: id,
          some: { random: { field: currentFieldValue } },
        }
        await mongoDb.collection('tweet').insertOne(savedTweet)

        const result = await repository.increment(id, 'some.random.field')

        expect(result.some.random.field).to.equal(currentFieldValue + 1)
        const updatedDocument = await mongoDb.collection('tweet').findOne({ _id: id })
        expect(updatedDocument.some.random.field).to.equal(currentFieldValue + 1)
      })
    })
  })
  describe('#orderBy test', () => {
    const randomInt = (min, max) => faker.random.number({
      min,
      max,
      precision: 1,
    })
    const createTweet = () => Tweet({
      text: faker.lorem.sentence(),
      likes: randomInt(1, 200),
    })
    const createTweets = R.pipe(
      R.times(createTweet),
      R.uniqBy(R.path(['likes', 'amount']))
    )

    const insertTweets = (repository, tweets) =>
      mongoDb
        .collection('tweet')
        .insertMany(R.map(repository.encodeTweet, tweets))

    const ascending = (fieldPath, limit) => R.pipe(
      R.sort(R.ascend(R.path(fieldPath))),
      R.take(limit)
    )
    const descending = (fieldPath, limit) => R.pipe(
      R.sort(R.descend(R.path(fieldPath))),
      R.take(limit)
    )
    context('When ascending is true', () => {
      it('Sorts documents by field ascending and limits the result', async () => {
        const repository = Repository({ mongoDb })
        const totalDocuments = randomInt(10, 20)
        const limit = Math.floor(totalDocuments / 2)
        const registeredTweets = createTweets(totalDocuments)
        const expectedTweets = ascending(['likes', 'amount'], limit)(registeredTweets)
        await insertTweets(repository, registeredTweets)

        const result = await repository.orderBy('likes.amount', limit, true)

        expect(result).to.deep.equal(expectedTweets)
      })
    })
    context('When descending is true', () => {
      it('Sorts documents by field descending and limits the result', async () => {
        const repository = Repository({ mongoDb })
        const totalDocuments = randomInt(10, 20)
        const limit = Math.floor(totalDocuments / 2)
        const registeredTweets = createTweets(totalDocuments)
        const expectedTweets = descending(['likes', 'amount'], limit)(registeredTweets)
        await insertTweets(repository, registeredTweets)

        const result = await repository.orderBy('likes.amount', limit)

        expect(result).to.deep.equal(expectedTweets)
      })
    })
  })
})
