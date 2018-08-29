require('dotenv').config()

const app = require('./app')
const { port } = require('./vars')

// Start Server
const server = app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${ port }.`)
  }
})

module.exports = server