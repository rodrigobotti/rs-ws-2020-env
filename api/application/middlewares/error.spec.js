const R = require('ramda')
const sinon = require('sinon')

const { catalogue, ApplicationError } = require('_domain/error')
const { responsesTable } = require('_application/translators/error-translator')
const { awaitAll } = require('_api/commons')
const middleware = require('./error')

describe('middlewares/error test', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })

  const testMiddleware = async (nextError, expectedResponse) => {
    const ctx = {}
    const next = sandbox.stub().rejects(nextError)

    await middleware(ctx, next)

    expect(ctx.status).to.equal(expectedResponse.status)
    expect(ctx.body).to.deep.equal(expectedResponse.body)
  }

  const testResponse = (code, response) =>
    testMiddleware(new ApplicationError({ code }), response)

  const testAllResponses = R.pipe(
    R.toPairs,
    R.map(R.apply(testResponse)),
    awaitAll
  )

  context('When middleware continuation rejects', () => {
    it('Serializes the matching response', () =>
      testAllResponses(responsesTable)
    )
    context('And the error does not have a matching response', () => {
      it('Serializes the default response error', () =>
        testMiddleware(
          new Error('Unexpected undocumented error'),
          responsesTable[catalogue.INTERNAL]
        )
      )
    })
  })
  context('When middleware continuation resolve', () => {
    it('Resolves without touching the response', async () => {
      const ctx = {}
      const next = sandbox.stub().resolves()

      await middleware(ctx, next)

      expect(ctx).to.deep.equal({})
    })
  })
})
