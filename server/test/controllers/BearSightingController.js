const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../../src/app')

const BearSighting = mongoose.model('BearSighting')

describe('Bear Sighting Controller', () => {
  it(`creates new bear sighting for POST request to /sighting`, (done) => {
    BearSighting.count().then(count => {
      request(app)
        .post('/sighting')
        .send({
          bear_type: 'grizzly',
          notes: 'It was a big one!',
          zip_code: '90210', 
          num_bears: 3
        })
        .end(() => {
          BearSighting.count().then(newCount => {
            assert(count + 1 === newCount)
            done()
          })
        })
    })
  })
})