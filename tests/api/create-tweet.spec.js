const sinon = require('sinon')
const faker = require('faker')

const createTestApi = require('_tests/helpers/server')

describe('POST /api/tweets endpoint test', () => {
  let sandbox, testApi
  beforeEach(async () => {
    testApi = await createTestApi()
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('When sending a valid tweet text', () => {
    it('Responds with created tweet', async () => {
      const text = faker.lorem.sentence().substr(0, 140)

      const response = await testApi
        .post('/api/tweets')
        .send({ text })

      expect(response.status).to.equal(201)
      expect(response.body.text).to.equal(text)
    })
  })
  context('When sending an empty text', () => {
    it('Responds with invalid request', async () => {
      const text = ''

      const response = await testApi
        .post('/api/tweets')
        .send({ text })

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('INVALID_REQUEST')
      expect(response.body.message).to.equal('Invalid request parameters')
    })
  })
  context('When sending a long text', () => {
    it('Responds with invalid request', async () => {
      const text = faker.random.alphaNumeric(faker.random.number({ min: 141, max: 250, precision: 1 }))

      const response = await testApi
        .post('/api/tweets')
        .send({ text })

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('INVALID_REQUEST')
      expect(response.body.message).to.equal('Invalid request parameters')
    })
  })
  context('When sending body without text', () => {
    it('Responds with invalid request', async () => {
      const body = {}

      const response = await testApi
        .post('/api/tweets')
        .send(body)

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('INVALID_REQUEST')
      expect(response.body.message).to.equal('Invalid request parameters')
    })
  })
})
