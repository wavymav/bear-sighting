const BearSightingController= require('../controllers/BearSightingController')

module.exports = (app) => {
  app.post('/sighting', BearSightingController.createSighting),
  app.get('/sighting/search', BearSightingController.getSightings),
  app.get('/sighting/:id', BearSightingController.getSightingById)
}