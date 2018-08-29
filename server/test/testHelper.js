const mongoose = require('mongoose')
const { mongodbTestURL } = require('../src/vars')

mongoose.Promise = global.Promise

before((done) => {
  mongoose.connect(mongodbTestURL, { useNewUrlParser: true })
  mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => {
      console.warn('Warning', error)
    })
})

beforeEach((done) => {
  const { bearsightings } = mongoose.connection.collections
  bearsightings.drop()
    .then(() => done())
    .catch(() => done())
})