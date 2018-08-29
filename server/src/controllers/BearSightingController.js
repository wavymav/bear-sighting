const BearSighting = require('../models/BearSighting')

exports.createSighting = (req, res, next) => {
  const bearSightingProps = req.body

  BearSighting.create(bearSightingProps)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

exports.getSightingById = (req, res, next) => {
  const bearSightingId = req.params.id

  BearSighting.findById(bearSightingId)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

exports.getSightings = (req, res, next) => {
  console.log(req.query)
  const sortValue = parseInt(req.query.sort) === 1 || parseInt(req.query.sort) === -1
    ? { num_bears: req.query.sort }
    : { created: 1 }

  BearSighting.find({
    bear_type: { '$regex' : req.query.bear_type || '', '$options' : 'i' },
    zip_code: { '$regex' : req.query.zip_code || '', '$options' : 'i' }
  })
    .sort(sortValue)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}