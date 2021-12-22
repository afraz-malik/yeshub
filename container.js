const dependable = require('dependable')
const path = require('path')
const container = dependable.container()
const dependanciesIncluded = [
  ['express', 'express'],
  ['_', 'lodash'],
  ['mongoose', 'mongoose'],
]

dependanciesIncluded.forEach(function (val) {
  container.register(val[0], function () {
    return require(val[1])
  })
})

container.load(path.join(__dirname, '/routes'))
container.load(path.join(__dirname, '/src'))
container.register('container', function () {
  return container
})

module.exports = container
