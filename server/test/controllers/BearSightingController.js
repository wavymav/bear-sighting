const moment = require('moment')
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

  it(`finds bear sighting by 'id' for GET request to /sighting/:id`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get(`/sighting/${grizzlyBearSighting._id}`)
        .end((err, response) => {
          assert(response.body.bear_type === 'grizzly')
          done()
        })
    })
  })

  it(`search for all bear sightings for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get('/sighting/search')
        .end((err, response) => {
          assert(response.body.length === 2)
          assert(response.body[0].bear_type === 'grizzly')
          assert(response.body[1].bear_type === 'pink bear')
          done()
        })
    })
  })

  it(`search for bear sightings by 'bear_type' query param for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get('/sighting/search?bear_type=grizzly')
        .end((err, response) => {
          assert(response.body.length === 1)
          assert(response.body[0].bear_type === 'grizzly')
          done()
        })
    })
  })

  it(`search for bear sightings by 'start_date' query param for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get(`/sighting/search?start_date=${moment().format('YYYY-MM-DD')}`)
        .end((err, response) => {
          assert(response.body.length === 2)
          done()
        })
    })
  })

  it(`search for bear sightings by 'end_date' query param for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get(`/sighting/search?end_date=${moment().add(-7, 'days').format('YYYY-MM-DD')}`)
        .end((err, response) => {
          assert(!response.body.length)
          done()
        })
    })
  })

  it(`search for bear sightings by 'start_date' and 'end_date' query params for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1,
      created: moment().add(-5, 'days').toDate()
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get(`/sighting/search?start_date=${moment().add(-5, 'days').format('YYYY-MM-DD')}&end_date=${moment().add(-3, 'days').format('YYYY-MM-DD')}`)
        .end((err, response) => {
          assert(response.body.length === 1)
          done()
        })
    })
  })

  it(`sorts bear sightings by accending num_bears with 'sort' query param for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get('/sighting/search?sort=1')
        .end((err, response) => {
          assert(response.body.length === 2)
          assert(response.body[0].num_bears === 1)
          assert(response.body[1].num_bears === 3)
          done()
        })
    })
  })

  it(`sorts bear sightings by descending num_bears with 'sort' query param for GET request to /sighting/search`, (done) => {
    const grizzlyBearSighting = new BearSighting({
      bear_type: 'grizzly',
      notes: 'It was a big one!',
      zip_code: '90210', 
      num_bears: 3
    })
    const pinkBearSighting = new BearSighting({
      bear_type: 'pink bear',
      notes: `It's really pink!`,
      zip_code: '90012', 
      num_bears: 1
    })

    Promise.all([grizzlyBearSighting.save(), pinkBearSighting.save()]).then(() => {
      request(app)
        .get('/sighting/search?sort=-1')
        .end((err, response) => {
          assert(response.body.length === 2)
          assert(response.body[0].num_bears === 3)
          assert(response.body[1].num_bears === 1)
          done()
        })
    })
  })

})