const sinon = require('sinon')
const faker = require('faker')
const { resolve } = require('_api/commons')
const { Tweet } = require('_domain/tweet')
const CreateTweet = require('./create-tweet')

describe('create-tweet usecase test', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('#create test', () => {
    context('When given a tweet', () => {
      it('Adds it to the repository', async () => {
        const tweet = Tweet({
          text: faker.lorem.sentence(),
        })
        const tweetRepository = ({
          add: sandbox.stub().callsFake(resolve),
        })
        const useCase = CreateTweet({ tweetRepository })

        const result = await useCase.create(tweet)

        expect(result).to.deep.equal(tweet)
        expect(tweetRepository.add).to.have.been.calledOnceWith(tweet)
      })
    })
  })
})
