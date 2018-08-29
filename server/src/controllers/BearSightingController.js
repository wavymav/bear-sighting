const moment = require('moment')
const _ = require('lodash')
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
  const sortValue = parseInt(req.query.sort) === 1 || parseInt(req.query.sort) === -1
    ? { num_bears: req.query.sort }
    : { created: 1 }
  const startDate = req.query.start_date
    ? moment(req.query.start_date).toDate()
    : null
  const endDate = req.query.end_date
    ? moment(req.query.end_date).toDate()
    : null
  const dateValues = { $gte: startDate, $lte: endDate }
  const dateBetweenValues = _.pickBy(dateValues, _.identity)
  const values = {
    created: dateBetweenValues,
    bear_type: { $regex: req.query.bear_type || '', $options : 'i' },
    zip_code: { $regex: req.query.zip_code || '', $options : 'i' }
  }
  const queryValues = _.omitBy(values, _.isEmpty)

  BearSighting.find(queryValues)
    .sort(sortValue)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}