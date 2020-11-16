const createTweet = {
  text: {
    in: 'body',
    notEmpty: true,
    isLength: {
      options: [{ min: 1, max: 140 }],
    },
  },
}

const likeTweet = {
  id: {
    in: 'params',
    notEmpty: true,
    isUUID: true,
  },
}

module.exports = {
  createTweet,
  likeTweet,
}
