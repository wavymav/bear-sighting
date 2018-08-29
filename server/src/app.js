const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const { setGlobalMiddleware } = require('./middleware')
const errorHandlers = require('./errorHandlers')
const { mongodbURL, env } = require('./vars')

const app = express()

setGlobalMiddleware(app)

mongoose.Promise = global.Promise
if (env !== 'test') {
  mongoose.connect(mongodbURL, { useNewUrlParser: true })
}
mongoose.connection.on('error', (err) => console.error(err.message))

require('./models/BearSighting')

routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
});



module.exports = app