const sinon = require('sinon')
const uuid = require('uuid')
const faker = require('faker')
const { Tweet } = require('_domain/tweet')
const LikeTweet = require('./like-tweet')

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
        const id = uuid.v4()
        const savedTweet = Tweet({
          id,
          likes: 1,
          text: faker.lorem.sentence(),
        })
        const tweetRepository = ({
          increment: sandbox.stub().resolves(savedTweet),
        })
        const useCase = LikeTweet({ tweetRepository })

        const result = await useCase.like(id)

        expect(result).to.deep.equal(savedTweet)
        expect(tweetRepository.increment).to.have.been.calledOnceWith(id, 'likes.amount')
      })
    })
  })
})
