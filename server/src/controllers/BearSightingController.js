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

  BearSighting.find({
    $text: {
      $search: req.query.bear_type
    }
  })
    .sort({ created: 'asc' })
    .then(docs => res.json(docs))
    .catch(error => next(error))
}