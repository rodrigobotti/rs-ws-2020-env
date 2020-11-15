const sinon = require('sinon')
const middleware = require('./request-validation')
const { catalogue, ApplicationError } = require('_domain/error')

describe('middlewares/request-validation test', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })

  context('When validating request against schema yields errors', () => {
    it('Rejects with \'INVALID_REQUEST\' error ending the middleware stack', async () => {
      const schema = {}
      const check = sandbox.stub().returns()
      const validationErrors = sandbox.stub().resolves([
        { param: 'x', msg: 'a' },
        { param: 'x', msg: 'b' },
        { param: 'y', msg: 'c' },
      ])
      const ctx = { check, validationErrors }
      const next = sandbox.stub().resolves()
      const expectedCode = catalogue.INVALID_REQUEST
      const expectedCause = ['x: a, b', 'y: c']

      const promise = middleware(schema)(ctx, next)

      await expect(promise)
        .to.eventually.be
        .rejectedWith(ApplicationError)
        .and.to.include.deep({
          code: expectedCode,
          cause: expectedCause,
        })
      expect(next).to.not.have.been.called
      expect(check).to.have.been.calledOnceWith(schema)
    })
  })
  context('When there are no validation errors', () => {
    it('Continues middleware stack', async () => {
      const schema = {}
      const check = sandbox.stub().returns()
      const validationErrors = sandbox.stub().resolves()
      const ctx = { check, validationErrors }
      const next = sandbox.stub().resolves()

      await middleware(schema)(ctx, next)

      expect(next).to.have.been.calledOnce
      expect(check).to.have.been.calledOnceWith(schema)
    })
  })
})
