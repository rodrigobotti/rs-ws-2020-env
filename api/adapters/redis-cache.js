const Cache = ({ redis }) => {
  const put = (key, value, expiration = 0) =>
    expiration
      ? redis.set(key, value, 'EX', expiration)
      : redis.set(key, value)

  const get = key =>
    redis.get(key)

  return {
    put,
    get,
  }
}

module.exports = Cache
