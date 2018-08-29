const path = require('path')

require('dotenv').load({
  path: path.join(__dirname, '../.env')
})

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodbURL: process.env.MONGO_DB_URL,
  mongodbTestURL: process.env.MONGO_DB_TEST_URL
}