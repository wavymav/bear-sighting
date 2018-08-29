const bodyParser = require('body-parser')
const morgan = require('morgan')
const { env } = require('./vars')

exports.setGlobalMiddleware = (app) => {
  app.use(bodyParser.json()),
  env !== 'production' ? app.use(morgan('dev')) : app.use(morgan('tiny'))
}