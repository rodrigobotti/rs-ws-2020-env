const awaitAll = Promise.all.bind(Promise)

const resolve = Promise.resolve.bind(Promise)

const reject = Promise.reject.bind(Promise)

module.exports = {
  awaitAll,
  resolve,
  reject,
}
